"use client";
import Address from "@/components/global/Address";
import axiosInstance from "@/config/axios";
import { formattedTimeFromSeconds } from "@/utils/date.utils";
import { Icon } from "@iconify/react/dist/iconify.js";
import React, { useEffect, useMemo, useState } from "react";
import toast from "react-hot-toast";
import DetailVeiw from "./_components/DetailVeiw";
import Timer from "./_components/Timer";

const Overview = () => {
  const [active, setActive] = useState(null);
  const [scanTime, setScanTime] = useState(Date.now());
  const [activeMetagraph, setActiveMetagraph] = useState(null);
  const [overviewData, setOverviewData] = useState([]);
  const [sort, setSort] = useState("uid");
  const sortedData = useMemo(
    () =>
      overviewData.sort((a, b) => {
        if (sort === "emission") return b.emission.rao - a.emission.rao;
        else if (sort === "price") return b.price.rao - a.price.rao;
        else if (sort === "pool") return b.pool.rao - a.pool.rao;
        else if (sort === "regcost") return b.reg_fee.rao - a.reg_fee.rao;
        else if (sort === "miners") return b.miners - a.miners;
        else if (sort === "reward") {
          return b.reward * b.price.rao - a.reward * a.price.rao;
        }
        return a.netuid - b.netuid;
      }),
    [overviewData, sort]
  );

  const getOverviewAll = async () => {
    try {
      const response = await axiosInstance.get("/api/overview");
      const result = response.data;
      setOverviewData(result);
      setScanTime(Date.now());
    } catch (error) {
      toast.error("Error getting overview data");
    }
  };

  const getActiveMetagraphData = async (activeId: number) => {
    try {
      setActiveMetagraph(null);
      const response = await axiosInstance.post(`/api/metagraph`, { uid: activeId });
      const result = response.data;
      setActiveMetagraph(result);
    } catch (error) {
      toast.error("Error getting metagraph");
    }
  };

  useEffect(() => {
    getOverviewAll();
    return () => { };
  }, []);
  return (
    <div className="py-16">
      {!overviewData || !overviewData.length ? (
        <div className="flex flex-col gap-12">
          {new Array(8).fill(0).map((_, i) => (
            <div key={i} className="w-full h-40 rounded-12 animate-lazy"></div>
          ))}
        </div>
      ) : (
        <table>
          <thead>
            <tr>
              <th onClick={() => setSort("uid")} className={sort === "uid" ? "!text-white" : "cursor-pointer"}>
                UID
              </th>
              <th className="">Name</th>
              <th className="">Github</th>
              <th className="">Owner</th>
              <th className="">Date</th>
              <th
                onClick={() => setSort("emission")}
                className={sort === "emission" ? "!text-white" : "cursor-pointer"}
              >
                Emission
              </th>
              <th onClick={() => setSort("price")} className={sort === "price" ? "!text-white" : "cursor-pointer"}>
                Price
              </th>
              <th onClick={() => setSort("pool")} className={sort === "pool" ? "!text-white" : "cursor-pointer"}>
                Pool
              </th>
              <th className="">Reg</th>
              <th onClick={() => setSort("regcost")} className={sort === "regcost" ? "!text-white" : "cursor-pointer"}>
                Reg.Cost
              </th>
              <th className="">Burning</th>
              <th onClick={() => setSort("miners")} className={sort === "miners" ? "!text-white" : "cursor-pointer"}>
                Miners
              </th>
              <th onClick={() => setSort("reward")} className={sort === "reward" ? "!text-white" : "cursor-pointer"}>
                Reward
              </th>
              <th className="">Weight</th>
              <th className="">Reg</th>
              <th className="py-0"></th>
            </tr>
          </thead>
          <tbody>
            {sortedData.map((subnet) => {

              return (
                <React.Fragment key={subnet.netuid}>
                  <tr className={subnet.netuid === active ? "!bg-gray-950" : ""}>
                    <td>{subnet.netuid}</td>
                    <td>
                      <Address uid={`address-overview-${subnet.subnet_name}`} address={subnet.subnet_name} />
                    </td>
                    <td className={subnet.subnet_repo ? "text-green-400" : "text-red-400"}>
                      {subnet.subnet_repo ? (
                        <div className="w-fit">
                          <a target={"_blank"} href={subnet.subnet_repo || "#"}>
                            <Icon icon="iconoir:github" />
                          </a>
                        </div>
                      ) : (
                        <Icon icon="iconoir:github" />
                      )}
                    </td>
                    <td>
                      <Address uid={`address-overview-${subnet.owner}`} address={subnet.owner} />
                    </td>
                    <td>{formattedTimeFromSeconds((subnet.current_block - subnet.register_at) * 12, true)} ago</td>
                    <td className={subnet.emission.rao > 0 ? "text-green-400" : "text-red-400"}>
                      {(subnet.emission.rao / 10 ** 7).toLocaleString()}%
                    </td>
                    <td
                      className={
                        subnet.price.rao > 10 ** 9
                          ? "text-red-400"
                          : subnet.price.rao < 10 ** 7
                            ? "text-orange-400"
                            : "text-green-400"
                      }
                    >
                      {subnet.price.unit}
                      {(subnet.price.rao / 10 ** 9).toLocaleString()}
                    </td>

                    <td
                      className={
                        subnet.pool.rao > 10 ** 12
                          ? "text-green-400"
                          : subnet.pool.rao < 10 ** 11
                            ? "text-red-400"
                            : "text-orange-400"
                      }
                    >
                      {subnet.pool.unit}
                      {(subnet.pool.rao / 10 ** 9).toLocaleString()}
                    </td>
                    <td>{subnet.reg_allowed ? "🟢" : "🔴"}</td>
                    <td
                      className={
                        subnet.reg_fee.rao > 0.5 * 10 ** 9
                          ? "text-red-400"
                          : subnet.reg_fee.rao < 0.5 * 10 ** 7
                            ? "text-green-400"
                            : "text-orange-400"
                      }
                    >
                      {subnet.reg_fee.unit}
                      {(subnet.reg_fee.rao / 10 ** 9).toLocaleString()}
                    </td>
                    <td className={subnet.is_burning ? "text-green-400" : "text-red-400"}>
                      {subnet.is_burning ? "Yes" : "No"}
                    </td>
                    <td
                      className={
                        subnet.miners > 30
                          ? "text-green-400"
                          : subnet.miners == 0
                            ? "text-red-400"
                            : "text-sky-400"
                      }
                    >
                      {subnet.miners}
                    </td>
                    <td className={subnet.reward === 0 ? "text-red-400" : "text-green-400"}>
                      {subnet.symbol}
                      {subnet.reward.toLocaleString()} / {subnet.price.unit}
                      {((subnet.reward * subnet.price.rao) / 10 ** 9).toLocaleString()}
                    </td>
                    <td><Timer scanTime={scanTime} block={subnet.current_block} last={subnet.last_weight} /></td>
                    <td><Timer scanTime={scanTime} block={subnet.current_block} last={subnet.last_reg} /></td>
                    <td>
                      <div className="flex items-center justify-end gap-8">
                        <div
                          onClick={() => {
                            if (active !== subnet.netuid) getActiveMetagraphData(subnet.netuid);
                            setActive(active === subnet.netuid ? null : subnet.netuid);
                          }}
                          className={` cursor-pointer border px-8 py-4 rounded-2 ${active === subnet.netuid ? "text-red-400 border-red-400" : "text-sky-400 border-sky-400"
                            }`}
                        >
                          {active === subnet.netuid ? "Hide" : "Detail"}
                        </div>
                      </div>
                    </td>
                  </tr>
                  {active === subnet.netuid && (
                    <tr className="!bg-gray-950">
                      <td colSpan={16} className="border-t border-sky-400">
                        <DetailVeiw meta={activeMetagraph} />
                      </td>
                    </tr>
                  )}
                </React.Fragment>
              );
            })}
          </tbody>
          <tfoot>
            <tr>
              <td>Total</td>
              <td>{overviewData.length - 1} Subnets</td>
              <td className="text-red-400">{overviewData.filter((subnet) => !subnet.subnet_repo).length}</td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td className="text-red-400">🔴 {overviewData.filter((subnet) => !subnet.reg_allowed).length}</td>
              <td>
                τ
                {(
                  overviewData.reduce((total, subnet) => total + subnet.reg_fee.rao / 10 ** 9, 0) / overviewData.length
                ).toLocaleString()}
              </td>
              <td>
                <span className="text-green-400">{overviewData.filter((subnet) => subnet.is_burning).length}</span>
                {" / "}
                <span className="text-red-400">{overviewData.filter((subnet) => !subnet.is_burning).length}</span>
              </td>
              <td>{overviewData.reduce((total, subnet) => total + subnet.miners, 0)}</td>
              <td>
                τ
                {overviewData
                  .reduce((total, subnet) => {
                    return total + subnet.reward * (subnet.price.rao / 10 ** 9);
                  }, 0)
                  .toLocaleString()}
              </td>
            </tr>
          </tfoot>
        </table>
      )}
    </div>
  );
};

export default Overview;
