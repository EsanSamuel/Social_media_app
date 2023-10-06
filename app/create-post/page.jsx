"use client";
import React, { useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Form from "../../components/Form";
import axios from "axios";

const Index = () => {
  const { data: session } = useSession();
  const [submitting, setSubmitting] = useState(false);
  const [post, setPost] = useState({
    prompt: "",
    tag: "",
  });
  const router = useRouter();

  const CreatePost = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      const response = await axios.post("/api/prompt/new", {
        prompt: post.prompt,
        userId: session?.user.id,
        tag: post.tag,
      });

      router.push("/");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Form
      type="Create"
      post={post}
      setPost={setPost}
      submitting={submitting}
      handleSubmit={CreatePost}
    />
  );
};

export default Index;
