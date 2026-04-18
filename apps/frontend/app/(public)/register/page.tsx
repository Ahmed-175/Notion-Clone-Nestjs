"use client";

import AuthGoogle from "@/components/AuthGoogle";
import useToast from "@/hooks/useToast";
import { register } from "@/services/auth.service";
import Link from "next/link";
import { useEffect, useState } from "react";

const page = () => {
  const { showMgs } = useToast();
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
  });
  const handleRegister = async () => {
    if (!form.username || !form.email || !form.password) {
      showMgs({ type: "error", message: "All failds required" });
      return;
    }
    setLoading(true);
    try {
      const data = await register(form);
      localStorage.setItem("access_token", data.token);
      showMgs({ type: "success", message: "register user is success" });
    } catch (error: any) {
      console.error(error);
      showMgs({ type: "error", message: error.response.data.message });
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="w-full h-screen pt-25 pl-25 ">
      <div className="w-135 text-center ">
        <h1 className=" text-4xl font-bold mb-7">Register Page</h1>
        <div className=" text-left">
          <label htmlFor="email" className="block">
            username
          </label>
          <input
            type="text"
            placeholder="Ahmed Farag..."
            className=" border outline-0 p-3 w-full rounded-lg mb-4"
            value={form.username}
            onChange={(e) => {
              setForm({ ...form, username: e.target.value });
            }}
          />

          <label htmlFor="email" className="block">
            email
          </label>
          <input
            type="text"
            placeholder="test@gmail.com"
            className=" border outline-0 p-3 w-full rounded-lg mb-4"
            value={form.email}
            onChange={(e) => {
              setForm({ ...form, email: e.target.value });
            }}
          />
          <label htmlFor="email" className="block">
            password
          </label>
          <input
            type="text"
            placeholder="12ahtest332"
            className=" border outline-0 p-3 w-full rounded-lg mb-4"
            value={form.password}
            onChange={(e) => {
              setForm({ ...form, password: e.target.value });
            }}
          />
        </div>

        <button
          disabled={loading}
          onClick={handleRegister}
          className={`w-full p-3  hover:bg-gray-700 cursor-pointer
         rounded-lg text-white text-xl mb-6 duration-150 ${loading ? "bg-gray-700" : "bg-black"}`}
        >
          {loading ? "loading..." : "register now"}
        </button>

        <Link href={"/"} className="mt-5 text-blue-600 underline">
          I already have an account
        </Link>

        <hr className=" my-8 w-[80%] mx-auto " />

        <AuthGoogle />
      </div>
    </div>
  );
};

export default page;
