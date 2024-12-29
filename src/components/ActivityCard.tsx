import { useState } from 'react';
import { Calendar, Users, Trophy, Coins } from 'lucide-react';
import { Activity } from '../types';
import { ethers } from "ethers";

interface ActivityCardProps {
  activity: Activity;
}

export function ActivityCard({ activity }: ActivityCardProps) {
  const [isProcessing, setIsProcessing] = useState(false);
  
  const icons = {
    club: Users,
    academic: Trophy,
    hackathon: Calendar,
  };
  
  const Icon = icons[activity.type];

  const handleParticipate = async () => {
    setIsProcessing(true);
    try {
      if (!window.ethereum) {
        throw new Error("No Ethereum provider found");
      }
      const provider = new ethers.providers.Web3Provider(window.ethereum as any);
      await provider.send("eth_requestAccounts", []);
      const signer = provider.getSigner();
      const contractAddress = "0x02Ba285ea67bd805306545ea5Ad3f9269Dd485EB"; // Replace with your actual contract address
      const contractABI = [
        {
          "inputs": [
            {
              "internalType": "int256",
              "name": "amt",
              "type": "int256"
            }
          ],
          "name": "deposit",
          "outputs": [],
          "stateMutability": "nonpayable",
          "type": "function"
        },
        {
          "inputs": [
            {
              "internalType": "int256",
              "name": "amt",
              "type": "int256"
            }
          ],
          "name": "withdraw",
          "outputs": [],
          "stateMutability": "nonpayable",
          "type": "function"
        },
        {
          "inputs": [],
          "name": "coins",
          "outputs": [
            {
              "internalType": "int256",
              "name": "",
              "type": "int256"
            }
          ],
          "stateMutability": "view",
          "type": "function"
        },
        {
          "inputs": [],
          "name": "getBalance",
          "outputs": [
            {
              "internalType": "int256",
              "name": "",
              "type": "int256"
            }
          ],
          "stateMutability": "view",
          "type": "function"
        }
      ]; // Replace with your actual contract ABI
      const contract = new ethers.Contract(contractAddress, contractABI, signer);
      const tx = await contract.deposit(ethers.utils.parseEther("0.000001"));
      await tx.wait();
      // ...handle success...
    } catch (error) {
      console.error(error);
      // ...handle error...
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
      <div className="flex items-start justify-between">
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-indigo-100 rounded-lg">
            <Icon className="h-6 w-6 text-indigo-600" />
          </div>
          <h3 className="text-lg font-semibold">{activity.title}</h3>
        </div>
        <div className="flex items-center space-x-1">
          <Coins className="h-4 w-4 text-yellow-500" />
          <span className="text-sm font-medium">+{activity.coinsReward}</span>
        </div>
      </div>
      
      <p className="mt-3 text-gray-600">{activity.description}</p>
      
      <div className="mt-4 flex items-center justify-between">
        <span className="text-sm text-gray-500">{activity.date}</span>
        <button
          onClick={handleParticipate}
          disabled={isProcessing}
          className={`px-4 py-2 rounded-md transition-colors ${
            isProcessing 
              ? 'bg-gray-400 cursor-not-allowed' 
              : 'bg-indigo-600 hover:bg-indigo-700'
          } text-white`}
        >
          {isProcessing ? 'Processing...' : activity.registrationFee ? `Register (${activity.registrationFee} coins)` : 'Participate'}
        </button>
      </div>
    </div>
  );
}