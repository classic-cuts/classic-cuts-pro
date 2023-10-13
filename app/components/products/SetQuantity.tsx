"use client";

import { CartProductType } from "@/app/product/[productid]/ProductDetails";

interface SetQtyProps {
  CartCounter?: boolean;
  CartProduct: CartProductType;
  handleQtyIncrease: () => void;
  handleQtyDecrease: () => void;
}

const btnStyle = "border-[1.2px] border-slate-300 px-2 rounded";

const SetQuantity: React.FC<SetQtyProps> = ({
  CartProduct,
  CartCounter,
  handleQtyIncrease,
  handleQtyDecrease,
}) => {
  return (
    <div className="flex gap-8 items-center">
      {CartCounter ? null : <div className="font-semibold">QUANTITY</div>}
      <div className="flex gap-4 items-center text-base">
        <button onClick={handleQtyDecrease} className={btnStyle}>
          -
        </button>
        <div>{CartProduct.quantity}</div>
        <button onClick={handleQtyIncrease} className={btnStyle}>
          +
        </button>
      </div>
    </div>
  );
};

export default SetQuantity;
