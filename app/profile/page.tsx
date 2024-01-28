"use client";
import React, { useState, useEffect, FormEvent, ChangeEvent } from "react";
import Sidebar from "../../components/navbar/Sidebar";
import api from '../../libs/api'
import { useSession } from "next-auth/react";
import Image from "next/image";
import Card from "../../components/card/Cards";
import Users from "../../components/user/Users";
import { useRouter } from "next/navigation";
import { IoCloseOutline } from "react-icons/io5";

const MyProfile = () => {
  const { data: session } = useSession();
  const [user, setUser] = useState<any>("");
  const [posts, setPosts] = useState<any>([]);
  const [bio, setBio] = useState('')
  const [coverImage, setCoverImage] = useState("")
  const [openModal, setOpenModal] = useState(false)
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

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    const file = e.target.files?.[0];
    if (!file) return;
    if (!file.type.includes("image")) {
      console.log("Please upload an image!");
      return;
    }
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      const result = reader.result as string;
      setCoverImage(result);
    };
  };

  const EditProfile = () => {
    router.push(`/EditProfile?sessionId=${session?.user?.id}`);
  };

  const createBio = async (e: FormEvent) => {
    e.preventDefault()
    try {
      const response = await api.post(`/api/bio/${session?.user?.id}`, {
        bio,
        coverImage
      })
      console.log(response.data)
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <>
      <div className="sm:p-5 sm:flex gap-5 w-full relative">
        <Sidebar />
        <div className="sm:p-20 p-1 w-full">
          {!user.coverImage ? <div className='min-h-[200px] bg-[#1c1c24] rounded'></div> :
            <Image
              src={user.coverImage}
              width={1000}
              height={1000}
              alt=""
              className='min-h-[200px]  rounded' />
          }
          <Image
            src={user.image}
            width={100}
            height={100}
            alt=""
            className="sm:w-[150px] sm:h-[150px] w-[100px] h-[100px] rounded-full sm:mt-[-10%] mt-[-17%] z-10"
          />
          <div className="py-5 flex w-full justify-between">
            <div>
              <h1 className="text-[#eaeaea] text-[25px]">{user.username}</h1>
              <h1 className="text-[#eaeaea] sm:text-[15px] text-[13px]">{user.email}</h1>
              {!createBio ? <button onClick={() => setOpenModal(true)}>Create Bio</button> :
                <h1 className="text-[#eaeaea] sm:text-[15px] text-[13px]">{user && user.bio ? user.bio : ""}</h1>}
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
      {openModal &&
        <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none bg-neutral-800 bg-opacity-70 ">
          <div className='relative w-full lg:w-3/6 my-6 mx-auto lg:max-w-3xl h-full lg:h-auto'>
            <div className='w-full lg:h-auto border-0 rounded-lg shadow-lg relative flex flex-col gap-6 h-auto p-10 bg-[#13131a] outline-none focus:outline-none'>
              <IoCloseOutline
                className="text-[#eaeaea] text-[20px] cursor-pointer float-right "
                onClick={() => setOpenModal(false)}
              />

              <h1 className="text-[25px] text-[#eaeaea]">Bio and CoverImage</h1>
              {!coverImage ? (
                <div className="w-auto min-h-[300px] border border-neutral-800 rounded mt-10 border-dashed">
                  <div>
                    <h1 className="text-[#eaeaea] text-center mt-[100px]">
                      Select Image
                    </h1>
                    <input
                      type="file"
                      onChange={handleImageChange}
                      className="opacity-0 h-[400px] w-full"
                    />
                  </div>
                </div>
              ) : (
                <div className="w-full min-h-[300px] border border-neutral-800 rounded mt-10 border-dashed p-5">
                  <Image
                    src={coverImage}
                    width={1000}
                    height={1000}
                    alt=""
                    className="w-full min-h-[400px] rounded"
                  />
                </div>
              )}

              <input
                className=" w-full mt-10 border border-neutral-800 py-3 rounded bg-transparent px-2 text-white"
                onChange={(e) => setBio(e.target.value)}
                value={bio}
                placeholder="Enter Bio"
              />

              <button
                className='w-full  py-3 bg-[#8c6dfd] rounded mt-5 text-white hover:opacity-50 '
                onClick={createBio}
              >
                Create
              </button>
            </div>
          </div>
        </div>
      }

    </>
  );
};

export default MyProfile;
