"use client";

import { useEffect } from "react";
import Button from "./components/Button";
import { useRouter } from "next/navigation";

const NotFound = () => {
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
      <p className="text-xl">
        Unfortunately the page you are looking for has been moved or deleted
      </p>
      <div className="mt-2">
        <Button label="Go to HomePage" onClick={() => router.push("/")} />
      </div>
    </main>
  );
};

export default NotFound;
