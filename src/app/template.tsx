"use client";
import React, { PropsWithChildren } from "react";
import { Provider } from "react-redux";
import { Toaster } from "react-hot-toast";
import Modal from "react-modal";

import { store } from "@/store";

const RootTemplate = ({ children }: PropsWithChildren) => {
  Modal.setAppElement("body");

  return (
    <>
      <Provider store={store}>
        <Toaster
          toastOptions={{
            position: "top-right",
            className: "!text-gray-400 !bg-gray-800/90 !text-14",
            duration: 3000,
          }}
        />
        {children}
      </Provider>
    </>
  );
};

export default RootTemplate;
