"use client";
import React, { useEffect } from "react";
import ColdKeyView from "./_components/ColdKeyView";
import HotKeyView from "./_components/HotKeyView";
import axiosInstance from "@/config/axios";
import useAppDispatch from "@/hooks/global/useAppDispatch";
import { setColdkeys } from "@/store/slices/global.slice";

const WalletPage = () => {
  const dispatch = useAppDispatch();
  const handleGetMetagraphs = async () => {
    try {
      const response = await axiosInstance.get("/api/wallet/coldkeys_info");
      dispatch(setColdkeys(response.data));
    } catch (error) {}
  };

  useEffect(() => {
    handleGetMetagraphs();
    return () => {};
  }, []);

  return (
    <section className="h-full flex gap-16">
      <div className="bg-gray-950 rounded-8 p-16 w-full overflow-auto">
        <ColdKeyView />
      </div>
      <div className="bg-gray-950 rounded-8 p-16 w-full overflow-auto">
        <HotKeyView />
      </div>
    </section>
  );
};

export default WalletPage;
