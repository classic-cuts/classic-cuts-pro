"use client";

import { useRouter } from "next/navigation";
import Button from "./Button";
import { useEffect } from "react";

interface NullDataProps {
  title: String;
}

const NullData: React.FC<NullDataProps> = ({ title }) => {
  useEffect(() => {
    document.title = "This page could not be found | Classic Cuts";
  }, []);
  const router = useRouter();
  return (
    <main className="flex flex-col items-center mt-14">
      <div className="">
        <img
          src="https://img1a.flixcart.com/www/linchpin/fk-cp-zion/img/error-500_f9bbb4.png"
          alt=""
          width="500px"
        />
      </div>
      <p className="text-xl text-slate-500">{title}</p>
      <div className="mt-4">
        <Button label="Go to HomePage" onClick={() => router.replace("/")} />
      </div>
    </main>
  );
};

export default NullData;
