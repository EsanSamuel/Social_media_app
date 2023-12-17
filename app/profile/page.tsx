"use client";
import React, { useState, useEffect } from "react";
import Sidebar from "../../components/Sidebar";
import axios from "axios";
import { useSession } from "next-auth/react";
import Image from "next/image";
import Card from "../../components/Cards";
import Users from "../../components/Users";
import { useRouter } from "next/navigation";

const page = () => {
  const { data: session } = useSession();
  const [user, setUser] = useState<any>("");
  const [posts, setPosts] = useState<any>([]);
  const router = useRouter();

  useEffect(() => {
    const getUser = async () => {
      const response = await axios.get(`/api/user/${session?.user?.id}`);
      setUser(response.data);
      console.log(response);
    };
    if (session?.user?.id) getUser();
  }, [session?.user?.id]);

  useEffect(() => {
    const getUserPosts = async () => {
      const response = await axios.get(`/api/users/${session?.user?.id}/posts`);
      setPosts(response.data);
    };
    if (session?.user?.id) getUserPosts();
  }, [session?.user?.id]);

  const deletePosts = async (posts: any) => {
    await axios.delete(`/api/posts/${posts._id}`);
  };

  const EditProfile = () => {
    router.push(`/EditProfile?sessionId=${session?.user?.id}`);
  };

  return (
    <div className="sm:p-5 flex gap-5 w-full relative">
      <Sidebar />
      <div className="sm:p-20  w-full">
        <Image
          src={user.image}
          width={100}
          height={100}
          alt=""
          className="w-[150px] h-[150px] rounded-full"
        />
        <div className="mt-5 p-5 flex w-full justify-between">
          <div>
            <h1 className="text-[#eaeaea] text-[25px]">{user.username}</h1>
            <h1 className="text-[#eaeaea] text-[15px]">{user.email}</h1>
          </div>
          <div className="">
            <button
              className="py-2 px-4 rounded text-[#eaeaea] bg-[#8c6dfd]"
              onClick={() => EditProfile(user)}
            >
              Edit
            </button>
          </div>
        </div>
        <hr className="text-[#5f5f5f] bg-[#5f5f5f]" />

        <div className="">
          {posts.map((post: Record<string, any>) => (
            <div key={post._id}>
              <Card post={post} handleDelete={deletePosts} />
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

export default page;
