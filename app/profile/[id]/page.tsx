"use client";
import React, { useState, useEffect } from "react";
import Sidebar from "../../../components/navbar/Sidebar";
import api from '../../../libs/api'
import { useSession } from "next-auth/react";
import Image from "next/image";
import Card from "../../../components/card/Cards";
import Users from "../../../components/user/Users";
import { useSearchParams } from "next/navigation";

interface Params {
  id: string;
}

const Profile = ({ params }: { params: Params }) => {
  const { data: session } = useSession();
  const [posts, setPosts] = useState<any>([]);
const [user,setUser] = useState<any>('')
  const searchParams = useSearchParams();
  const username = searchParams.get("name");
  const userimage = searchParams.get("image");
  const useremail = searchParams.get("email");

  useEffect(() => {
    const getUserPosts = async () => {
      const response = await api.get(`/api/users/${params?.id}/posts`);
      setPosts(response.data);
    };
    if (params?.id) getUserPosts();
  }, [params?.id]);

  useEffect(() => { 
     const getUser = async () => { 
       const response = await api.get(`/api/user/${params?.id}`); 
       setUser(response.data); 
     }; 
     if (params?.id) getUser(); 
   }, [params?.id]);

  return (
    <div className="sm:p-5 sm:flex gap-5 w-full relative">
      <Sidebar />
      <div className="sm:p-20 p-1 w-full">
          {!user.coverImage ? <div className='sm:min-h-[200px] min-h-[150px] bg-[#1c1c24] rounded'></div> : 
             <Image 
               src={user.coverImage} 
               width={1000} 
               height={1000} 
               alt="" 
               className='sm:min-h-[200px] min-h-[150px] sm:max-h-[200px] max-h-[150px] rounded' /> 
           }
        <Image
          src={userimage!}
          width={100}
          height={100}
          alt=""
          className="sm:w-[150px] sm:h-[150px] w-[100px] h-[100px] rounded-full sm:mt-[-10px] mt-[-17px]"
        />
        <div className="mt-5  text-[25px]">
          <h1 className="text-[#eaeaea]">{username}</h1>
          <h1 className="text-[#eaeaea] sm:text-[15px] text-[13px] pb-2">{useremail}</h1>
                <h1 className="text-[#eaeaea] sm:text-[15px] text-[13px]">{user && user.bio ? user.bio : ""}</h1>
        </div>
        <hr />

        <div className="">

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

export default Profile
