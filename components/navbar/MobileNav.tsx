"use client";
import React, { useState, useEffect } from "react";
import { SiGoogleadmob } from "react-icons/si";
import { HiMenuAlt4, HiOutlineMenuAlt3, HiOutlineSave } from "react-icons/hi";
import { getProviders, signIn, signOut, useSession } from "next-auth/react";
import Image from "next/image";
import api from '../../libs/api'
import { RiHomeLine } from "react-icons/ri";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { CiUser } from "react-icons/ci";
import { IoCreateOutline } from "react-icons/io5";
import { FiLogIn, FiLogOut } from "react-icons/fi";
import { AiOutlineClose } from "react-icons/ai";

type Provider = {
  id: string;
  name: string;
  type: string;
  signinUrl: string;
  callbackUrl: string;
  signinUrlParams?: Record<string, string> | undefined;
};

type Providers = Record<string, Provider>;

const MobileNav = () => {
  const { data: session } = useSession();
  const [user, setUser] = useState<any>("");
  const [modal, setModal] = useState(false)
  const pathName = usePathname()
  const [provider, setProvider] = useState<Providers | null>(null);


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
    <div className='fixed w-full bg-[#13131a] mb-[20%]'>
      <div className="md:hidden pt-5 flex justify-between w-full pb-5 px-1">
        <h1 className="flex gap-2 text-[25px] text-[#eaeaea]">
          <SiGoogleadmob className="mt-1" />
          Snapgram
        </h1>

        <div className="flex gap-4">
          {session?.user && (
            <div className="">
              {user.image ? (
                <Image
                  src={user.image}
                  width={100}
                  height={100}
                  alt=""
                  className="w-[30px] h-[30px] rounded-full"
                />
              ) : (
                <div className='min-w-[30px] min-h-[30px] rounded-full bg-[#1c1c24]'></div>
              )}
            </div>
          )}
          {!modal ? <HiOutlineMenuAlt3 className="text-[25px] text-[#eaeaea]" onClick={() => setModal(true)} /> :
            <AiOutlineClose className="text-[25px] text-[#eaeaea]" onClick={() => setModal(false)} />
          }
        </div>
      </div>

      {modal && (
        <div className="text-[#eaeaea] h-[120vh] bg-[#1c1c24] p-5 flex flex-col gap-5 w-auto pr-7 border-r fixed top-0 border-[#5f5f5f] animate-slide-in">
          {/*<h1 className="flex gap-2 text-[25px]">
            <SiGoogleadmob className="mt-1" />
            Snapgram
            </h1>*/}
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
                  <div className='min-w-[43px] min-h-[43px] rounded-full border border-neutral-800'></div>
                )}
                <div className="flex flex-col">
                  <h1 className="text-[20px] leading-[40px] line-clamp-1 ">{user.username}</h1>
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
                <Link href="savedposts">
                  <li className="py-3 pl-5  bg-[#8c6dfd] rounded cursor-pointer flex gap-2">
                    <HiOutlineSave className="text-[20px]" />
                    Saved
                  </li>
                </Link>
              ) : (
                <Link href="savedposts">
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
      )
      }
    </div>
  );
};

export default MobileNav;
