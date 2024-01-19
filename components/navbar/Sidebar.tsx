"use client";
import React, { useState, useEffect } from "react";
import { SiGoogleadmob } from "react-icons/si";
import { useSession } from "next-auth/react";
import api from '../../libs/api'
import Image from "next/image";
import { signIn, getProviders, signOut } from "next-auth/react";
import { RiHomeLine } from "react-icons/ri";
import { CiUser } from "react-icons/ci";
import { HiOutlineSave } from "react-icons/hi";
import { FiLogOut, FiLogIn } from "react-icons/fi";
import { IoCreateOutline } from "react-icons/io5";
import Link from "next/link";
import { usePathname } from "next/navigation";

type Provider = {
  id: string;
  name: string;
  type: string;
  signinUrl: string;
  callbackUrl: string;
  signinUrlParams?: Record<string, string> | undefined;
};

type Providers = Record<string, Provider>;

const Sidebar = () => {
  const { data: session } = useSession();
  const [user, setUser] = useState<any>("");
  const [provider, setProvider] = useState<Providers | null>(null);
  const pathName = usePathname();

  useEffect(() => {
    const getUser = async () => {
      const response = await api.get(`/api/user/${session?.user?.id}`);
      setUser(response.data);
      console.log(response);
    };
    if (session?.user?.id) getUser();
  }, [session?.user?.id]);

  useEffect(() => {
    const setUpProvider = async () => {
      const response = await getProviders();
      setProvider(response);
    };
    setUpProvider();
  }, []);

  return (
    <div className="text-[#eaeaea] h-[95vh] md:flex hidden flex flex-col gap-5 w-auto pr-7 border-r sticky top-5 border-neutral-800">
      <h1 className="flex gap-2 text-[25px]">
        <SiGoogleadmob className="mt-1" />
        Snapgram
      </h1>
      {session?.user && (
        <Link href='/profile'>
          <div className="mt-10 flex gap-2">
            {user.image ? (
              <Image
                src={user.image}
                width={100}
                height={100}
                alt=""
                className="w-[43px] h-[43px] rounded-full"
                priority
              />
            ) : (
              <div className='min-w-[43px] min-h-[43px] rounded-full bg-[#1c1c24]'></div>
            )}
            <div className="flex flex-col">
              <h1 className="text-[20px] leading-[40px] line-clamp-1">{user.username}</h1>
              <br />
              <p className="text-[12px] text-[#5f5f5f] mt-[-25px]">
                {/*{user.email}*/}
              </p>
            </div>
          </div>
        </Link>
      )}

      <div className="flex gap-10 flex-col mt-10 w-full">
        <ul className="flex gap-5 flex-col">
          {pathName === "/" ? (
            <li className="py-3 pl-5  bg-[#8c6dfd] rounded cursor-pointer flex gap-2">
              <RiHomeLine className="text-[20px]" /> Home
            </li>
          ) : (
            <Link href="/">
              <li className="py-3 pl-5  hover:bg-[#8c6dfd] rounded cursor-pointer flex gap-2">
                <RiHomeLine className="text-[20px]" /> Home
              </li>
            </Link>
          )}
          {pathName === "/users" ? (
            <Link href="/users">
              <li className="py-3 pl-5 bg-[#8c6dfd] rounded cursor-pointer flex gap-2">
                <CiUser className="text-[20px]" />
                Users
              </li>
            </Link>
          ) : (
            <Link href="/users">
              <li className="py-3 pl-5  hover:bg-[#8c6dfd] rounded cursor-pointer flex gap-2">
                <CiUser className="text-[20px]" />
                Users
              </li>
            </Link>
          )}
          {pathName === "/savedposts" ? (
            <Link href="/savedposts">
              <li className="py-3 pl-5  bg-[#8c6dfd] rounded cursor-pointer flex gap-2">
                <HiOutlineSave className="text-[20px]" />
                Saved
              </li>
            </Link>
          ) : (
            <Link href="/savedposts">
              <li className="py-3 pl-5  hover:bg-[#8c6dfd] rounded cursor-pointer flex gap-2">
                <HiOutlineSave className="text-[20px]" />
                Saved
              </li>
            </Link>
          )}
          {pathName === "/create-post" ? (
            <Link href="/create-post">
              <li className="py-3 pl-5 bg-[#8c6dfd] rounded cursor-pointer flex gap-2">
                <IoCreateOutline className="text-[20px]" />
                Create Post
              </li>
            </Link>
          ) : (
            <Link href="/create-post">
              <li className="py-3 pl-5 hover:bg-[#8c6dfd] rounded cursor-pointer flex gap-2">
                <IoCreateOutline className="text-[20px]" />
                Create Post
              </li>
            </Link>
          )}

          {session?.user ? (
            <div></div>
          ) : (
            <div>
              {provider &&
                Object.values(provider).map((provider: Provider) => (
                  <button
                    className=" hover:bg-[#8c6dfd] text-[#eaeaea] py-3 pl-5 w-full rounded flex gap-3"
                    key={provider.name}
                    onClick={() => signIn(provider.id)}
                  >
                    <FiLogIn className="text-[20px]" /> Sign In
                  </button>
                ))}
            </div>
          )}

          <li
            className="py-3 pl-5 hover:bg-[#8c6dfd] pr-20 rounded cursor-pointer flex gap-2 bottom-5 fixed"
            onClick={() => signOut()}
          >
            <FiLogOut className="text-[20px]" />
            Logout
          </li>
        </ul>
      </div>
    </div>

  );
};

export default Sidebar;
