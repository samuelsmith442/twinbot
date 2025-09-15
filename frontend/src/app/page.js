import Header from '@/components/Header';
import ConnectButton from '@/components/ConnectButton';
import ManualAnvilConnect from '@/components/ManualAnvilConnect';
import MintTwinBot from '@/components/MintTwinBot';

export default function Home() {
  return (
    <>
      <div className="min-h-screen bg-gradient-to-br from-light-200 to-light-300 dark:bg-gradient-dark dark:text-light-100 transition-colors duration-300">
        <Header />
        {/* Hero Section */}
        <section className="py-20 px-4 text-center">
          <h1 className="text-5xl font-bold text-gray-800 dark:text-light-100 mb-4">
            Your AI Twin on the Blockchain
          </h1>
          <p className="text-xl text-gray-600 dark:text-light-300 mb-8 max-w-2xl mx-auto">
            Create a digital twin that represents you 24/7, generates personal stories, and builds your online brand. Own it as an NFT.
          </p>
          <div className="flex flex-col items-center">
            <ConnectButton />
            <ManualAnvilConnect />
          </div>
        </section>

        {/* Features Section */}
        <section id="features" className="py-12 px-4 max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-800 dark:text-light-100">Why TwinBot?</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { title: "Your Digital Twin", desc: "Train an AI to mimic your personality, values, and communication style." },
              { title: "24/7 Companion", desc: "Let your AI twin interact with others, share stories, and represent you online." },
              { title: "Blockchain Ownership", desc: "Mint your AI twin as an NFT—prove its uniqueness and own your data." },
              { title: "Affordable", desc: "One-time $10 payment or subscription for advanced features." },
            ].map((feature, index) => (
              <div key={index} className="bg-white dark:bg-dark-600 p-8 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 border border-light-400 dark:border-dark-500">
                <h3 className="text-xl font-semibold mb-3 text-primary-700 dark:text-primary-400">{feature.title}</h3>
                <p className="text-dark-400 dark:text-light-300">{feature.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* How It Works */}
        <section id="how-it-works" className="py-12 px-4 max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-12 text-primary-700 dark:text-primary-400">How It Works</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { step: "1", title: "Train Your AI", desc: "Answer a few questions to train your AI twin." },
              { step: "2", title: "Deploy Your Twin", desc: "Deploy your AI twin on Discord, Telegram, or the web." },
              { step: "3", title: "Mint as NFT", desc: "Mint your AI twin as an NFT and own it forever." },
            ].map((item, index) => (
              <div key={index} className="bg-white dark:bg-dark-600 p-8 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 border border-light-400 dark:border-dark-500">
                <div className="w-14 h-14 bg-gradient-primary text-white rounded-full flex items-center justify-center mx-auto mb-5 text-xl font-bold shadow-md">
                  {item.step}
                </div>
                <h3 className="text-xl font-semibold mb-3 text-primary-700 dark:text-primary-400">{item.title}</h3>
                <p className="text-dark-400 dark:text-light-300">{item.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Demo Section */}
        <section id="demo" className="py-16 px-4 max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-8 text-primary-700 dark:text-primary-400">Experience TwinBot</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white dark:bg-dark-600 p-8 rounded-xl shadow-lg transition-all duration-300 border border-light-400 dark:border-dark-500">
              <h3 className="text-xl font-semibold mb-5 text-primary-700 dark:text-primary-400">Chat with Your AI Twin</h3>
              <div className="border-2 border-light-400 dark:border-dark-500 p-6 rounded-xl h-64 flex flex-col items-center justify-center transition-colors duration-300 bg-light-200 dark:bg-dark-700">
                <p className="text-primary-600 dark:text-primary-300 font-medium mb-4">Try our interactive AI chat demo</p>
                <a 
                  href="/demo-chat" 
                  className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-6 rounded-lg transition-colors"
                >
                  Open Chat Demo
                </a>
              </div>
            </div>
            
            <MintTwinBot />
          </div>
        </section>

        {/* FAQ */}
        <section id="faq" className="py-16 px-4 max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12 text-primary-700 dark:text-primary-400">FAQ</h2>
          <div className="space-y-6">
            {[
              { q: "What is TwinBot?", a: "TwinBot is your AI twin on the blockchain, designed to represent you 24/7." },
              { q: "How much does it cost?", a: "One-time payment of $10 or a subscription for advanced features." },
              { q: "Is my data safe?", a: "Yes, your data is stored securely on the blockchain." },
            ].map((faq, index) => (
              <div key={index} className="bg-white dark:bg-dark-600 p-8 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 border border-light-400 dark:border-dark-500">
                <h3 className="text-xl font-semibold mb-3 text-primary-700 dark:text-primary-400">{faq.q}</h3>
                <p className="text-dark-400 dark:text-light-300">{faq.a}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Footer */}
        <footer className="py-12 px-4 text-center bg-gradient-primary text-white transition-colors duration-300">
          <p className="mb-6 font-medium">© 2025 TwinBot. All rights reserved.</p>
          <div className="flex justify-center space-x-6">
            <a href="#" className="hover:text-light-200 transition-colors duration-300 font-medium">Twitter</a>
            <a href="#" className="hover:text-light-200 transition-colors duration-300 font-medium">Discord</a>
            <a href="#" className="hover:text-light-200 transition-colors duration-300 font-medium">Email</a>
          </div>
        </footer>
      </div>
    </>
  );
}
