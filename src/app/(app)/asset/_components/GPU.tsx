import useAppSelector from "@/hooks/global/useAppSelector";
import React from "react";

const GPU = () => {
  const { oblivus } = useAppSelector((state) => state.asset);
  return (
    <div>
      <div className="mb-16 flex items-center gap-18">
        <h4>Oblivus Status</h4>
        <div className={`text-12 ${oblivus?.credit > 50 ? "text-green-400" : "text-red-400"}`}>
          {oblivus?.credit ? "$" + oblivus?.credit : ""}
        </div>
      </div>
      {!oblivus || !oblivus.list ? (
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
                <th>IP</th>
                <th>Hardware</th>
                <th>Hourly Cost</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {oblivus.list.map((item, i) => {
                return (
                  <tr key={i}>
                    <td>{item.name}</td>
                    <td>{item.resources.IPAddress}</td>
                    <td>{item.resources.flavor}</td>
                    <td>${item.billing.hourlyCost}</td>
                    <td className={item.status === "Running" ? "text-green-400" : "text-red-400"}>{item.status}</td>
                  </tr>
                );
              })}
            </tbody>
            <tfoot>
              <tr className="text-white">
                <td>{oblivus.list.length} Miners</td>
                <td></td>
                <td></td>
                <td>
                  ${oblivus.list.reduce((total, item) => total + Number(item.billing.hourlyCost), 0).toLocaleString()}
                </td>
                <td>
                  $
                  {(
                    oblivus.list.reduce((total, item) => total + Number(item.billing.hourlyCost), 0) * 24
                  ).toLocaleString()}
                </td>
              </tr>
            </tfoot>
          </table>
        </div>
      )}
    </div>
  );
};

export default GPU;
