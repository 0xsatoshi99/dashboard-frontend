"use client";
import AddressWithName from "@/components/global/AddressWithName";
import useAppSelector from "@/hooks/global/useAppSelector";
import { intToIPv4, stringToColorHex } from "@/utils/string.utils";
import React, { useEffect, useMemo, useState } from "react";
import UnstakeModal from "./_components/UnstakeModal";
import MinersChart from "./_components/MinersChart";
import HeaderCard from "./_components/HeaderCard";
import { formattedTimeFromSeconds } from "@/utils/date.utils";
import axiosInstance from "@/config/axios";

const SubnetPage = () => {
  const [unstakeModalData, setUnstakeModalData] = useState(null);
  const [scanTime, setScanTime] = useState(0);
  const [metagraphs, setMetagraphs] = useState(null);
  const { coldkeys, team } = useAppSelector((state) => state.global);

  const hotkeys = useMemo(
    () => coldkeys.flatMap((item) => item.hotkeys.map((hotkey) => ({ ...hotkey, ...item, hotkeyName: hotkey.name }))),
    [coldkeys]
  );

  const handleGetMetagraphs = async () => {
    try {
      const result = await axiosInstance.get("/api/metagraphs");
      setMetagraphs(result.data);
      setScanTime(Date.now());
    } catch (error) {}
  };

  useEffect(() => {
    try {
      handleGetMetagraphs();
    } catch (error) {
      console.log("Error fetching metagraphs data");
    }
    return () => {};
  }, []); //eslint-disable-line

  return (
    <>
      <div className="fixed right-0 top-0 bg-gray-950/60 backdrop-blur-md flex gap-12 mx-auto text-13 rounded-8 p-12 opacity-40 hover:opacity-100 transition-opacity transition-200 cursor-pointer z-[100000]">
        👆
        {metagraphs
          ?.map((meta) => meta.netuid)
          ?.map((uid) => (
            <a key={uid} className="hover:text-sky-400" href={`#sn${uid}`}>
              {uid}
            </a>
          ))}
      </div>
      <div className="w-full flex flex-col gap-48 pb-24">
        {!coldkeys || !metagraphs || !coldkeys.length || !metagraphs.length ? (
          <div className="flex flex-col gap-12">
            {new Array(8).fill(0).map((_, i) => (
              <div key={i} className="w-full h-40 rounded-12 animate-lazy"></div>
            ))}
          </div>
        ) : (
          <>
            {metagraphs?.map((meta) => {
              const price = meta.tao_in.rao / meta.alpha_in.rao;
              let totalStaked = 0;
              let totalDaily = 0;
              const length = hotkeys.reduce(
                (total, hotkey) => (meta.hotkeys.includes(hotkey.hotkey) ? total + 1 : total),
                0
              );
              const reg_blocks = meta.block_at_registration.replace(`(`, "").replace(`)`, "").split(", ");
              const chartData = meta?.hotkeys
                ?.map((hotkey, i) => {
                  return {
                    uid: i,
                    hotkey,
                    isMiner: meta.dividends[i] === 0,
                    incentive: meta.incentives[i],
                    daily: (meta.emission[i].rao / 10 ** 9) * 20 * (meta.tao_in.rao / meta.alpha_in.rao),
                    stake: meta.alpha_stake[i].rao / 10 ** 9,
                    coldkey: meta.coldkeys[i],
                    registerDuration:
                      meta.block - meta.block_at_registration.replace(`(`, "").replace(`)`, "").split(", ")[i],
                    owner: team.find((item) => item.coldkeys.includes(meta.coldkeys[i]))?.name || "Unknown",
                  };
                })
                .filter((item) => item.isMiner)
                .sort((a, b) => b.incentive - a.incentive)
                .map((item, i) => ({ ...item, ranking: i + 1 }));

              return (
                <div key={meta.netuid} id={`sn${meta.netuid}`}>
                  <div className="flex items-end gap-8 mb-16">
                    <h4>
                      Subnet {meta.netuid}{" "}
                      <span className="text-sky-400">{meta?.identity?.subnet_name || "Unknown"}</span>
                    </h4>
                    <div>
                      ({length} Miner{length > 1 && "s"})
                    </div>
                  </div>
                  <HeaderCard meta={meta} scanTime={scanTime} />
                  <MinersChart chartData={chartData} />
                  <div className="flex items-center justify-center gap-16 flex-wrap pb-12">
                    {team.map((item) => {
                      const miners_amount = meta.coldkeys.reduce(
                        (sum, key) => (item.coldkeys.includes(key) ? sum + 1 : sum),
                        0
                      );
                      return (
                        <>
                          {miners_amount > 0 && (
                            <div key={item.name} className="flex gap-4 text-12 items-center">
                              <div className="w-8 h-8" style={{ backgroundColor: stringToColorHex(item.name) }}></div>
                              <span style={{ color: stringToColorHex(item.name) }}>{item.name}</span>
                              <span>{miners_amount}</span>
                            </div>
                          )}
                        </>
                      );
                    })}
                  </div>
                  {length > 0 ? (
                    <table>
                      <thead>
                        <tr>
                          <th className="w-40">UID</th>
                          <th className="w-100">ColdKey</th>
                          <th className="w-100">Hotkey</th>
                          <th className="w-80">Ranking</th>
                          <th className="w-120">Axon</th>
                          <th className="w-120">Age</th>
                          <th className="w-80">Dereg</th>
                          <th className="w-120">Staked</th>
                          <th className="w-120">Daily</th>
                          <th className="w-80"></th>
                        </tr>
                      </thead>
                      <tbody>
                        {hotkeys.map((hotkey) => {
                          const id = meta.hotkeys.indexOf(hotkey.hotkey);
                          if (id < 0) return;
                          const incentive = meta.incentives[id];
                          const ranking = meta.incentives.reduce(
                            (total, item) => (item > incentive ? total + 1 : total),
                            0
                          );

                          const p_score = meta.pruning_score[id] + reg_blocks[id] / 100000000000;
                          const is_immune = reg_blocks[id] > meta.block - meta.immunity_period;
                          const dereg = meta.pruning_score.reduce(
                            (total, item, idx) =>
                              item +
                                reg_blocks[idx] /
                                  (reg_blocks[idx] > meta.block - meta.immunity_period ? 1 : 100000000000) <
                              p_score
                                ? total + 1
                                : total,
                            1
                          );
                          const staked = meta.alpha_stake[id].rao;
                          const daily = meta.emission[id].rao * 20;
                          const axon = meta.axons.replace('"(', "").replace(')"', "").split(",")[id];
                          totalStaked += staked;
                          totalDaily += daily;
                          return (
                            <tr key={`${meta.netuid}-${hotkey.hotkey}`}>
                              <td>{id}</td>
                              <td>
                                <AddressWithName
                                  name={hotkey.name}
                                  address={hotkey.coldkey}
                                  uid={`subnet-coldkey-${id}-${meta.netuid}-${hotkey.hotkey}`}
                                  max={12}
                                />
                              </td>
                              <td>
                                <AddressWithName
                                  name={hotkey.hotkeyName}
                                  address={hotkey.hotkey}
                                  uid={`subnet-hotkey-${meta.netuid}-${hotkey.hotkey}`}
                                  max={12}
                                />
                              </td>
                              <td>#{ranking + 1}</td>
                              <td>
                                {intToIPv4(axon.ip)}:{axon.port}
                              </td>
                              <td>{formattedTimeFromSeconds((meta.block - reg_blocks[id]) * 12, true)} ago</td>
                              <td className={is_immune ? "text-green-400" : dereg < 10 ? "text-red-400" : ""}>
                                {is_immune ? "Immune" : `#${dereg}`}
                              </td>
                              <td>
                                {meta.symbol}
                                {(staked / 10 ** 9).toLocaleString()} / τ{((staked * price) / 10 ** 9).toLocaleString()}
                              </td>
                              <td>
                                {meta.symbol}
                                {(daily / 10 ** 9).toLocaleString()} / τ{((daily * price) / 10 ** 9).toLocaleString()}
                              </td>
                              <td>
                                <span
                                  className="cursor-pointer text-orange-400"
                                  onClick={() =>
                                    setUnstakeModalData({
                                      coldkey: hotkey.coldkey,
                                      coldkeyName: hotkey.name,
                                      hotkey: hotkey.hotkey,
                                      hotkeyName: hotkey.hotkeyName,
                                      netuid: meta.netuid,
                                      netName: meta?.identity?.subnet_name || "Unknown",
                                      amount: staked / 10 ** 9,
                                      price: price,
                                    })
                                  }
                                >
                                  Unstake
                                </span>
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                      <tfoot>
                        <tr className="text-sky-400">
                          <td>Total</td>
                          <td></td>
                          <td></td>
                          <td></td>
                          <td></td>
                          <td></td>
                          <td></td>
                          <td>
                            {meta.symbol}
                            {(totalStaked / 10 ** 9).toLocaleString()} / τ
                            {((totalStaked * price) / 10 ** 9).toLocaleString()}
                          </td>
                          <td>
                            {meta.symbol}
                            {(totalDaily / 10 ** 9).toLocaleString()} / τ
                            {((totalDaily * price) / 10 ** 9).toLocaleString()}
                          </td>
                        </tr>
                      </tfoot>
                    </table>
                  ) : (
                    <div className="text-red-400 text-center">No Miners</div>
                  )}
                </div>
              );
            })}
          </>
        )}
      </div>

      <UnstakeModal data={unstakeModalData} setData={setUnstakeModalData} />
    </>
  );
};

export default SubnetPage;
