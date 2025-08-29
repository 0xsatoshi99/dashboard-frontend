import useAppSelector from "@/hooks/global/useAppSelector";
import { IPv4ToInt } from "@/utils/string.utils";
import React from "react";

const VPS = () => {
  const { vps } = useAppSelector((state) => state.asset);
  return (
    <div>
      <h4 className="mb-16">VPS</h4>
      {!vps || !vps.length ? (
        <div className="flex flex-col gap-12">
          {new Array(4).fill(0).map((_, i) => (
            <div key={i} className="w-full h-60 rounded-12 animate-lazy"></div>
          ))}
        </div>
      ) : (
        <div className="flex flex-col gap-8">
          {vps.map((vp) => {
            // const miners = metagraphs
            //   .map((subnet) => ({ axons: subnet.axonArray.map((it, i) => ({ ...it, netuid: subnet.netuid, id: i })) }))
            //   .flatMap((subnet) => subnet.axons)
            //   .filter((item) => item.ip === IPv4ToInt(vp.ip));
            return (
              <div key={vp.ip} className="bg-gray-950 p-12 rounded-6">
                <div className="flex items-center justify-between gap-8">
                  <div className="text-white ">
                    {vp.name} <span className="text-sky-400 ">({vp.ip})</span>
                  </div>
                  <div className="">{vp.description}</div>
                  <div
                    className={
                      new Date(vp.expire).getTime() < Date.now() + 1000 * 60 * 60 * 24 * 5
                        ? "text-red-400"
                        : "text-green-400"
                    }
                  >
                    {vp.expire}
                  </div>
                </div>
                {/* <hr className="my-8 border-indigo-400/10"></hr> */}
                {/* <div className="flex flex-wrap gap-4">
                  {miners.length ? (
                    <>
                      {miners.map((m) => (
                        <div key={m.netuid + "-" + m.id} className="text-12 p-4 bg-gray-800">
                          SN{m.netuid}-{m.id}:<span></span>
                          {m.port}
                        </div>
                      ))}
                    </>
                  ) : (
                    <div>No Miners</div>
                  )}
                </div> */}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default VPS;
