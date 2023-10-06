"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useSearchParams } from "next/navigation";

const Comment = () => {
  const [post, setPost] = useState("");
  const searchParams = useSearchParams();
  const Id = searchParams.get("id");

  useEffect(() => {
    const getData = async () => {
      const response = await axios.get(`/api/prompt/${Id}`);
      setPost(response.data);
    };

    getData();
  }, []);

  return (
    <div className="sm:p-20 p-5 flex items-center text-center">
      <div className=" flex-1 break-inside-avoid rounded-lg border border-gray-300 bg-white/20 bg-clip-padding p-6 pb-4   md:w-[460px] w-full h-fit">
        {post.prompt}
        <div className="bg-blue-500 px-3 py-1 rounded-full text-white h-auto float-right mt-2" >
        #{post.tag}
      </div>
      </div>
    </div>
  );
};

export default Comment;
