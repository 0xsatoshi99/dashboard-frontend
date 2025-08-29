import useAppSelector from "@/hooks/global/useAppSelector";
import React from "react";

const OpenAI = () => {
  const { openai } = useAppSelector((state) => state.asset);
  return (
    <div>
      <h4 className="mb-16">OpenAI Api Key</h4>
      {!openai || !openai.length ? (
        <div className="flex flex-col gap-12">
          {new Array(4).fill(0).map((_, i) => (
            <div key={i} className="w-full h-40 rounded-12 animate-lazy"></div>
          ))}
        </div>
      ) : (
        <div className="w-full">
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Available</th>
                <th>Used</th>
                <th>Total</th>
              </tr>
            </thead>
            <tbody>
              {openai.map((item, i) => {
                return (
                  <tr key={i}>
                    <td className="text-sky-400">{item.name}</td>
                    <td className={item.total_available < 5 ? "text-red-400" : "text-green-400"}>
                      ${item.total_available.toLocaleString()}
                    </td>
                    <td>${item.total_used.toLocaleString()}</td>
                    <td>${item.total_granted.toLocaleString()}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default OpenAI;
