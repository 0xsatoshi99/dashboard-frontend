import useAppSelector from "@/hooks/global/useAppSelector";
import React from "react";

const Shadeform = () => {
  const { shadeform } = useAppSelector((state) => state.asset);
  return (
    <div>
      <div className="mb-16 flex items-center gap-18">
        <h4>Shadeform Status</h4>
        <div className={`text-12 ${shadeform?.balance > 50 ? "text-green-400" : "text-red-400"}`}>
          {shadeform?.balance ? "$" + shadeform?.balance : ""}
        </div>
      </div>
      {!shadeform || !shadeform.instances ? (
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
              {shadeform.instances.map((item, i) => {
                return (
                  <tr key={i}>
                    <td>{item.name}</td>
                    <td>{item.ip}</td>
                    <td>{item.shade_instance_type}</td>
                    <td>${item.hourly_price/100}</td>
                    <td className={item.status === "active" ? "text-green-400" : "text-red-400"}>{item.status}</td>
                  </tr>
                );
              })}
            </tbody>
            <tfoot>
              <tr className="text-white">
                <td>{shadeform.instances.length} Miners</td>
                <td></td>
                <td></td>
                <td>
                  $
                  {shadeform.instances
                    .reduce((total, item) => total + Number(item.hourly_price / 100), 0)
                    .toLocaleString()}
                </td>
                <td>
                  $
                  {(
                    shadeform.instances.reduce((total, item) => total + Number(item.hourly_price/100), 0) * 24
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

export default Shadeform;
