"use client";
import Form from "../../components/Forms";
import Sidebar from "../../components/navbar/Sidebar";
import React, { useState, useEffect, FormEvent } from "react";
import { useSession } from "next-auth/react";
import { redirect, useRouter } from "next/navigation";
import toast from "react-hot-toast";
import api from "../../libs/api";

const CreatePost = () => {
  const { data: session } = useSession();
  const [post, setPost] = useState("");
  const [image, setImage] = useState("");
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter();
  const sessionUser = session?.user?.id

  //if (!session?.user) redirect('/')

  const createPost = async (e: FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    try {
      const response = await api.post("/api/posts/newPosts", {
        userId: session?.user?.id,
        post,
        image,
      });
      console.log(response);
      toast.success('Post created successfully!')
      router.push("/");
      setIsLoading(false)
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false)
    }
  };

  //if (isLoading) toast.loading('Posting...')

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

export default CreatePost
