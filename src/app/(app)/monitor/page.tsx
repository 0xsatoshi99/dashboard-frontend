"use client";
import Address from "@/components/global/Address";
import axiosInstance from "@/config/axios";
import React, { useEffect, useMemo, useState } from "react";
import toast from "react-hot-toast";

const Monitor = () => {
    const [monitorData, setMonitorData] = useState([]);
    const [sort, setSort] = useState("uid");
    const sortedData = useMemo(
        () =>
            monitorData.sort((a, b) => {
                if (sort === "reward") {
                    const reward_a = a.neurons.reduce((acc, team) => acc + team.reward * a.price, 0);
                    const reward_b = b.neurons.reduce((acc, team) => acc + team.reward * b.price, 0);
                    return reward_b - reward_a;
                }

                return a.netuid - b.netuid;
            }),
        [monitorData, sort]
    );

    const getMonitorData = async () => {
        try {
            const response = await axiosInstance.get("/api/monitor");
            const result = response.data;
            setMonitorData(result);
        } catch (error) {
            toast.error("Error getting monitor data");
        }
    };


    useEffect(() => {
        getMonitorData();
        return () => { };
    }, []);

    return (
        <div className="py-16">
            {!monitorData || !monitorData.length ? (
                <div className="flex flex-col gap-12">
                    {new Array(8).fill(0).map((_, i) => (
                        <div key={i} className="w-full h-40 rounded-12 animate-lazy"></div>
                    ))}
                </div>
            ) : (
                <table>
                    <thead>
                        <tr className='text-11'>
                            <th onClick={() => setSort("uid")} className={sort === "uid" ? "!text-white w-20" : "cursor-pointer w-20"}>
                                UID
                            </th>
                            <th className="w-40">Name</th>
                            <th onClick={() => setSort("reward")} className={sort === "reward" ? "!text-white w-100 text-center" : "cursor-pointer w-100 text-center"}>
                                Total
                            </th>
                            {monitorData[0]?.neurons.map((team) => {
                                return <th className='w-100 text-center' key={team?.name}>{team?.name}</th>
                            })}
                        </tr>
                    </thead>
                    <tbody>
                        {sortedData?.map((subnet) => {
                            const total_miners = subnet.neurons.reduce((acc, team) => acc + team.miners, 0);
                            const total_reward = subnet.neurons.reduce((acc, team) => acc + team.reward, 0);
                            return (
                                <tr key={`${subnet.netuid}-${subnet.subnet_name}`} className='text-11'>
                                    <td>{subnet.netuid}</td>
                                    <td>
                                        <Address uid={`address-overview-${subnet.subnet_name}`} address={subnet.subnet_name} />
                                    </td>
                                    <td className="text-center">
                                        <div className={total_miners > 0 ? "text-red-400" : ""}>{total_miners}</div>
                                        <div className={total_reward > 0 ? "text-red-400" : ""}>τ {(total_reward * subnet.price).toLocaleString()}</div>
                                    </td>
                                    {subnet.neurons.map((team) => {
                                        return <td className="text-center" key={`${subnet.netuid}-${team?.name}`}>
                                            <div className={team?.miners > 0 ? "text-red-400" : ""}>{team?.miners}</div>
                                            <div className={team?.reward > 0 ? "text-red-400" : ""}>τ {(team?.reward * subnet.price).toLocaleString()}</div>
                                        </td>
                                    })}

                                </tr>
                            );
                        })}
                    </tbody>
                    <tfoot>
                        <tr className='text-11'>
                            <td>Total</td>
                            <td>128 SN</td>
                            <td className="text-center">
                                <div className="text-green-400">{monitorData.reduce((acc, subnet) => acc + subnet.neurons.reduce((acc, team) => acc + team.miners, 0), 0)}</div>
                                <div className="text-green-400">τ {(monitorData.reduce((acc, subnet) => acc + subnet.neurons.reduce((acc, team) => acc + team.reward * subnet.price, 0), 0)).toLocaleString()}</div>
                            </td>
                            {monitorData[0]?.neurons.map((team) => {
                                const index = monitorData[0]?.neurons.findIndex((t) => t.name === team.name);
                                const total_team_miners = monitorData.reduce((acc, subnet) => acc + subnet.neurons[index].miners, 0);
                                const total_team_reward = monitorData.reduce((acc, subnet) => acc + subnet.neurons[index].reward * subnet.price, 0);
                                return <td className='text-center' key={`${team?.name}-footer`}>
                                    <div className={"text-red-400"}>{total_team_miners}</div>
                                    <div className={"text-red-400"}>τ {(total_team_reward).toLocaleString()}</div>
                                </td>
                            })}

                        </tr>
                    </tfoot>
                </table>
            )}
        </div>
    );
};

export default Monitor;
