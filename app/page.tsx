import MobileNav from "../components/MobileNav";
import Posts from "../components/Posts";
import Sidebar from "../components/Sidebar";
import SignInForm from "../components/SignInForm";
import Users from "../components/Users";
import React from "react";

const page = () => {
  return (
    <div className="sm:p-5 flex gap-5 flex-row relative">
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
  );
};

export default page;
