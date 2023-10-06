"use client";
import React, { useState, useEffect } from "react";
import Profile from "../../../components/Profile";
import { useSession } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import axios from "axios";

const Myprofile = ({ params }) => {
  const { data: session } = useSession();
  const [allPost, setAllPosts] = useState([]);
  const router = useRouter();
  const searchParams = useSearchParams();
  const username = searchParams.get("name");

  useEffect(() => {
    const getData = async () => {
      const response = await axios.get(`/api/users/${params?.id}/posts`);
      setAllPosts(response.data.reverse());
      console.log(response.data);
    };

    if (params?.id) getData();
  }, [params.id]);

  return (
    <Profile
      name={`${username}'s`}
      desc={`Welcome to ${username}'s profile page`}
      data={allPost}
    />
  );
};

export default Myprofile;
