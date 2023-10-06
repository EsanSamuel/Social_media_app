"use client";
import React, { useState, useEffect } from "react";
import Profile from "../../components/Profile";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import axios from "axios";

const Myprofile = () => {
  const { data: session } = useSession();
  const [allPost, setAllPosts] = useState([]);
  const router = useRouter();

  useEffect(() => {
    const getData = async () => {
      const response = await axios.get(`/api/users/${session?.user.id}/posts`);
      setAllPosts(response.data.reverse());
      console.log(response.data);
    };

    if (session?.user.id) getData();
  }, [session?.user.id]);

  const handleDelete = async (allPost) => {
    await axios.delete(`/api/prompt/${allPost._id}`);
  };

  const handleEdit = (allPost) => {
    router.push(`/update-prompt?id=${allPost._id}`);
  };

  return (
    <Profile
      name="My"
      desc="Welcome to your profile page"
      data={allPost}
      handleEdit={handleEdit}
      handleDelete={handleDelete}
    />
  );
};

export default Myprofile;
