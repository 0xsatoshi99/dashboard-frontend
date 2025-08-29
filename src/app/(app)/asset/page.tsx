"use client";

import DataCrunch from "./_components/DataCrunch";
import GPU from "./_components/GPU";
import OpenAI from "./_components/OpenAI";
import Shadeform from "./_components/ShadeForm";
import VPS from "./_components/VPS";

const AssetPage = () => {
  return (
    <div className="flex flex-col gap-32 pb-32">
      <OpenAI />
      <VPS />
      <GPU />
      <DataCrunch />
      <Shadeform/>
    </div>
  );
};

export default AssetPage;
