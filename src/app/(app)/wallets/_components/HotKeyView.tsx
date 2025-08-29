import Address from "@/components/global/Address";
import useAppSelector from "@/hooks/global/useAppSelector";
import React, { useMemo, useState } from "react";
import UnstakeModal from "./UnstakeModal";

const HotKeyView = () => {
  const [unstakeModalData, setUnstakeModalData] = useState(null);
  const { coldkeys } = useAppSelector((state) => state.global);
  const { selectedColdKeyId } = useAppSelector((state) => state.temp);
  const mainColdKey = useMemo(
    () => coldkeys.find((item) => item.coldkey === selectedColdKeyId?.coldkey),
    [coldkeys, selectedColdKeyId]
  );
  return (
    <>
      <div className="w-full">
        <h4 className="mb-16">🔥HotKeys</h4>
        {!coldkeys || !coldkeys.length ? (
          <div className="flex flex-col gap-12">
            {new Array(4).fill(0).map((_, i) => (
              <div key={i} className="w-full h-120 rounded-12 animate-lazy"></div>
            ))}
          </div>
        ) : (
          <>
            {!selectedColdKeyId ? (
              <div className="text-gray-600">Please Select Coldkey to display hotkey details</div>
            ) : (
              <div className="flex flex-col gap-12 h-full">
                {mainColdKey?.hotkeys.map((hotkey) => {
                  let totalStaked = 0;
                  const stakes = mainColdKey.stakeInfo.filter((i) => i.hotkey_ss58 === hotkey.hotkey);
                  return (
                    <div key={hotkey.hotkey} className="border border-sky-400/20 border-t-0">
                      <div className="flex items-center gap-12 bg-sky-400/20 p-12">
                        <span className="text-sky-400">{hotkey.name}</span>
                        <Address address={hotkey.hotkey} uid="hotkeyview" />
                        <div className="ml-auto">Staked on {stakes.length} Subnets</div>
                      </div>
                      <div className="p-12 flex flex-col gap-24">
                        {stakes.length > 0 ? (
                          <table>
                            <thead>
                              <tr>
                                <th>Subnet</th>
                                <th>Mining</th>
                                <th>Staked Alpha</th>
                                <th>Staked Tao</th>
                                <th></th>
                              </tr>
                            </thead>
                            <tbody>
                              {stakes.map((info) => {
                                totalStaked += info.stake * info.alpha_price;
                                return (
                                  <tr key={hotkey.hotkey + info.netuid}>
                                    <td>{info.netuid}</td>
                                    <td className={info.is_registered ? "text-green-400" : "text-red-400"}>
                                      {info.is_registered ? "Yes" : "No"}
                                    </td>
                                    <td>{info.stake.toLocaleString()}</td>
                                    <td>{(info.stake * info.alpha_price).toLocaleString()}</td>
                                    <td>
                                      <span
                                        className="cursor-pointer text-orange-400"
                                        onClick={() =>
                                          setUnstakeModalData({
                                            coldkey: selectedColdKeyId.coldkey,
                                            coldkeyName: selectedColdKeyId.name,
                                            hotkey: hotkey.hotkey,
                                            hotkeyName: hotkey.name,
                                            netuid: info.netuid,
                                            netName: "Unkown",
                                            amount: info.stake,
                                            price: info.alpha_price,
                                          })
                                        }
                                      >
                                        Untake
                                      </span>
                                    </td>
                                  </tr>
                                );
                              })}
                            </tbody>
                            <tfoot>
                              <tr className="text-white">
                                <td>Total</td>
                                <td></td>
                                <td></td>
                                <td>τ{totalStaked.toLocaleString()}</td>
                                <td></td>
                              </tr>
                            </tfoot>
                          </table>
                        ) : (
                          <div>No Data</div>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </>
        )}
      </div>
      <UnstakeModal data={unstakeModalData} setData={setUnstakeModalData} />
    </>
  );
};

export default HotKeyView;
