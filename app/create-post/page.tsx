"use client";
import Form from "../../components/Forms";
import Sidebar from "../../components/nav/Sidebar";
import axios from "axios";
import React, { useState, useEffect, FormEvent } from "react";
import { useSession } from "next-auth/react";
import { redirect, useRouter } from "next/navigation";
import toast from "react-hot-toast";

const page = () => {
  const { data: session } = useSession();
  const [post, setPost] = useState("");
  const [image, setImage] = useState("");
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter();

  if (!session?.user) redirect('/')

  const createPost = async (e: FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    try {
      const response = await axios.post("/api/posts/newPosts", {
        userId: session?.user?.id,
        post,
        image,
      });
      console.log(response);
      toast.success('Post created!')
      router.push("/");
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false)
    }
  };

  if (isLoading) toast.loading('Posting...')
  
  return (
    <div className="sm:p-5 flex gap-5 w-full">
      <Sidebar />
      <div className="py-10 w-full">
        <Form
          post={post}
          setPost={setPost}
          image={image}
          setImage={setImage}
          isLoading={isLoading}
          createPost={createPost}
        />
      </div>
    </div>
  );
};

export default page;
