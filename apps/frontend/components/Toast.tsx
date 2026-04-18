"use client";

import { toastContext } from "@/context/toastContext";
import { useContext } from "react";
import { FaCheckCircle } from "react-icons/fa";
import { MdErrorOutline } from "react-icons/md";

const Toast = () => {
  const context = useContext(toastContext);

  if (!context?.toast) {
    return;
  }
  return (
    <div
      className={`absolute top-15 right-15 z-50 p-2 px-4 flex justify-center items-center text-white  rounded-lg 
        ${context.toast.type == "success" ? " bg-green-600" : "bg-red-600"}  `}
    >
      {context.toast.type == "error" ? (
        <MdErrorOutline className="text-2xl mr-2" />
      ) : (
        <FaCheckCircle className="text-2xl mr-2" />
      )}
      {context.toast.message}
    </div>
  );
};

export default Toast;
