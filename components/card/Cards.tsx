"use client";
import React, { useState, useEffect, useContext } from "react";
import Image from "next/image";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { BsThreeDots } from "react-icons/bs";
import { IoCloseOutline } from "react-icons/io5";
import axios from "axios";
import { FaRegHeart, FaRegCommentAlt } from "react-icons/fa";
import toast from "react-hot-toast";
import { IValue, ToastContext } from "../../context/ToastProvider";

interface Props {
  post: Record<string, any>;
}

const Card = ({ post }: Props) => {
  const { setToastMsg } = useContext(ToastContext) as IValue
  const { data: session } = useSession();
  const [modal, setModal] = useState(false);
  const [editmodal, setEditModal] = useState(false);
  const [edit, setEdit] = useState("");
  const [likes, setLikes] = useState(post.likes)
  const [comment, setComment] = useState([])
  const router = useRouter();

  const handleClick = () => {
    if (post.poster._id === session?.user?.id) return router.push("/profile");

    router.push(
      `/profile/${post.poster._id}?name=${post.poster.username}&image=${post.poster.image}&email=${post.poster.email}`
    );
  };

  const handleSave = async () => {
    try {
      const response = await axios.post("/api/saved/new", {
        userId: session?.user?.id,
        postId: post._id,
        ownerId: post.poster._id
      });
      console.log(response.data);
      setModal(false);
      toast.success('Post saved!')
      setToastMsg('Post saved!')
    } catch (error) {
      console.log(error);
    }
  };

  const deletePosts = async () => {
    await axios.delete(`/api/posts/${post._id}`);
  };

  useEffect(() => {
    const getPost = async () => {
      const response = await axios.get(`/api/posts/${post._id}`);
      setEdit(response.data.post);
    };

    getPost();
  }, []);

  const EditModal = () => {
    setEditModal(true);
    setModal(false);
  };

  const handleEdit = async () => {
    try {
      await axios.patch(`/api/posts/${post._id}`, {
        post: edit,
      });
      setEditModal(false);
      window.location.reload();
    } catch (error) {
      console.log(error);
    }
  };

  const handlePostClick = async () => {
    router.push(`/PostDetails?postId=${post._id}`)
  }

  const handleLike = async () => {
    try {
      await axios.post(`/api/Like/${post._id}`, {
        userId: session?.user?.id
      })
      toast.success('Post liked!')
      window.location.reload()
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    const getComments = async () => {
      const response = await axios.get(`/api/comment/${post._id}`)
      setComment(response.data)
    }
    getComments()
  }, [])


  return (
    <div>
      <div className="mt-10 border bg-[#1c1c24] border-[#5f5f5f] sm:rounded-[40px] rounded-[20px] sm:p-7 p-5" >
        <div className="flex w-full justify-between gap-2">
          <div className="flex gap-2" onClick={handleClick}>
            <Image
              src={post.poster.image}
              width={100}
              height={100}
              alt=""
              className="w-[35px] h-[35px] rounded-full"
              priority
            />
            <div className="flex flex-col">
              <h1 className="text-[#eaeaea] text-[15px]">
                {post.poster.username}
              </h1>
              <div>
                <p className="text-[13px] text-[#5f5f5f]">{post.poster.email}</p>
              </div>
            </div>
          </div>
          <BsThreeDots
            className="text-[#eaeaea] text-[20px] cursor-pointer"
            onClick={() => setModal(true)}
          />
        </div>

        <div className="mt-5 flex flex-col gap-5" >
          <h1 className="text-[#eaeaea] text-[15px]">{post.post}</h1>
          <Image
            src={post.image}
            width={1000}
            height={1000}
            alt=""
            className="w-full sm:h-[500px] h-[300px] sm:rounded-[30px] rounded-[20px]"
            priority
            onClick={handlePostClick}
          />
          <div className='flex gap-6'>
            <div className='flex gap-2'><FaRegHeart className="text-[#eaeaea] text-[15px] cursor-pointer " onClick={handleLike} />
              <div className="text-[#eaeaea] text-[15px] mt-[-2px]">{post.likeCounts}</div></div>

            <div className="flex gap-2">
              <FaRegCommentAlt className="text-[#eaeaea] text-[14px] cursor-pointer " onClick={handlePostClick} />
              <div className="text-[#eaeaea] text-[15px] mt-[-2px]">{comment.length}</div>
            </div>
          </div>
        </div>

      </div>

      {modal && (
        <div className="bg-[#13131a] h-auto fixed bottom-0 p-10 py-12 pt-14 rounded-t-[20px]  sm:w-[650px] w-full border-t border-r border-l border-[#5f5f5f]">
          <IoCloseOutline
            className="text-[#eaeaea] text-[20px] cursor-pointer float-right mt-[-30px]"
            onClick={() => setModal(false)}
          />
          <ul className="flex flex-col gap-4">
            <li
              className="text-[#eaeaea] border border-[#5f5f5f] p-3 rounded cursor-pointer"
              onClick={handleSave}
            >
              Save
            </li>
            {session?.user?.id === post.poster._id && (
              <>
                <li
                  className="text-[#eaeaea] border border-[#5f5f5f] p-3 rounded cursor-pointer"
                  onClick={EditModal}
                >
                  Edit
                </li>
                <li
                  className="border border-red-400 p-3 rounded text-red-400 cursor-pointer"
                  onClick={deletePosts}
                >
                  Delete
                </li>
              </>
            )}
          </ul>
        </div>
      )}

      {editmodal && (
        <div className="bg-[#13131a] h-auto bottom-0 p-10 py-12 pt-14 rounded-t-[20px]  sm:w-[650px] w-full border-t border-r border-l border-[#5f5f5f]">
          <IoCloseOutline
            className="text-[#eaeaea] text-[20px] cursor-pointer float-right mt-[-30px]"
            onClick={() => setEditModal(false)}
          />
          <input
            className="text-[#eaeaea] border border-[#5f5f5f] p-3 rounded bg-transparent w-full"
            onChange={(e) => setEdit(e.target.value)}
            value={edit}
          />
          <button
            className="text-[#eaeaea] border border-[#5f5f5f] p-3 rounded bg-[#8c6dfd] mt-3  w-full"
            onClick={handleEdit}
          >
            Edit
          </button>
        </div>
      )}
    </div>
  );
};

export default Card;
