"use client";
import React from "react";
import { formattedTimeFromSeconds, secondsToDate } from "@/utils/date.utils";
import { Tooltip } from "react-tooltip";

type Props = {
  timestamp: number;
  hint: string;
  isAgo?: boolean;
  isShort?: boolean;
};
const TimeStamp = ({ timestamp, hint, isAgo = true, isShort = false }: Props) => {
  return (
    <>
      <span data-tooltip-id={`${timestamp}-${hint}`} className="cursor-pointer">
        {formattedTimeFromSeconds(Date.now() / 1000 - timestamp, isShort)} {isAgo ? "ago" : ""}
      </span>
      <Tooltip id={`${timestamp}-${hint}`} className="!bg-gray-800">
        <div className="text-12 text-gray-400">
          {secondsToDate(timestamp * 1000).date} {secondsToDate(timestamp * 1000).time}
        </div>
      </Tooltip>
    </>
  );
};

export default TimeStamp;
