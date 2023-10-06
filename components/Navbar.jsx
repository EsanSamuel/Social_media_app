"use client";
import React, { useState, useEffect } from "react";
import { signIn, signOut, useSession, getProviders } from "next-auth/react";
import Link from "next/link";
import Image from "next/image";
import { BsSun } from "react-icons/bs";
import { AiOutlineClose } from "react-icons/ai";

const Navbar = () => {
  const { data: session } = useSession();
  const [providers, setProviders] = useState();
  const [modal, setModal] = useState(false);

  useEffect(() => {
    const setUpProviders = async () => {
      const response = await getProviders();
      setProviders(response);
    };
    setUpProviders();
  }, []);

  return (
    <div>
      <nav className="flex justify-between w-full  mb-16 pt-3">
        <Link href="/" className="flex gap-2 flex-center font-bold">
          AnsNow
        </Link>

        {session?.user ? (
          <div className="flex gap-2">
            {/*<BsSun className='mt-2 text-[20px]' />*/}
            <Link
              href="/create-post"
              className=" border border-black py-1 px-4 rounded-full hover:border-none  hover:bg-blue-500 hover:text-white"
            >
              Create Post
            </Link>
            <button
              className="bg-black hover:bg-white border border-black rounded-full py-1 p-4
                text-white hover:text-black transition sm:flex hidden"
              onClick={signOut}
            >
              Sign out
            </button>
            <div>
              <div onClick={() => setModal(true)}>
                <Image
                  src={session?.user.image}
                  width={35}
                  height={35}
                  className="rounded-full"
                />
              </div>
            </div>
          </div>
        ) : (
          <>
            {providers &&
              Object.values(providers).map((provider) => (
                <button
                  type="button"
                  key={provider.name}
                  onClick={() => {
                    signIn(provider.id);
                  }}
                  className="bg-black hover:bg-white border border-black rounded-full py-1 p-4
                text-white hover:text-black transition "
                >
                  Sign in
                </button>
              ))}
          </>
        )}
      </nav>
      {modal && (
        <div className=" sm:hidden flex-1 break-inside-avoid rounded-lg border border-gray-300 bg-white/20 bg-clip-padding p-6 pb-4   md:w-[460px] w-full h-fit">
          <div className="flex flex-col gap-5">
            <AiOutlineClose className="float-right text-right text-[20px]" onClick={() => setModal(false)} />
            <Link
              href="/Profile"
              className=' text-center className="bg-black hover:bg-white border border-black rounded-full py-1 p-4
                text-black hover:text-black transition'
            >
              Profile
            </Link>
            <button
              className="bg-black hover:bg-white border border-black rounded-full py-1 p-4
                text-white hover:text-black transition"
              onClick={signOut}
            >
              Sign out
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Navbar;
