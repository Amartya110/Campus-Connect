import React, { useState } from 'react';
import { LogIn } from 'lucide-react';
import { LoginModal } from './LoginModal';
import { useWallet } from '../hooks/useWallet';

export function LoginButton() {
  const [showModal, setShowModal] = useState(false);
  const { isConnected, connect } = useWallet();

  const handleLogin = async () => {
    if (!isConnected) {
      const connected = await connect();
      if (connected) {
        setShowModal(true);
      }
    } else {
      setShowModal(true);
    }
  };

 
  ;
}