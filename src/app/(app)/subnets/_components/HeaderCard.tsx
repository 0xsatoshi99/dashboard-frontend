import useAppSelector from "@/hooks/global/useAppSelector";
import { formattedSeconds, formattedTimeFromSeconds } from "@/utils/date.utils";
import React, { useEffect, useState } from "react";

const HeaderCard = ({ meta, scanTime }: any) => {
  const price = meta.tao_in.rao / meta.alpha_in.rao;
  const regBlocks = meta.block_at_registration.replace("(", "").replace(")", "").split(",");
  const lastReg = regBlocks.reduce((val, reg) => (Number(reg) > val ? reg : val), 0);

  const [time, setTime] = useState(Date.now());

  useEffect(() => {
    const timer = setInterval(() => setTime(Date.now()), 1000);
    return () => {
      clearInterval(timer);
    };
  }, []);

  return (
    <div className="bg-gray-950 rounded-8 p-16 mb-12 flex gap-32 text-13">
      <div>
        <span className="text-sky-400">Date </span>
        {formattedTimeFromSeconds((meta.block - meta.network_registered_at) * 12, true)} ago
      </div>
      <div>
        <span className="text-sky-400">Alpha Price </span>
        <span className={`${price > 1 ? "text-red-400" : price < 0.005 ? "" : "text-green-400"}`}>
          {price.toLocaleString()}
        </span>
      </div>
      <div>
        <span className="text-sky-400">Pool Tao </span>
        <span className={meta.tao_in.rao / 10 ** 9 < 100 ? "text-red-400" : "text-green-400"}>
          τ{(meta.tao_in.rao / 10 ** 9).toLocaleString()}
        </span>
      </div>
      <div>
        <span className="text-sky-400">Key </span>
        <span className={meta.num_uids === meta.max_uids ? "" : "text-green-400"}>
          {meta.num_uids}/{meta.max_uids}
        </span>
      </div>
      <div>
        <span className="text-sky-400">Reg.Cost </span>τ{(meta.burn.rao / 10 ** 9).toLocaleString()}
      </div>
      <div>
        <span className="text-sky-400">Reg.Allowed </span>
        <span className={meta.registration_allowed ? "text-green-400" : "text-red-400"}>
          {meta.registration_allowed ? "True" : "False"}
        </span>
      </div>

      <a href={`https://taostats.io/subnets/${meta.netuid}/metagraph`} className="text-orange-400" target="_blank">
        TaoStats
      </a>
      <a href={`https://taomarketcap.com/subnets/${meta.netuid}/weights`} className="text-orange-400" target="_blank">
        TaoMarketcap
      </a>
      {meta.identity?.github_repo && (
        <a href={meta.identity.github_repo} className="text-orange-400" target="_blank">
          Github
        </a>
      )}
      <div className="ml-auto">
        <span className="text-sky-400">Reg </span>
        <span>
          {formattedSeconds(
            (meta.adjustment_interval - ((meta.block - lastReg) % 360)) * 12 * 1000 - (time - scanTime)
          ) || "updated"}
        </span>
      </div>
      <div>
        <span className="text-sky-400">Weight </span>
        <span>
          {formattedSeconds((meta.adjustment_interval - meta.blocks_since_last_step) * 12 * 1000 - (time - scanTime)) ||
            "updated"}
        </span>
      </div>
    </div>
  );
};

export default HeaderCard;
