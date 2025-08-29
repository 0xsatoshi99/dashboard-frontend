"use client";
import React from "react";
import { Tooltip } from "react-tooltip";

type Props = {
  text: string;
  uid: string;
  max?: number;
};

const ShortenText = ({ uid, text, max = 8 }: Props) => {
  if (text.length > max)
    return (
      <>
        <span data-tooltip-id={`${uid}-${text}`} className="cursor-pointer u-transition-color hover:text-white">
          {text.slice(0, max / 2)}...{text.slice(-max / 2)}
        </span>
        <Tooltip id={`${uid}-${text}`} className="!bg-gray-800">
          <div className="text-12 text-gray-400">{text}</div>
        </Tooltip>
      </>
    );
  return <span>{text}</span>;
};

export default ShortenText;
