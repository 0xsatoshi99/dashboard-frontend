import useAppSelector from "@/hooks/global/useAppSelector";
import React from "react";

const DataCrunch = () => {
  const { datacrunch } = useAppSelector((state) => state.asset);
  return (
    <div>
      <div className="mb-16 flex items-center gap-18">
        <h4>DataCrunch Status</h4>
        <div className={`text-12 ${datacrunch?.balance > 50 ? "text-green-400" : "text-red-400"}`}>
          {datacrunch?.balance ? "$" + datacrunch?.balance : ""}
        </div>
      </div>
      {!datacrunch || !datacrunch.instances ? (
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
              {datacrunch.instances.map((item, i) => {
                return (
                  <tr key={i}>
                    <td>{item.hostname}</td>
                    <td>{item.ip}</td>
                    <td>{item.instance_type}</td>
                    <td>${item.price_per_hour}</td>
                    <td className={item.status === "running" ? "text-green-400" : "text-red-400"}>{item.status}</td>
                  </tr>
                );
              })}
            </tbody>
            <tfoot>
              <tr className="text-white">
                <td>{datacrunch.instances.length} Miners</td>
                <td></td>
                <td></td>
                <td>
                  $
                  {datacrunch.instances
                    .reduce((total, item) => total + Number(item.price_per_hour), 0)
                    .toLocaleString()}
                </td>
                <td>
                  $
                  {(
                    datacrunch.instances.reduce((total, item) => total + Number(item.price_per_hour), 0) * 24
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

export default DataCrunch;
