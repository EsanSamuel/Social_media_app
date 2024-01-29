"use client";
import React, { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import api from '../../libs/api'
import toast from "react-hot-toast";

const EditProfile = () => {
  const { data: session } = useSession();
  const searchParams = useSearchParams();
  const [user, setUser] = useState<any>("");
  const [username, setUsername] = useState("");
  const router = useRouter();
  const [image, setImage] = useState("");
  const [bio, setBio] = useState("")
  const [coverImage, setCoverImage] = useState("")

  useEffect(() => {
    const getUser = async () => {
      const response = await api.get(`/api/user/${session?.user?.id}`);
      setUsername(response.data.username);
      setUser(response.data);
    };
    if (session?.user?.id) getUser();
  }, [session?.user?.id]);

  const Edit = async (e: FormEvent) => {
    e.preventDefault()
    try {
      const response = await api.patch(`/api/user/${session?.user?.id}`, {
        username,
        image,
      });
      console.log(response.data);
      router.push("/profile");
    } catch (error) {
      console.log(error);
    }
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
      setImage(result);
    };
  };

  const handleCoverImageChange = (e: ChangeEvent<HTMLInputElement>) => {
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

  const EditBio = async (e: FormEvent) => {
    e.preventDefault()
    try {
      const response = await api.patch(`/api/bio/${session?.user?.id}`, {
        bio,
        coverImage
      })
      console.log(response.data)
      toast.success("Bio and cover Image updated")
      router.push("/profile")
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    const getUserBio = async () => {
      const response = await api.get(`/api/user/${session?.user?.id}`);
      setBio(response.data.bio);
    };
    if (session?.user?.id) getUserBio();
  }, [session?.user?.id]);

  return (
    <div className="sm:px-[30%] py-20 p-5 flex flex-col gap-7">
      <div className="flex items-center justify-center">
        {!image ? (
          <Image
            src={user.image}
            width={1000}
            height={1000}
            alt=""
            className="rounded-full w-[150px] h-[150px]"
          />
        ) : (
          <Image
            src={image}
            width={1000}
            height={1000}
            alt=""
            className="rounded-full w-[150px] h-[150px]"
          />
        )}
      </div>
      <div className="rounded text-[#eaeaea] bg-[#8c6dfd]">
        <h1 className='py-2 px-4 rounded text-[#eaeaea] bg-[#8c6dfd]'>Select Image</h1>
        <input className=" opacity-0 h-full" onChange={handleImageChange} type="file" />
      </div>

      <label className='w-full text-[#eaeaea]'>
        <h1 className="py-1">Change username</h1>
        <input
          className="p-2 bg-transparent border border-neutral-800 rounded w-full text-[#eaeaea]"
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Enter username"
          type="text"
          value={username}
        />
      </label>

      <button
        className="py-2 px-4 rounded text-[#eaeaea] bg-[#8c6dfd] w-full"
        onClick={Edit}
      >
        Edit Profile
      </button>
      
      {user.bio && user.coverImage ?
        <div className='flex flex-col gap-7'>
          <h1 className='text-white pb-5'>Change Bio and Cover image</h1>
          <div className="flex items-center justify-center">
            {!coverImage ? (
              <Image
                src={user && user.coverImage ? user.coverImage : ""}
                width={1000}
                height={1000}
                alt=""
                className="rounded "
              />
            ) : (
              <Image
                src={coverImage}
                width={1000}
                height={1000}
                alt=""
                className="rounded "
              />
            )}
          </div>
          <div className="rounded text-[#eaeaea] bg-[#8c6dfd]">
            <h1 className='py-2 px-4 rounded text-[#eaeaea] bg-[#8c6dfd]'>Select Image</h1>
            <input className=" opacity-0" onChange={handleCoverImageChange} type="file" />
          </div>

          <label className='w-full text-[#eaeaea]'>
            <h1 className="py-1">Change Bio</h1>
            <input
              className="p-2 bg-transparent border border-neutral-800 rounded w-full text-[#eaeaea]"
              onChange={(e) => setBio(e.target.value)}
              placeholder="Enter username"
              type="text"
              value={bio}
            />
          </label>

          <button
            className="py-2 px-4 rounded text-[#eaeaea] bg-[#8c6dfd] w-full"
            onClick={EditBio}
          >
            Edit
          </button>

        </div>
        : ""}

    </div>
  );
};

export default EditProfile;
