"use client";
import CustomAddressSelect from "@/components/global/CustomAddressSelect";
import axiosInstance from "@/config/axios";
import useAppSelector from "@/hooks/global/useAppSelector";
import { Icon } from "@iconify/react/dist/iconify.js";
import React, { useEffect, useState } from "react";
import { CopyToClipboard } from "react-copy-to-clipboard";
import toast from "react-hot-toast";

const Helper = () => {
  const coldkeys = useAppSelector((state) => state.global.coldkeys);
  const [uid, setUid] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [password, setPassword] = useState("");
  const [coldkey, setColdkey] = useState(coldkeys[0]);
  const [hotkey, setHotkey] = useState(null);

  useEffect(() => {
    setColdkey(coldkeys[0]);
    return () => {};
  }, [coldkeys]);

  useEffect(() => {
    setHotkey(coldkey?.hotkeys[0]);
    return () => {};
  }, [coldkey]);

  const handleRegister = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const result = await axiosInstance.post("/api/register", {
        uid,
        hotkey: hotkey.name,
        coldkey: coldkey.name,
        password,
      });
      if (result.data === true) {
        toast.success("Register Success");
      } else toast.error("Register Failed");
    } catch (error) {
      toast.error("Register Failed");
    }
    setIsLoading(false);
  };

  return (
    <div className="flex flex-col gap-32">
      <div>
        <h4>Register</h4>
        <div className="w-1000 flex mt-24 flex-col gap-16">
          <div className="flex gap-12 items-start">
            <div className="flex flex-col gap-4 w-full">
              <label>Subnet ID</label>
              <input
                value={uid}
                onChange={(e) => {
                  if (!e.target.validity.valid) {
                    return;
                  }
                  setUid(e.target.value);
                }}
                pattern="^([0-9]{1,3})$"
                inputMode="decimal"
              />
            </div>
            <div className="flex flex-col gap-4 w-full">
              <label>Coldkey</label>
              <CustomAddressSelect value={coldkey} onChange={(e) => setColdkey(e)} data={coldkeys} />
            </div>
            <div className="flex flex-col gap-4 w-full">
              <label>Hotkey</label>
              <CustomAddressSelect
                value={hotkey}
                onChange={(e) => setHotkey(e)}
                data={coldkey?.hotkeys.map((i) => ({ ...i, address: i.hotkey })) || []}
              />
            </div>
          </div>
          <div className="bg-gray-950 p-16 rounded-8 text-14 flex items-center justify-between">
            {Number(uid) > 0 ? (
              <>
                <span>
                  <span className="text-green-400">Command: </span>
                  {`btcli subnet register --netuid ${uid} --wallet.name ${coldkey?.name} --wallet.hotkey ${hotkey?.name}`}
                </span>
                <div className="text-16 cursor-pointer">
                  <CopyToClipboard
                    text={`btcli subnet register --netuid ${uid} --wallet.name ${coldkey?.name} --wallet.hotkey ${hotkey?.name}`}
                    onCopy={() => {
                      toast.success("Copied command.");
                    }}
                  >
                    <Icon icon="material-symbols-light:file-copy-outline-sharp" />
                  </CopyToClipboard>
                </div>
              </>
            ) : (
              <span>
                <span className="text-red-400">Error: </span>Invalid UID, please input valid subnet UID
              </span>
            )}
          </div>
          <form onSubmit={handleRegister} className="flex items-center gap-12">
            <input
              value={password}
              placeholder="Password..."
              type="password"
              className="w-300"
              onChange={(e) => setPassword(e.target.value)}
            />
            <button disabled={isLoading || Number(uid) === 0} type="submit" className="flex items-center gap-4">
              Register {isLoading && <Icon icon={"line-md:loading-twotone-loop"} />}
            </button>

            <span className="text-sky-400 ml-auto">Free Balance: τ{coldkey?.freeBalance?.toLocaleString()}</span>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Helper;
