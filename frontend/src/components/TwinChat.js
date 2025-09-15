'use client';

import { useState } from 'react';

export default function TwinChat({ twinData }) {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const sendMessage = async () => {
    if (!input.trim()) return;
    
    // Add user message to chat
    const userMessage = { content: input, isUser: true };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);
    
    try {
      const response = await fetch('/api/twin-response', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          twinPersonality: twinData.personality,
          userMessage: input,
          conversationHistory: messages
        }),
      });
      
      const data = await response.json();
      
      if (response.ok) {
        // Add twin response to chat
        setMessages(prev => [...prev, { 
          content: data.response, 
          isUser: false 
        }]);
      } else {
        console.error('Error:', data.error);
        setMessages(prev => [...prev, { 
          content: "Sorry, I'm having trouble responding right now.", 
          isUser: false 
        }]);
      }
    } catch (error) {
      console.error('Failed to send message:', error);
      setMessages(prev => [...prev, { 
        content: "Sorry, I'm having trouble connecting right now.", 
        isUser: false 
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col bg-white dark:bg-gray-800 rounded-lg shadow-md p-4 h-[500px] max-w-md mx-auto">
      <div className="flex-1 overflow-y-auto mb-4 space-y-4">
        {messages.length === 0 ? (
          <div className="text-center text-gray-600 dark:text-gray-300 mt-8">
            Start a conversation with your Twin!
          </div>
        ) : (
          messages.map((msg, index) => (
            <div 
              key={index} 
              className={`p-3 rounded-lg max-w-[80%] ${
                msg.isUser 
                  ? 'bg-blue-600 text-white ml-auto' 
                  : 'bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-100'
              }`}
            >
              {msg.content}
            </div>
          ))
        )}
        {isLoading && (
          <div className="bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-100 p-3 rounded-lg max-w-[80%] flex items-center">
            <div className="dot-typing"></div>
          </div>
        )}
      </div>
      
      <div className="flex mt-2">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Message your Twin..."
          className="flex-1 border border-gray-300 dark:border-gray-600 rounded-l-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-700 text-gray-800 dark:text-white"
          onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
          disabled={isLoading}
        />
        <button 
          onClick={sendMessage} 
          disabled={isLoading}
          className="bg-blue-600 text-white px-4 py-2 rounded-r-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-blue-400"
        >
          Send
        </button>
      </div>
    </div>
  );
}
