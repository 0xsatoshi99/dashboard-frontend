"use client";
import React, { PropsWithChildren, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Header from "./_components/Header";
import { APP_JA } from "@/config/env";
import axiosInstance from "@/config/axios";
import useAppDispatch from "@/hooks/global/useAppDispatch";
import { setColdkeys, setTaoPrice, setTeamColdkeys } from "@/store/slices/global.slice";

const RootTemplate = ({ children }: PropsWithChildren) => {
  const router = useRouter();
  const [isClient, setIsClient] = useState(false);
  const dispatch = useAppDispatch();

  const handleGetMetagraphs = async () => {
    try {
      const team = await axiosInstance.get("/api/team/coldkeys");
      dispatch(setTeamColdkeys(team.data));

      const response = await axiosInstance.get("/api/wallet/coldkeys");
      dispatch(setColdkeys(response.data));

      const taoPrice = await axiosInstance.get("/api/asset/tao/price");
      dispatch(setTaoPrice(taoPrice.data));

    } catch (error) {}
  };

  useEffect(() => {
    setIsClient(true);
    const japd = localStorage.getItem("TAO-JA");
    if (!japd || japd !== APP_JA) {
      router.push("/");
    }
  }, [router]);

  useEffect(() => {
    try {
      handleGetMetagraphs();
    } catch (error) {
      console.log("Error fetching metagraphs data");
    }
    return () => {};
  }, []); //eslint-disable-line

  if (!isClient) {
    return null; // Prevents rendering until client-side
  }

  return (
    <>
      <Header />
      <main className="pl-240">
        <div className="relative p-24 h-screen">{children}</div>
      </main>
    </>
  );
};

export default RootTemplate;
