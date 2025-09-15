'use client';

import Link from 'next/link';
import ThemeToggle from './ThemeToggle';

export default function Header() {
  return (
    <header className="py-4 px-6 bg-white dark:bg-dark-800 shadow-sm sticky top-0 z-10">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <Link href="/" className="text-2xl font-bold text-primary-700 dark:text-primary-400">
          TwinBot
        </Link>
        
        <nav className="hidden md:flex items-center space-x-6">
          <Link href="/#features" className="text-dark-600 dark:text-light-300 hover:text-primary-600 dark:hover:text-primary-400 transition-colors">
            Features
          </Link>
          <Link href="/#how-it-works" className="text-dark-600 dark:text-light-300 hover:text-primary-600 dark:hover:text-primary-400 transition-colors">
            How It Works
          </Link>
          <Link href="/#demo" className="text-dark-600 dark:text-light-300 hover:text-primary-600 dark:hover:text-primary-400 transition-colors">
            Demo
          </Link>
          <Link href="/demo-chat" className="text-dark-600 dark:text-light-300 hover:text-primary-600 dark:hover:text-primary-400 transition-colors">
            Chat Demo
          </Link>
          <Link href="/#faq" className="text-dark-600 dark:text-light-300 hover:text-primary-600 dark:hover:text-primary-400 transition-colors">
            FAQ
          </Link>
        </nav>
        
        <div className="flex items-center">
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}
