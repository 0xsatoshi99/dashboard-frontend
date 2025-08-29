"use client";
import { APP_SONIX } from "@/config/env";
import { Icon } from "@iconify/react/dist/iconify.js";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";

const Main = () => {
  const [sonix, setSonix] = useState("");
  const router = useRouter();

  const handleLogin = async () => {
    try {
      if (sonix !== APP_SONIX) throw "error";
      localStorage.setItem("TAO-SONIX", sonix);
      toast.success("Login Success");
      router.push("/wallets");
    } catch (error) {
      toast.error("Login Failed");
    }
  };

  return (
    <div className="h-screen w-screen flex flex-col gap-12 items-center justify-center">
      <Icon icon="arcticons:kaspersky-password-manager" className="text-64 text-sky-500" />
      <input
        className="block p-8 w-200 bg-transparent border border-gray-800 focus-within:border-sky-500 u-transition-color rounded-4 text-12 "
        value={sonix}
        type="password"
        autoFocus
        onChange={(e) => {
          setSonix(e.target.value);
        }}
        onKeyDown={(e) => {
          if (e.key === "Enter") handleLogin();
        }}
      />
    </div>
  );
};

export default Main;
