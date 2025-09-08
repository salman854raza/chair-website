'use client';
import { useCart } from '@/context/CartContext';
import CartItem from '@/components/CartItem';

export default function Cart() {
  const { state } = useCart();
  const total = state.items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <main className="p-4">
      <h1 className="text-3xl font-bold mb-6">Shopping Cart</h1>
      {state.items.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <>
          <div className="space-y-4">
            {state.items.map((item) => (
              <CartItem key={item._id} item={item} />
            ))}
          </div>
          <div className="mt-6 text-xl font-bold">Total: ${total.toFixed(2)}</div>
          <button className="bg-green-500 text-white px-6 py-2 mt-4 rounded">Checkout</button>
        </>
      )}
    </main>
  );
}