"use client"
import MobileNav from "../components/nav/MobileNav";
import Posts from "../components/Posts";
import Sidebar from "../components/nav/Sidebar";
import Users from "../components/user/Users";
import React, { useContext } from "react";
import { IValue, ToastContext } from "../context/ToastProvider";
import { ToastSuccess } from "../components/toast";

const page = () => {
  const { toastMsg } = useContext(ToastContext) as IValue
  return (
    <div className='w-full'>
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
      <div className='flex items-center justify-center'>
        {toastMsg ? <ToastSuccess msg={toastMsg} /> : null}
      </div>
    </div>
  );
};

export default page;
