"use client";
import React, { PropsWithChildren, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Header from "./_components/Header";
import { APP_SONIX } from "@/config/env";
import axiosInstance from "@/config/axios";
import useAppDispatch from "@/hooks/global/useAppDispatch";
import { setColdkeys, setTaoPrice, setTeamColdkeys } from "@/store/slices/global.slice";
import {
  setOblivusStatus,
  setOpenAIStatus,
  setVPSStatus,
  setDataCrunchStatus,
  setShadeformStatus,
} from "@/store/slices/asset.slice";

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

      const openai = await axiosInstance.get("/api/asset/openai");
      dispatch(setOpenAIStatus(openai.data));
      const vps = await axiosInstance.get("/api/asset/vps");
      dispatch(setVPSStatus(vps.data));
      const gpu = await axiosInstance.get("/api/asset/oblivus");
      dispatch(setOblivusStatus(gpu.data));

      const datacrunch = await axiosInstance.get("/api/asset/datacrunch");
      dispatch(setDataCrunchStatus(datacrunch.data));

      const shadeform = await axiosInstance.get("/api/asset/shadeform");
      dispatch(setShadeformStatus(shadeform.data));
    } catch (error) {}
  };

  useEffect(() => {
    setIsClient(true);
    const sonix = localStorage.getItem("TAO-SONIX");
    if (!sonix || sonix !== APP_SONIX) {
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
