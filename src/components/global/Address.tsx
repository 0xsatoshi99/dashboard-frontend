"use client";
import React from "react";
import { CopyToClipboard } from "react-copy-to-clipboard";
import toast from "react-hot-toast";
import { Tooltip } from "react-tooltip";
import { shortenAddress } from "@/utils/web3.utils";

type Props = {
  address: string;
  uid: string;
};

const Address = ({ uid, address }: Props) => {
  return (
    <>
      <CopyToClipboard
        text={address}
        onCopy={() => {
          toast.success("Copied address.");
        }}
      >
        <span data-tooltip-id={`${uid}-${address}`} className="cursor-pointer u-transition-color hover:text-white">
          {shortenAddress(address)}
        </span>
      </CopyToClipboard>
      <Tooltip id={`${uid}-${address}`} className="!bg-gray-800">
        <div className="text-12 text-gray-400">{address}</div>
      </Tooltip>
    </>
  );
};

export default Address;
