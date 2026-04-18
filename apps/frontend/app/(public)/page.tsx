"use client";

import AuthGoogle from "@/components/AuthGoogle";
import useToast from "@/hooks/useToast";
import { login } from "@/services/auth.service";
import Link from "next/link";
import { useState } from "react";

const page = () => {
  const { showMgs } = useToast();
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    email: "",
    password: "",
  });
  const handleLogin = async () => {
    if (!form.email || !form.password) {
      showMgs({ type: "error", message: "All failds required" });
      return;
    }
    setLoading(true);
    try {
      const data = await login(form);
      localStorage.setItem("access_token", data.token);
      showMgs({ type: "success", message: "login user is success" });
    } catch (error: any) {
      showMgs({ type: "error", message: error.response.data.message });
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="w-full h-screen pt-25 pl-25 ">
      <div className="w-135 text-center ">
        <h1 className=" text-4xl font-bold mb-7">Login Page</h1>
        <div className=" text-left">
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
          onClick={handleLogin}
          className={`w-full p-3  hover:bg-gray-700 cursor-pointer
         rounded-lg text-white text-xl mb-6 duration-150 ${loading ? "bg-gray-700" : "bg-black"}`}
        >
          {loading ? "loading..." : "login now"}
        </button>

        <Link href={"/register"} className="mt-5 text-blue-600 underline">
          Don't have an account? Sign up
        </Link>

        <hr className=" my-8 w-[80%] mx-auto " />

        <AuthGoogle />
      </div>
    </div>
  );
};

export default page;
