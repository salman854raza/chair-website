'use client';
import { useCart } from '@/context/CartContext';
import { CartItem as CartItemType } from '@/types/product';
import Image from 'next/image';

interface Props {
  item: CartItemType;
}

export default function CartItem({ item }: Props) {
  const { dispatch } = useCart();

  const updateQuantity = (quantity: number) => {
    if (quantity <= 0) {
      dispatch({ type: 'REMOVE_ITEM', payload: item._id });
    } else {
      dispatch({ type: 'UPDATE_QUANTITY', payload: { id: item._id, quantity } });
    }
  };

  return (
    <div className="flex items-center border-b py-2">
      <Image src={item.imagePath} alt={item.name} width={100} height={100} className="object-cover" />
      <div className="ml-4 flex-1">
        <h3>{item.name}</h3>
        <p>${item.price}</p>
      </div>
      <div className="flex items-center space-x-2">
        <button onClick={() => updateQuantity(item.quantity - 1)}>-</button>
        <span>{item.quantity}</span>
        <button onClick={() => updateQuantity(item.quantity + 1)}>+</button>
        <button onClick={() => dispatch({ type: 'REMOVE_ITEM', payload: item._id })} className="text-red-500">Remove</button>
      </div>
    </div>
  );
}