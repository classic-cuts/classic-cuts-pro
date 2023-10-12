"use client";

import { CartContextProvider } from "@/hooks/useCart";

interface CartProvierProps {
  children: React.ReactNode;
}

const CartProvider: React.FC<CartProvierProps> = ({ children }) => {
  return(
    <CartContextProvider>
        {children}
    </CartContextProvider>
  );
};

export default CartProvider
