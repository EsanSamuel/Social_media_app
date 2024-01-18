"use client";
import React, { useState, useEffect } from "react";
import Sidebar from "../../../components/navbar/Sidebar";
import api from '../../../libs/api'
import { useSession } from "next-auth/react";
import Image from "next/image";
import Card from "../../../components/card/Cards";
import Users from "../../../components/user/Users";
import { useSearchParams } from "next/navigation";

interface Params {
  id: string;
}

const Profile = ({ params }: { params: Params }) => {
  const { data: session } = useSession();
  const [posts, setPosts] = useState<any>([]);
  const searchParams = useSearchParams();
  const username = searchParams.get("name");
  const userimage = searchParams.get("image");
  const useremail = searchParams.get("email");

  useEffect(() => {
    const getUserPosts = async () => {
      const response = await api.get(`/api/users/${params?.id}/posts`);
      setPosts(response.data);
    };
    if (params?.id) getUserPosts();
  }, [params?.id]);

  return (
    <div className="sm:p-5 sm:flex gap-5 w-full relative">
      <Sidebar />
      <div className="sm:p-20 p-5 w-full">
        <Image
          src={userimage!}
          width={100}
          height={100}
          alt=""
          className="sm:w-[150px] sm:h-[150px] w-[100px] h-[100px] rounded-full sm:mt-0 mt-10"
        />
        <div className="mt-5  text-[25px]">
          <h1 className="text-[#eaeaea]">{username}</h1>
          <h1 className="text-[#eaeaea] text-[15px] pb-2">{useremail}</h1>
        </div>
        <hr />

        <div className="">

          {posts.map((post: Record<string, any>) => (
            <div key={post._id}>
              <Card post={post} />
            </div>
          ))}
        </div>
      </div>

      <div className="">
        <Users />
      </div>
    </div>
  );
};

export default Profile
