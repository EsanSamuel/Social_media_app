"use client";
import Form from "../../components/Forms";
import Sidebar from "../../components/nav/Sidebar";
import axios from "axios";
import React, { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { redirect, useRouter } from "next/navigation";

const page = () => {
  const { data: session } = useSession();
  const [post, setPost] = useState("");
  const [image, setImage] = useState("");
  const router = useRouter();

  if (!session?.user) redirect('/')

  const createPost = async () => {
    try {
      const response = await axios.post("/api/posts/newPosts", {
        userId: session?.user?.id,
        post,
        image,
      });
      console.log(response);
      router.push("/");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="sm:p-5 flex gap-5 w-full">
      <Sidebar />
      <div className="py-10 w-full">
        <Form
          post={post}
          setPost={setPost}
          image={image}
          setImage={setImage}
          createPost={createPost}
        />
      </div>
    </div>
  );
};

export default page;
