'use client';
import Link from 'next/link';
import { useCart } from '@/context/CartContext';
import { useState } from 'react';
import { Search } from 'lucide-react'; // Assume lucide-react installed: npm i lucide-react

export default function Navbar() {
  const { state } = useCart();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-blue-600 text-white p-4 shadow-lg">
      <div className="container mx-auto flex justify-between items-center">
        <Link href="/" className="text-2xl font-bold">Chair Haven</Link>
        <div className="hidden md:flex space-x-4">
          <Link href="/">Home</Link>
          <Link href="/products">Products</Link>
          <Link href="/cart">Cart ({state.items.length})</Link>
        </div>
        <div className="flex items-center space-x-4">
          <Link href="/api/search">Search</Link>
          <button onClick={() => setIsOpen(!isOpen)} className="md:hidden">Menu</button>
        </div>
      </div>
      {isOpen && (
        <div className="md:hidden mt-2 space-y-2">
          <Link href="/" className="block">Home</Link>
          <Link href="/products" className="block">Products</Link>
          <Link href="/cart" className="block">Cart ({state.items.length})</Link>
        </div>
      )}
    </nav>
  );
}