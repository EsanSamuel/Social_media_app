"use client"
import MobileNav from "../components/MobileNav";
import Posts from "../components/Posts";
import Sidebar from "../components/Sidebar";
import Users from "../components/Users";
import React, { useContext } from "react";
import { ToastContext } from "../context/ToastProvider";
import { ToastSuccess } from "../components/toast";

const page = () => {
  const { toastMsg } = useContext(ToastContext)
  return (
    <>
      <div className="sm:p-5 sm:flex gap-5 flex-row relative">
        <div className="w-auto">
          <Sidebar />
        </div>
        <div className="w-full">
          <MobileNav />
          <Posts />
        </div>
        <div className="">
          <Users />
        </div>
      </div>
      <div>
        {toastMsg ? <ToastSuccess msg={toastMsg} /> : null}
      </div>
    </>
  );
};

export default page;
