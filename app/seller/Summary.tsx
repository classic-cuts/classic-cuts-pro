"use client";

import { Order, Product } from "@prisma/client";
import { useEffect, useState } from "react";
import Heading from "../components/Heading";
import { formatPrice } from "@/utils/formatPrice";
import { formatNumber } from "@/utils/formatNumber";

interface SummaryProps {
  orders: Order[];
  products: Product[];
  sellerId: string;
}

type summaryDataType = {
  [key: string]: {
    label: string;
    digit: number;
  };
};
const Summary: React.FC<SummaryProps> = ({ orders, products, sellerId }) => {
  const [summaryData, SetSummaryData] = useState<summaryDataType>({
    totalProductsSold: {
      label: "Total Sale",
      digit: 0,
    },
    totalProductsListed: {
      label: "Total Products Listed",
      digit: 0,
    },
    totalOrders: {
      label: "Total Orders",
      digit: 0,
    },
    paidOrders: {
      label: "Paid Orders",
      digit: 0,
    },
    unPaidOrders: {
      label: "Unpaid Orders",
      digit: 0,
    },
  });

  useEffect(() => {
    SetSummaryData((prev) => {
      let tempData = { ...prev };

      const sellerProducts = products.filter(
        (product) => product.sellerId === sellerId
      );

      const sellerOrders = orders.filter((order) =>
        sellerProducts.some((product) => product.id === order.products[0].id)
      );

      // const totalProductsSold = sellerOrders.reduce(
      //   (acc, order) => acc + order.products.quantity,
      //   0
      // );

      const totalProductsSold = sellerOrders.reduce((acc, item) => {
        if (item.status === "complete") {
          return acc + (item.amount/100);
        } else {
          return acc;
        }
      }, 0);

      const totalProductsListed = sellerProducts.length;

      const paidOrders = sellerOrders.filter((order) => {
        return order.status === "complete";
      });

      const unPaidOrders = sellerOrders.filter((order) => {
        return order.status === "pending";
      });

      tempData.totalProductsSold.digit = totalProductsSold;
      tempData.totalProductsListed.digit = totalProductsListed;
      tempData.totalOrders.digit = sellerOrders.length;
      tempData.paidOrders.digit = paidOrders.length;
      tempData.unPaidOrders.digit = unPaidOrders.length;

      return tempData;
    });
  }, [orders, products, sellerId]);

  const summaryKeys = Object.keys(summaryData);

  return (
    <div className="max-w-[1150px] m-auto">
      <div className="mb-4 mt-8">
        <Heading title="Seller Stats" center />
      </div>
      <div className="grid grid-cols-2 gap-3 max-h-50vh overflow-y-auto">
        {summaryKeys &&
          summaryKeys.map((key) => {
            return (
              <div
                key={key}
                className="rounded-xl border-2 flex flex-col items-center gap-2 transition"
              >
                <div className="text-xl md:text-4xl font-bold">
                  {key === "totalProductsSold" ||
                  key === "totalProductsListed" ? (
                    <>{formatNumber(summaryData[key].digit)}</>
                  ) : (
                    <>{formatNumber(summaryData[key].digit)}</>
                  )}
                </div>
                <div>{summaryData[key].label}</div>
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default Summary;
