"use client";

import { useEffect } from "react";
import { MdArrowBack } from "react-icons/md";

import Link from "next/link";
import { useRouter } from "next/navigation";

import { useCart } from "@/hooks/useCart";

import Heading from "../components/Heading";
import Button from "../components/Button";

import ItemContent from "./ItemContent";

import { formatPrice } from "@/utils/formatPrice";

import { SafeUser } from "@/types";

interface CartClientProps {
  currentUser: SafeUser | null | undefined;
}

const CartClient: React.FC<CartClientProps> = ({ currentUser }) => {
  useEffect(() => {
    document.title = "Cart | Classic Cuts";
    if(currentUser?.role==="ADMIN" || currentUser?.role==="SELLER"){
      router.replace("/")
    }
  }, []);

  const { cartProducts, handleClearCart, cartTotalAmount } = useCart();

  const router = useRouter();

  if (currentUser?.role === "ADMIN") {
    router.push("/");
  } else if (!cartProducts || !cartProducts.length) {
    return (
      <div className="flex flex-col items-center ">
        <div className="text-2xl">Your cart is empty</div>
        <div>
          <Link
            href={"/"}
            className="text-slate-500 flex items-center gap-1 mt-2"
          >
            <MdArrowBack />
            <span>Start Shopping</span>
          </Link>
        </div>
      </div>
    );
  }
  return (
    <div>
      <Heading title="Shopping Cart" center />
      <div className="grid grid-cols-5 text-xs gap-4 pb-2 items-center mt-8">
        <div className="col-span-2 justify-self-start">PRODUCT</div>
        <div className="justify-self-center">PRICE</div>
        <div className="justify-self-center">QUANTITY</div>
        <div className="justify-self-end">TOTAL</div>
      </div>
      <div>
        {cartProducts &&
          cartProducts.map((item) => {
            return <ItemContent key={item.id} item={item} />;
          })}
      </div>

      <div className="border-t-[1.5px] border-x-slate-200 py-4 flex justify-between gap-4">
        <div className="w-[90px]">
          <Button
            label="Clear Cart"
            onClick={() => handleClearCart()}
            small
            outline
          />
        </div>
        <div className="text-sm flex flex-col gap-1 items-start">
          <div className="flex justify-between w-full  text-base font-semibold">
            <span>Subtotal</span>
            <span>{formatPrice(cartTotalAmount)}</span>
          </div>
          <p className="text-slate-500">
            Taxes and shipping calculated at checkout
          </p>
          <Button
            label={currentUser ? "Checkout" : "Login to checkout"}
            outline={currentUser ? false : true}
            onClick={() => {
              currentUser ? router.push("/checkout") : router.push("/login");
            }}
          />
          <Link
            href={"/"}
            className="text-slate-500 flex items-center gap-1 mt-2"
          >
            <MdArrowBack />
            <span>Continue Shopping</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CartClient;
