"use client";
import React from "react";
import { CopyToClipboard } from "react-copy-to-clipboard";
import toast from "react-hot-toast";
import { Tooltip } from "react-tooltip";

type Props = {
  address: string;
  name: string;
  uid: string;
  max?: number;
};

const AddressWithName = ({ uid, address, name, max = 12 }: Props) => {
  return (
    <>
      <CopyToClipboard
        text={address}
        onCopy={() => {
          toast.success("Copied address.");
        }}
      >
        <span data-tooltip-id={`${uid}-${address}`} className="cursor-pointer u-transition-color hover:text-white">
          {name.length > max ? (
            <span>
              {name.slice(0, max / 2)}...{name.slice(-max / 2)}
            </span>
          ) : (
            <span>{name}</span>
          )}
        </span>
      </CopyToClipboard>
      <Tooltip id={`${uid}-${address}`} className="!bg-gray-800">
        <div className="text-12 text-gray-400">{address}</div>
      </Tooltip>
    </>
  );
};

export default AddressWithName;
