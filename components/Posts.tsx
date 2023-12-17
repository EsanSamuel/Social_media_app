"use client";
import axios from "axios";
import React, { useState, useEffect } from "react";
import Card from "./Cards";

interface Props {
  data: Record<string, any>;
}

const Cardform = ({ data }: Props) => (
  <div>
    {data.map((post: Record<string, any>) => (
      <div key={post._id}>
        <Card post={post} />
      </div>
    ))}
  </div>
);

const Posts = () => {
  const [post, setPost] = useState<any>([]);

  useEffect(() => {
    const getPosts = async () => {
      const response = await axios.get("/api/posts");
      setPost(response.data);
      console.log(response.data);
    };
    getPosts();
  }, []);

  return (
    <div className="sm:px-10 pt-10  overflow-y-auto">
      <h1 className="text-[#eaeaea] sm:text-[25px] text-[22px]">Home Feed</h1>
      <button className="bg-[#8c6dfd] text-[#eaeaea] px-3 py-2 rounded sm:mt-5 float-right ">
        Create Post
      </button>
      <div className="sm:px-10 sm:py-20 pt-5">
        <Cardform data={post} />
      </div>
    </div>
  );
};

export default Posts;