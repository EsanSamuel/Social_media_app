"use client";
import React, { useState, useEffect } from "react";
import { SiGoogleadmob } from "react-icons/si";
import { HiMenuAlt4, HiOutlineMenuAlt3 } from "react-icons/hi";
import { useSession } from "next-auth/react";
import Image from "next/image";
import axios from "axios";

const MobileNav = () => {
  const { data: session } = useSession();
  const [user, setUser] = useState<any>("");

  useEffect(() => {
    const getUser = async () => {
      const response = await axios.get(`/api/user/${session?.user?.id}`);
      setUser(response.data);
      console.log(response);
    };
    if (session?.user?.id) getUser();
  }, [session?.user?.id]);
  return (
    <div className="sm:hidden pt-5 flex justify-between w-full">
      <h1 className="flex gap-2 text-[25px] text-[#eaeaea]">
        <SiGoogleadmob className="mt-1" />
        Snapgram
      </h1>

      <div className="flex gap-4">
        {session?.user && (
          <div className="">
            <Image
              src={user.image}
              width={100}
              height={100}
              alt=""
              className="w-[30px] h-[30px] rounded-full"
            />
          </div>
        )}
        <HiOutlineMenuAlt3 className="text-[25px] text-[#eaeaea]" />
      </div>
    </div>
  );
};

export default MobileNav;
