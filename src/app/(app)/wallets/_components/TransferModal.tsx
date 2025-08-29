import AddressWithName from "@/components/global/AddressWithName";
import axiosInstance from "@/config/axios";
import { Icon } from "@iconify/react/dist/iconify.js";
import React, { useState } from "react";
import toast from "react-hot-toast";

type Props = {
  data: any;
  setData: (value: any) => void; //eslint-disable-line
};

const TransferModal = ({ data, setData }: Props) => {
  const [loading, setLoading] = useState(false);
  const [destination, setDestination] = useState("");
  const [amount, setAmount] = useState("");
  const [password, setPassword] = useState("");

  const handleTransfer = async (e) => {
    e.preventDefault();
    if (!destination) return toast.error("Please input destination");
    if (!amount || !Number(amount) || Number(amount) > data.max - 0.001)
      return toast.error("Please input correct amount");
    if (!password) return toast.error("Please input password");
    setLoading(true);
    try {
      const result = await axiosInstance.post("/api/transfer", {
        name: data.coldkeyName,
        destination,
        amount: Number(amount),
        password,
      });
      if (result.data === true) {
        toast.success("Transfer Success");
        setData(null);
      } else toast.error("Transfer Failed");
    } catch (error) {
      toast.error("Transfer Failed");
    }
    setLoading(false);
  };
  return (
    <>
      {data && (
        <div className="fixed top-0 left-0 bg-black/20 w-screen h-screen flex items-center justify-center z-100 backdrop-blur-md">
          <form onSubmit={handleTransfer} className="bg-gray-900 p-24 rounded-12 w-400 flex flex-col gap-16">
            <h4 className="text-center">Transfer</h4>
            <div className="bg-gray-950 p-12 rounded-6 text-13 flex flex-col gap-12">
              <div className="flex justify-between">
                <span>Coldkey</span>
                <AddressWithName
                  name={data.coldkeyName}
                  address={data.coldkey}
                  uid={`transfer-modal-${data.coldkey}`}
                  max={12}
                />
              </div>
              <div className="flex justify-between">
                <span>Balance</span>τ{data.max}
              </div>
            </div>
            <div className="flex flex-col gap-6">
              <label>Destination</label>
              <input value={destination} onChange={(e) => setDestination(e.target.value)}></input>
            </div>
            <div className="flex flex-col gap-6">
              <div className="flex justify-between items-center">
                <label>Amount</label>
                <span
                  className="text-13 cursor-pointer text-orange-400 italic"
                  onClick={() => {
                    setAmount((data.max - 0.001).toString());
                  }}
                >
                  Max
                </span>
              </div>

              <input
                value={amount}
                onChange={(e) => {
                  if (!e.target.validity.valid) {
                    return;
                  }
                  setAmount(e.target.value);
                }}
                pattern="^([0-9]+(?:[.][0-9]*)?)$"
                inputMode="decimal"
              ></input>
            </div>

            <div className="flex flex-col gap-6">
              <label>Password</label>
              <input type="password" value={password} onChange={(e) => setPassword(e.target.value)}></input>
            </div>
            <div className="flex gap-6 items-center justify-end">
              <button className="flex items-center gap-4" disabled={loading} type="submit">
                {loading && <Icon icon={"line-md:loading-twotone-loop"} />} Transfer
              </button>
              <button
                disabled={loading}
                className="btn-danger"
                onClick={() => {
                  setAmount("");
                  setDestination("");
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

export default TransferModal;
