"use client";
import React, { useState, useEffect } from "react";
import UserCard from "../card/UserCard";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import useUsers from "../../hooks/useUsers";

const Users = () => {
  const { data: session } = useSession();
  const [searchUser, setSearchUser] = useState('')
  const { data: users = [], isLoading } = useUsers();

  if (isLoading) {
    return (
      <div>
        <h1 className='text-[#eaeaea] mt-20 sm:flex hidden'>Loading..</h1>
      </div>
    )
  }

  return (
    <div className=" border-l border-[#5f5f5f] w-full  sticky top-5 min-h-[95vh] min-w-[200px] xl:block hidden overflow-y-auto">
      <h1 className="text-[25px] text-[#eaeaea] text-left px-5">Users</h1>
      <div className='px-5 pt-5'> <input className='w-full bg-[#1c1c24] text-[#eaeaea] py-2 px-4 rounded outline-none' placeholder='Search user...'
        onChange={(e) => setSearchUser(e.target.value)}
      /></div>
      <div className="flex flex-col flex-1 items-center  py-2 px-5 md:px-8 lg:p-10 ">
        <div className="w-full grid grid-cols-1 xs:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 gap-10  mt-2">
          {users.filter((user: Record<string, any>) => {
            if (searchUser === '') {
              return user
            } else if
              (user.username.toLowerCase().includes(searchUser.toLowerCase())) {
              return user
            }
          }).map((user: Record<string, any>) => (
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
