import Address from "@/components/global/Address";
import ShortenText from "@/components/global/ShortenText";
import useAppDispatch from "@/hooks/global/useAppDispatch";
import useAppSelector from "@/hooks/global/useAppSelector";
import { setSelectedColdKeyId } from "@/store/slices/temp.slice";
import { Icon } from "@iconify/react/dist/iconify.js";
import React, { useMemo, useState } from "react";
import UnstakeModal from "./UnstakeModal";
import TransferModal from "./TransferModal";

const ColdKeyView = () => {
  const [unstakeModalData, setUnstakeModalData] = useState(null);
  const [transferModalData, setTransferModalData] = useState(null);
  const dispatch = useAppDispatch();
  const { coldkeys } = useAppSelector((state) => state.global);
  const { selectedColdKeyId } = useAppSelector((state) => state.temp);

  const totalStakedBalance = useMemo(() => {
    return coldkeys.reduce(
      (total, coldkey) =>
        total +
        coldkey.stakeInfo?.reduce((total, item) => {
          return total + item.stake * item.alpha_price;
        }, 0),
      0
    );
  }, [coldkeys]);

  return (
    <>
      <div className="w-full">
        <h4 className="mb-16">🧊 ColdKeys</h4>
        {!coldkeys || !coldkeys.length ? (
          <div className="flex flex-col gap-12">
            {new Array(8).fill(0).map((_, i) => (
              <div key={i} className="w-full h-40 rounded-12 animate-lazy"></div>
            ))}
          </div>
        ) : (
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>ColdKey</th>
                <th>Free</th>
                <th>Staked</th>
                <th>HotKey</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {coldkeys.map((coldkey) => {
                const staked = coldkey.stakeInfo?.reduce((total, item) => total + item.stake * item.alpha_price, 0);
                const uids = coldkey.stakeInfo
                  ?.flatMap((si) => si.netuid)
                  ?.reduce((acc, item) => {
                    if (!acc.includes(item)) acc.push(item);
                    return acc;
                  }, []);
                return (
                  <tr
                    key={coldkey.coldkey}
                    className={`${
                      coldkey.coldkey === selectedColdKeyId?.coldkey ? "!bg-sky-400/10" : "cursor-pointer"
                    }`}
                    onClick={() => {
                      dispatch(setSelectedColdKeyId({ coldkey: coldkey.coldkey, name: coldkey.name }));
                    }}
                  >
                    <td>
                      <ShortenText text={coldkey.name} uid="wallet-coldkey-name" />
                    </td>
                    <td>
                      <Address address={coldkey.coldkey} uid="my-wallets" />
                    </td>
                    <td>τ{coldkey.freeBalance?.toLocaleString()}</td>
                    <td>τ{staked?.toLocaleString()}</td>
                    <td>{coldkey.hotkeys.length}</td>
                    <td>
                      <div className="flex justify-center gap-16 text-orange-400">
                        <span
                          className="cursor-pointer"
                          onClick={() => {
                            setTransferModalData({
                              coldkey: coldkey.coldkey,
                              coldkeyName: coldkey.name,
                              max: coldkey.freeBalance,
                            });
                          }}
                        >
                          Transfer
                        </span>
                        <span
                          className="cursor-pointer"
                          title="Unstake"
                          onClick={() => {
                            setUnstakeModalData({
                              coldkey: coldkey.coldkey,
                              coldkeyName: coldkey.name,
                              hotkey: coldkey.hotkeys.map((hotkey) => hotkey.hotkey),
                              hotkeyName: null,
                              netuid: uids,
                              netName: null,
                              amount: staked,
                              price: null,
                            });
                          }}
                        >
                          Unstake
                        </span>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
            <tfoot>
              <tr className="text-sky-400">
                <td>Total</td>
                <td></td>
                <td>τ{coldkeys.reduce((total, item) => total + item.freeBalance, 0).toLocaleString()}</td>
                <td>τ{totalStakedBalance.toLocaleString()}</td>
                <td>{coldkeys.reduce((total, item) => total + item.hotkeys.length, 0)}</td>
              </tr>
            </tfoot>
          </table>
        )}
      </div>
      <UnstakeModal data={unstakeModalData} setData={setUnstakeModalData} />

      <TransferModal data={transferModalData} setData={setTransferModalData} />
    </>
  );
};

export default ColdKeyView;
