import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import ThemeProvider from "../components/ThemeProvider";
import ThemeToggle from "../components/ThemeToggle";
import { RainbowKitProvider } from "../components/RainbowKitProvider";
import '@rainbow-me/rainbowkit/styles.css';

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "TwinBot | Your AI Twin on the Blockchain",
  description: "Create a digital twin that represents you 24/7, generates personal stories, and builds your online brand. Own it as an NFT.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ThemeProvider>
          <RainbowKitProvider>
            <ThemeToggle />
            {children}
          </RainbowKitProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
