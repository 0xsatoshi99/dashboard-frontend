import AddressWithName from "@/components/global/AddressWithName";
import axiosInstance from "@/config/axios";
import { Icon } from "@iconify/react/dist/iconify.js";
import React, { useState } from "react";
import toast from "react-hot-toast";

type Props = {
  data: any;
  setData: (value: any) => void; //eslint-disable-line
};

const UnstakeModal = ({ data, setData }: Props) => {
  const [loading, setLoading] = useState(false);
  const [password, setPassword] = useState("");

  const handleUnstake = async (e) => {
    e.preventDefault();
    if (!password) return toast.error("Please input password");
    setLoading(true);
    try {
      const result = await axiosInstance.post("/api/unstake", {
        name: data.coldkeyName,
        hotkey: data.hotkey,
        netuid: data.netuid,
        password,
      });
      if (result.data === true) {
        toast.success("Unstake Success");
        setData(null);
      } else toast.error("Unstake Failed");
    } catch (error) {
      toast.error("Unstake Failed");
    }
    setLoading(false);
  };
  return (
    <>
      {data && (
        <div className="fixed top-0 left-0 bg-black/20 w-screen h-screen flex items-center justify-center z-100 backdrop-blur-md">
          <form onSubmit={handleUnstake} className="bg-gray-900 p-24 rounded-12 w-400 flex flex-col gap-16">
            <h4 className="text-center">Unstake</h4>
            <div className="bg-gray-950 p-12 rounded-6 text-13 flex flex-col gap-12">
              <div className="flex justify-between">
                <span>Coldkey</span>
                <AddressWithName
                  name={data.coldkeyName}
                  address={data.coldkey}
                  uid={`unstake-modal-${data.hotkey}-${data.coldkey}`}
                  max={12}
                />
              </div>
              <div className="flex justify-between">
                <span>Hotkey</span>
                {data.hotkeyName === null ? (
                  <span className="text-red-400">All</span>
                ) : (
                  <AddressWithName
                    name={data.hotkeyName}
                    address={data.hotkey}
                    uid={`unstake-modal-${data.hotkey}-${data.hotkey}`}
                    max={12}
                  />
                )}
              </div>
              <div className="flex justify-between">
                <span>Subnet ID</span>
                <span>
                  {data.netName === null ? (
                    <span className="text-red-400">All</span>
                  ) : (
                    <>
                      <span className="text-green-400">{data.netuid}</span> {data.netName}
                    </>
                  )}
                </span>
              </div>
              {data.price !== null && (
                <>
                  <div className="flex justify-between">
                    <span>Alpha Amount</span>
                    <span>{data.amount.toLocaleString()}</span>
                  </div>

                  <div className="flex justify-between">
                    <span>Price</span>
                    <span>{data.price.toLocaleString()}</span>
                  </div>
                </>
              )}
              <div className="flex justify-between">
                <span>Tao Amount</span>
                <span className="text-sky-400">τ{(data.amount * (data.price || 1)).toLocaleString()}</span>
              </div>
            </div>
            <div className="flex flex-col gap-6">
              <label>Password</label>
              <input type="password" value={password} onChange={(e) => setPassword(e.target.value)}></input>
            </div>
            <div className="flex gap-6 items-center justify-end">
              <button className="flex items-center gap-4" disabled={loading} type="submit">
                {loading && <Icon icon={"line-md:loading-twotone-loop"} />} Unstake
              </button>
              <button
                disabled={loading}
                className="btn-danger"
                onClick={() => {
                  setPassword("");
                  setData(null);
                }}
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}
    </>
  );
};

export default UnstakeModal;
