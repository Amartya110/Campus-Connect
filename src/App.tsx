import React, { useState } from 'react';
import { Header } from './components/Header';
import { ActivityCard } from './components/ActivityCard';
import { Carousel } from './components/Carousel';
import { Activity, User } from './types';

const MOCK_ACTIVITIES: Activity[] = [
  {
    id: '1',
    title: 'Blockchain Development Club',
    description: 'Weekly meetup to discuss and build blockchain projects. Perfect for beginners and experts alike.',
    date: 'Every Thursday',
    type: 'club',
    coinsReward: 50
  },
  {
    id: '2',
    title: 'AI/ML Workshop Series',
    description: 'Learn the fundamentals of AI and Machine Learning through hands-on workshops.',
    date: 'Starting March 15',
    type: 'academic',
    coinsReward: 75
  },
  {
    id: '3',
    title: 'DUHacks 4.0',
    description: 'Welcome to DUHacks 4.0 — a 36-hour National-Level hackathon organized by Google Developer Student Clubs, DDU🌍.',
    date: 'March 20',
    type: 'academic',
    coinsReward: 150
  },
  {
    id: '4',
    title: 'ICPC 2024',
    description: 'The ICPC International Collegiate Programming Contest.',
    date: 'January 25-26',
    type: 'hackathon',
    coinsReward: 50,
    registrationFee: 150
  },
  {
    id: '5',
    title: 'Code Kshetra 2.0',
    description: 'Annual blockchain hackathon with Prize Pool $11,390. Build the future of Web3.',
    date: 'January 20-21',
    type: 'hackathon',
    coinsReward: 150,
    registrationFee: 250
  },
  {
    id: '6',
    title: 'Winter of Code 4.0',
    description: 'A month-long celebration of all things open-source with a prize pool of $550.',
    date: 'January 1-31',
    type: 'hackathon',
    coinsReward: 75,
    
  }
];

export default function App() {
  const [user, setUser] = useState<User>({
    id: '1',
    name: 'John Doe',
    coins: 500,
    streak: 5,
    lastParticipation: new Date().toISOString()
  });

  const handleParticipate = (activity: Activity) => {
    if (activity.registrationFee && user.coins < activity.registrationFee) {
      alert('Not enough coins! Participate in more activities to earn coins.');
      return;
    }

    setUser(prev => ({
      ...prev,
      coins: prev.coins + activity.coinsReward - (activity.registrationFee || 0),
      streak: prev.streak + 1,
      lastParticipation: new Date().toISOString()
    }));

    alert(`Successfully ${activity.registrationFee ? 'registered' : 'participated'}!`);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header coins={user.coins} streak={user.streak} />
      
      <main className="max-w-7xl mx-auto px-4 py-8">
        <div className="space-y-8">
          <Carousel />
          
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Featured Activities</h2>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {MOCK_ACTIVITIES.map(activity => (
                <ActivityCard
                  key={activity.id}
                  activity={activity}
                  onParticipate={handleParticipate}
                />
              ))}
            </div>
          </section>

          <section className="bg-white rounded-lg p-6 shadow-md">
            <h2 className="text-xl font-semibold mb-4">How It Works</h2>
            <div className="grid gap-6 md:grid-cols-3">
              <div className="text-center">
                <div className="bg-indigo-100 rounded-full p-4 w-16 h-16 mx-auto mb-3 flex items-center justify-center">
                  <span className="text-2xl">👥</span>
                </div>
                <h3 className="font-medium mb-2">Participate</h3>
                <p className="text-gray-600">Join clubs and activities to earn coins</p>
              </div>
              <div className="text-center">
                <div className="bg-indigo-100 rounded-full p-4 w-16 h-16 mx-auto mb-3 flex items-center justify-center">
                  <span className="text-2xl">🔥</span>
                </div>
                <h3 className="font-medium mb-2">Build Streaks</h3>
                <p className="text-gray-600">Maintain daily activity for bonus rewards</p>
              </div>
              <div className="text-center">
                <div className="bg-indigo-100 rounded-full p-4 w-16 h-16 mx-auto mb-3 flex items-center justify-center">
                  <span className="text-2xl">🎯</span>
                </div>
                <h3 className="font-medium mb-2">Redeem</h3>
                <p className="text-gray-600">Use coins for premium events and hackathons</p>
              </div>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}