import axiosInstance from "@/config/axios";
import useAppSelector from "@/hooks/global/useAppSelector";
import { Icon } from "@iconify/react/dist/iconify.js";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import toast from "react-hot-toast";

const MENU_ITEMS = [
  { text: "My Wallets", icon: "material-symbols-light:account-balance-wallet-outline", link: "/wallets" },
  { text: "Overview", icon: "material-symbols-light:dashboard-customize-outline", link: "/overview" },
  { text: "Monitor", icon: "material-symbols-light:eye-tracking-outline-sharp", link: "/monitor" },
  { text: "My Assets", icon: "material-symbols-light:service-toolbox-outline-rounded", link: "/asset" },
  { text: "Register", icon: "material-symbols-light:editor-choice-outline-rounded", link: "/helper" },
  { text: "History", icon: "material-symbols-light:history", link: "/history" },
];

const Header = () => {
  const pathname = usePathname();
  const { taoPrice } = useAppSelector((state) => state.global);
  const restartServer = async () => {
    const response = await axiosInstance.get("/api/restart")
    if (response.status === 200) {
      toast.success("Server Restarted");
    }
    else toast.error("Failed to restart server");
  }
  return (
    <header className="w-240 fixed top-0 left-0 bg-gray-950 h-full p-24 flex flex-col">
      <h1 className="text-sky-400 text-18 font-semibold flex gap-6 items-center">
        <Icon icon={"material-symbols-light:handshake"} className="text-24" />
        TAO-APP
      </h1>
      <hr className="border-gray-400/30 mt-12 mb-24"></hr>
      <nav className="flex flex-col gap-8">
        {MENU_ITEMS.map((item, i) => (
          <React.Fragment key={i}>
            <Link
              key={item.link}
              href={item.link}
              className={`flex items-center gap-6 p-8 u-transition-color rounded-4 ${pathname.includes(item.link) ? "bg-sky-400/20 text-sky-400" : "hover:bg-gray-900"
                }`}
            >
              <Icon icon={item.icon} className="text-20" />
              {item.text}
            </Link>
          </React.Fragment>
        ))}
      </nav>
      <div className="mt-auto flex items-center gap-12 justify-between">
        <div>
          Tao Price: <span className="text-sky-400">${taoPrice} </span>
        </div>
        <div className="cursor-pointer text-24 text-red-400" onClick={restartServer}>
          <Icon icon={'material-symbols-light:settings-power'} />
        </div>
      </div>
    </header>
  );
};

export default Header;
