"use client";
import React, { useState, useEffect, FormEvent } from "react";
import Sidebar from "../../components/navbar/Sidebar";
import api from '../../libs/api'
import { useSession } from "next-auth/react";
import Image from "next/image";
import Card from "../../components/card/Cards";
import Users from "../../components/user/Users";
import { useRouter } from "next/navigation";

const MyProfile = () => {
  const { data: session } = useSession();
  const [user, setUser] = useState<any>("");
  const [posts, setPosts] = useState<any>([]);
  const [bio, setBio] = useState('')
  const router = useRouter();

  useEffect(() => {
    const getUser = async () => {
      const response = await api.get(`/api/user/${session?.user?.id}`);
      setUser(response.data);
      console.log(response);
    };
    if (session?.user?.id) getUser();
  }, [session?.user?.id]);

  useEffect(() => {
    const getUserPosts = async () => {
      const response = await api.get(`/api/users/${session?.user?.id}/posts`);
      setPosts(response.data);
    };
    if (session?.user?.id) getUserPosts();
  }, [session?.user?.id]);

  const deletePosts = async (posts: any) => {
    await api.delete(`/api/posts/${posts._id}`);
  };

  const EditProfile = () => {
    router.push(`/EditProfile?sessionId=${session?.user?.id}`);
  };

  /*const createBio = async (e: FormEvent) => {
    e.preventDefault()
    try {
      const response = await axios.post(`/api/bio/${session?.user?.id}`, {
        bio
      })
      console.log(response.data)
    } catch (error) {
      console.log(error)
    }
  }*/

  return (
    <div className="sm:p-5 sm:flex gap-5 w-full relative">
      <Sidebar />
      <div className="sm:p-20 p-1 w-full">
        <Image
          src={user.image}
          width={100}
          height={100}
          alt=""
          className="sm:w-[150px] sm:h-[150px] w-[100px] h-[100px] rounded-full sm:mt-0 mt-10"
        />
        <div className="py-5 flex w-full justify-between">
          <div>
            <h1 className="text-[#eaeaea] text-[25px]">{user.username}</h1>
            <h1 className="text-[#eaeaea] sm:text-[15px] text-[13px]">{user.email}</h1>
            {/* <div className='flex gap-2'>
              <input className='w-full  p-2 bg-transparent text-[#eaeaea]'
                onChange={(e) => setBio(e.target.value)}
                value={bio} />
              <div>
                <button onClick={createBio}>Bio</button>
              </div>
            </div>*/}
          </div>
          <div className="">
            <button
              className="py-2 px-4 rounded text-[#eaeaea] bg-[#8c6dfd]"
              onClick={EditProfile}
            >
              Edit
            </button>
          </div>
        </div>
        <hr className="text-[#5f5f5f] bg-[#5f5f5f]" />

        <div className="">
          <div className='flex justify-between w-full pt-5'>
            <h1 className='text-[#eaeaea] text-[16px]'>My Posts</h1>
            <><h1 className='text-[#eaeaea] text-[12px]'>{posts.length} posts</h1></>
          </div>
          {posts.map((post: Record<string, any>) => (
            <div key={post._id}>
              <Card post={post} />
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

export default MyProfile;
