"use client";
import React, { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import api from "../../libs/api";
import Sidebar from "../../components/navbar/Sidebar";
import SavedCard from "../../components/card/SavedCard";

const Saved = () => {
  const { data: session } = useSession();
  const [posts, setPosts] = useState<any>([]);

  useEffect(() => {
    const getSavedPosts = async () => {
      const response = await api.get(`/api/saved/${session?.user?.id}/posts`);
      setPosts(response.data);
      console.log(response.data);
    };
    if (session?.user?.id) getSavedPosts();
  }, [session?.user?.id]);

  return (
    <div className="sm:p-5 flex">
      <Sidebar />
      <div className="sm:p-10 pt-5 px-1">
        <h1 className="text-[#eaeaea] text-[25px]">Your Saved Collections</h1>
        <div className="grid xl:grid-cols-3 grid-cols-1 gap-5 mt-10">
          {posts.map((post: Record<string, any>) => (
            <div key={post._id} className="">
              <SavedCard post={post} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
export default Saved;
