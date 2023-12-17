"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import Image from "next/image";
import UserCard from "./UserCard";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

const Users = () => {
  const { data: session } = useSession();
  const [users, setUsers] = useState<any>([]);
  const router = useRouter();

  useEffect(() => {
    const getUsers = async () => {
      const response = await axios.get("/api/user");
      setUsers(response.data);
      console.log(response.data);
    };
    getUsers();
  }, []);

  return (
    <div className=" border-l border-[#5f5f5f] w-full  sticky top-5 min-h-[95vh] min-w-[200px] xl:block hidden">
      <h1 className="text-[25px] text-[#eaeaea] text-left px-10">Users</h1>
      <div className="flex flex-col flex-1 items-center  py-2 px-5 md:px-8 lg:p-14 ">
        <div className="w-full grid grid-cols-1 xs:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 gap-10  mt-2">
          {users.map((user: Record<string, any>) => (
            <div key={user._id} className="">
              <UserCard user={user} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Users;
