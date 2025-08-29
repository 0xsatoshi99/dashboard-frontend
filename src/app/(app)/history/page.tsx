"use client";
import AddressWithName from "@/components/global/AddressWithName";
import TimeStamp from "@/components/global/TimeStamp";
import axiosInstance from "@/config/axios";
import useAppDispatch from "@/hooks/global/useAppDispatch";
import useAppSelector from "@/hooks/global/useAppSelector";
import { setHistory } from "@/store/slices/global.slice";
import React, { useEffect } from "react";

const NEYMAR_CEX = "5GKMPaXsvBtnGtGr9ELBAqpCpAe2VbSJ2YftJXk2zZoQ66cc";
const History = () => {
  const dispatch = useAppDispatch();
  const { history, coldkeys } = useAppSelector((state) => state.global);
  const handleGetHistory = async () => {
    try {
      const result = await axiosInstance.get("/api/history");
      dispatch(setHistory(result.data));
    } catch (error) {}
  };

  useEffect(() => {
    try {
      handleGetHistory();
    } catch (error) {
      console.log("Error fetching metagraphs data");
    }
    return () => {};
  }, []); //eslint-disable-line

  return (
    <div className="pb-32">
      {!history || !history.length ? (
        <div className="flex flex-col gap-12">
          {new Array(8).fill(0).map((_, i) => (
            <div key={i} className="w-full h-40 rounded-12 animate-lazy"></div>
          ))}
        </div>
      ) : (
        <table>
          <thead>
            <tr>
              <th>#</th>
              <th>From</th>
              <th>To</th>
              <th>Amount</th>
              <th>Time</th>
            </tr>
          </thead>
          <tbody>
            {history.map((item, i) => {
              const fromName = coldkeys.find((k) => k.coldkey === item.from)?.name || "Unknown";
              const toName =
                NEYMAR_CEX === item.to ? "CEX" : coldkeys.find((k) => k.coldkey === item.to)?.name || "Unknown";
              return (
                <tr key={i} className="text-13">
                  <td>{i + 1}</td>
                  <td>
                    <AddressWithName address={item.from} name={fromName} uid={`from-${i}`} />
                  </td>
                  <td>
                    <AddressWithName address={item.to} name={toName} uid={`to-${i}`} />
                  </td>
                  <td>{item.amount}</td>
                  <td>
                    <TimeStamp timestamp={item.timestamp} hint={`stamp-${i}`} />{" "}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default History;
