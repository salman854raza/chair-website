import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { CartProvider } from '@/context/CartContext';
import Navbar from '@/components/Navbar';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Chair Haven - Premium Chairs & Furniture',
  description: 'Discover high-quality chairs for home and office.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <CartProvider>
          <Navbar />
          {children}
          <footer className="bg-gray-800 text-white p-4 text-center">
            © 2025 Chair Haven. All rights reserved.
          </footer>
        </CartProvider>
      </body>
    </html>
  );
}