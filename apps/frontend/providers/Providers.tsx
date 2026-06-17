"use client"
import Toast from "@/components/Toast";
import { ToastProvider } from "@/context/toastContext";
import { UserProvider } from "@/context/userContext";
import MenuProvider from "@/features/menu/context/menuContext";
import React from "react";
import ReactQueryProvider from "./react-query.provider";

const Providers = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <ReactQueryProvider>
        <ToastProvider>
          <UserProvider>
            <Toast />
            <MenuProvider>{children}</MenuProvider>
          </UserProvider>
        </ToastProvider>
      </ReactQueryProvider>
    </>
  );
};

export default Providers;
