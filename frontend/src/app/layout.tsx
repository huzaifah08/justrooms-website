// src/app/layout.tsx
import './globals.css';
import type { Metadata } from 'next';
import Header from './components/header';
import Footer from './components/footer';

export const metadata: Metadata = {
  title: 'JustRooms',
  description: 'Book your perfect hotel room easily.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-white flex flex-col min-h-screen">
        <Header />
        <main className="max-w-[1200px] mx-auto w-full px-4 flex-1">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
