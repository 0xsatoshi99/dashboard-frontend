"use client";

import DataCrunch from "./_components/DataCrunch";
import GPU from "./_components/GPU";
import OpenAI from "./_components/OpenAI";
import Shadeform from "./_components/ShadeForm";
import VPS from "./_components/VPS";
import axiosInstance from "@/config/axios";
import useAppDispatch from "@/hooks/global/useAppDispatch";
import {useEffect} from 'react'
import {
  setOblivusStatus,
  setOpenAIStatus,
  setVPSStatus,
  setDataCrunchStatus,
  setShadeformStatus,
} from "@/store/slices/asset.slice";

  
const AssetPage = () => {
  
  const dispatch = useAppDispatch();
  const handleGetData = async() => {
    try{
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
    }catch (error) {}
  }
  useEffect(() => {
    try {
      handleGetData();
    } catch (error) {
      console.log("Error fetching ASSET data");
    }
    return () => {};
  }, []); //eslint-disable-line
  return (
    <div className="flex flex-col gap-32 pb-32">
      {/* <OpenAI /> */}
      <VPS />
      {/* <GPU /> */}
      {/* <DataCrunch /> */}
      {/* <Shadeform/> */}
    </div>
  );
};

export default AssetPage;
