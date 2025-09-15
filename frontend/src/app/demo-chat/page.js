'use client';

import TwinChat from '@/components/TwinChat';
import Image from 'next/image';
import Link from 'next/link';

export default function DemoChatPage() {
  // Mock twin data for testing
  const mockTwinData = {
    name: "AI Assistant",
    description: "A helpful digital twin",
    imageURI: "/globe.svg",
    personality: "You are helpful, friendly, and knowledgeable about blockchain technology. You speak in a casual, conversational tone and occasionally use emoji. You're excited about helping users understand Web3 concepts."
  };

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="flex justify-between items-center mb-6">
        <Link href="/" className="text-blue-600 hover:text-blue-800 flex items-center">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
          </svg>
          Back to Home
        </Link>
        <h1 className="text-2xl font-bold text-center">TwinBot Chat Demo</h1>
        <div className="w-[100px]"></div> {/* Spacer for alignment */}
      </div>
      
      <div className="max-w-md mx-auto bg-white rounded-lg shadow-lg p-6 mb-6">
        <div className="flex items-center mb-4">
          <div className="w-16 h-16 bg-gray-200 rounded-full overflow-hidden mr-4 relative">
            <Image 
              src={mockTwinData.imageURI} 
              alt={mockTwinData.name} 
              fill 
              className="object-cover" 
              sizes="(max-width: 768px) 100vw, 64px" 
            />
          </div>
          <div>
            <h2 className="text-xl font-semibold">{mockTwinData.name}</h2>
            <p className="text-gray-600">{mockTwinData.description}</p>
          </div>
        </div>
        <div className="border-t pt-4">
          <h3 className="text-sm font-medium text-gray-500 mb-1">Personality:</h3>
          <p className="text-sm text-gray-700">{mockTwinData.personality.substring(0, 100)}...</p>
        </div>
      </div>
      
      <TwinChat twinData={mockTwinData} />
      
      <div className="mt-8 bg-blue-50 dark:bg-blue-900 border border-blue-200 dark:border-blue-700 rounded-lg p-6 max-w-md mx-auto">
        <h2 className="text-xl font-semibold mb-2 text-blue-800 dark:text-blue-200">Ready to Create Your Own Twin?</h2>
        <p className="text-gray-700 dark:text-gray-300 mb-4">This is just a demo! Create your own personalized digital twin with unique personality traits.</p>
        <div className="flex justify-center">
          <Link 
            href="/#demo" 
            className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-6 rounded-lg transition-colors"
          >
            Get Started
          </Link>
        </div>
      </div>
    </div>
  );
}
