"use client";
import React from "react";
import Image from "next/image";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

interface Props {
  user: Record<string, any>;
  hasBorder?: boolean
}

const UserCard = ({ user, hasBorder }: Props) => {
  const { data: session } = useSession();
  const router = useRouter();

  const handleClick = () => {
    if (user._id === session?.user?.id) return router.push("/profile");

    router.push(
      `/profile/${user._id}?name=${user.username}&image=${user.image}&email=${user.email}`
    );
  };

  return (
    <div className={`flex-center flex-col items-center gap-4 space-y-4  border-[#5f5f5f] rounded-[20px]  py-2 ${hasBorder && 'border border-neutral-800 py-4 px-5 rounded'} `}>
      <div className=" flex justify-center items-center">
        {" "}
        <Image
          src={user.image}
          width={100}
          height={100}
          alt=""
          className="rounded-full w-14 h-14"
          priority
        />
      </div>
      <h1 className="text-[#eaeaea] text-[14px] text-center leading-[40px] line-clamp-1">
        {user.username}
      </h1>
      <button
        className="bg-[#8c6dfd] px-2 w-full py-2 rounded text-[#eaeaea] text-center text-[14px] mt-3 hover:opacity-50"
        onClick={handleClick}
      >
        View
      </button>
    </div>
  );
};

export default UserCard;
