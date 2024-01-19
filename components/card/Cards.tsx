"use client";
import React, { useState, useEffect, useContext, FormEvent, useMemo } from "react";
import Image from "next/image";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { BsThreeDots } from "react-icons/bs";
import { IoCloseOutline } from "react-icons/io5";
import api from "../../libs/api";
import { FaRegHeart, FaRegCommentAlt } from "react-icons/fa";
import toast from "react-hot-toast";
import { IValue, ToastContext } from "../../context/ToastProvider";
import { AiOutlineSend } from "react-icons/ai";
import { z } from 'zod'
import { useForm } from "react-hook-form";
import { zodResolver } from '@hookform/resolvers/zod'

interface Props {
  post: Record<string, any>;
}

const Card = ({ post }: Props) => {
  const { setToastMsg } = useContext(ToastContext) as IValue
  const { data: session } = useSession();
  const [modal, setModal] = useState(false);
  const [editmodal, setEditModal] = useState(false);
  const [edit, setEdit] = useState("");
  const [comment, setComment] = useState([])
  const [user, setUser] = useState<any>('')
  const router = useRouter();
  const [comments, setComments] = useState('')

  const handleClick = () => {
    if (post.poster._id === session?.user?.id) return router.push("/profile");

    router.push(
      `/profile/${post.poster._id}?name=${post.poster.username}
       &image=${post.poster.image}
       &email=${post.poster.email}`
    );
  };

  const handleSave = async () => {
    try {
      const response = await api.post("/api/saved/new", {
        userId: session?.user?.id,
        postId: post._id,
        ownerId: post.poster._id
      });
      console.log(response.data);
      setModal(false);
      toast.success('Post saved!')
      setToastMsg('')
    } catch (error) {
      console.log(error);
    }
  };

  const deletePosts = async () => {
    try {
      await api.delete(`/api/posts/${post._id}`);
      setModal(false)
    } catch (error) {
      console.log(error)
    }
  };

  useEffect(() => {
    const getPost = async () => {
      const response = await api.get(`/api/posts/${post._id}`);
      setEdit(response.data.post);
    };

   if(post._id) getPost();
  },[post._id]);

  const EditModal = () => {
    setEditModal(true);
    setModal(false);
  };

  const handleEdit = async () => {
    try {
      await api.patch(`/api/posts/${post._id}`, {
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
      await api.post(`/api/Like/${post._id}`, {
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
      const response = await api.get(`/api/comment/${post._id}`)
      setComment(response.data)
    }
    getComments()
  })

  useEffect(() => {
    const getUser = async () => {
      const response = await api.get(`/api/user/${session?.user?.id}`)
      setUser(response.data)
    }
    if (session?.user?.id) getUser()
  }, [session?.user?.id])

  const createComment = async (e: FormEvent) => {
    e.preventDefault()
    try {
      await api.post('/api/comment/new', {
        userId: session?.user?.id,
        postId: post._id,
        comment: comments
      })
      setComments('')
      toast.success('Comment posted!')
      window.location.reload()
    } catch (error) {
      console.log(error)
    }
  }

  const schema = z.object({
    edit: z.string().min(1, {
      message: 'Post too short!'
    })
  })

  type TSchema = z.infer<typeof schema>

  const { register, handleSubmit, formState: { errors } } = useForm<TSchema>({
    resolver: zodResolver(schema)
  })

  const onSubmit = async ({ edit }: TSchema) => {
    try {
      await api.patch(`/api/posts/${post._id}`, {
        post: edit,
      });
      setEditModal(false);
      toast.success('Post edited!')
      window.location.reload();
    } catch (error) {
      console.log(error);
    }
  }

  /*const createdAt = useMemo(() => {
    if (!post?.createdAt) {
      return null
    }
    //return formatDistanceToNowStrict(new Date(post.createdAt))
  }, [post?.createdAt])*/

  return (
    <div>
      <div className="mt-10 border  border-neutral-800 sm:rounded-[40px] rounded-[20px] sm:p-7 p-2" >
        <div className="flex w-full justify-between gap-2">
          <div className="flex gap-2" onClick={handleClick}>
            {post.poster.image ? (
              <Image
                src={post.poster.image}
                width={100}
                height={100}
                alt=""
                className="w-[35px] h-[35px] rounded-full"
                priority
              />
            ) : (
              <div className='min-w-[35px] min-h-[35px] rounded-full bg-[#1c1c24]'></div>
            )}
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
          <div className='flex gap-6 text-[#5f5f5f]'>
            <div className='flex gap-2'><FaRegHeart className="text-[#eaeaea] text-[15px] cursor-pointer " onClick={handleLike} />
              <div className="text-[#eaeaea] text-[15px] mt-[-2px]">{post.likeCounts}</div></div>

            <div className="flex gap-2">
              <FaRegCommentAlt className="text-[#eaeaea] text-[15px] cursor-pointer " onClick={handlePostClick} />
              <div className="text-[#eaeaea] text-[15px] mt-[-2px]">{comment.length}</div>
            </div>
          </div>
        </div>
        <div className='w-full sm:mt-3 mt-5 flex gap-3'>
          <div className='rounded-full'>
            {user.image ? (
              <Image
                src={user.image}
                width={100}
                height={100}
                alt=""
                className="w-[35px] h-[35px] rounded-full"
                priority
              />
            ) : (
              <div className="min-w-[35px] min-h-[35px] rounded-full border-[#5f5f5f]">
              </div>
            )}
          </div>
          <input className='w-full rounded-[20px]  p-2 px-4 bg-[#1c1c24] outline-none text-[#eaeaea]' placeholder="Enter comment..."
            onChange={(e) => setComments(e.target.value)} />
          <div className='bg-[#8c6dfd] p-2 rounded hover:opacity-50' onClick={createComment}>
            <AiOutlineSend className='text-[23px] text-[#eaeaea]' />
          </div>
        </div>

      </div>

      {modal && (
        <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none bg-neutral-800 bg-opacity-70 ">

          <div className='relative w-full lg:w-3/6 my-6 mx-auto lg:max-w-3xl h-full lg:h-auto'>
            <div className='w-full lg:h-auto border-0 rounded-lg shadow-lg relative flex flex-col h-auto p-10 bg-[#13131a] outline-none focus:outline-none'>

              <ul className="flex flex-col gap-4">
                <IoCloseOutline
                  className="text-[#eaeaea] text-[20px] cursor-pointer float-right text-right"
                  onClick={() => setModal(false)}
                />
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
          </div>
        </div>
      )}

      {editmodal && (
        <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none bg-neutral-800 bg-opacity-70 ">

          <div className='relative w-full lg:w-3/6 my-6 mx-auto lg:max-w-3xl h-full lg:h-auto'>
            <form onSubmit={handleSubmit(onSubmit)} className='w-full lg:h-auto border-0 rounded-lg shadow-lg relative flex flex-col gap-4 h-auto p-10 bg-[#13131a] outline-none focus:outline-none'>
              <IoCloseOutline
                className="text-[#eaeaea] text-[20px] cursor-pointer float-right "
                onClick={() => setEditModal(false)}
              />
              <input
                {...register('edit')}
                className="text-[#eaeaea] border border-[#5f5f5f] p-3 rounded bg-transparent w-full"
                onChange={(e) => setEdit(e.target.value)}
                value={edit}
              />
              {errors.edit && <p className='mt-2 text-red'>{errors.edit.message}</p>}
              <button
                className="text-[#eaeaea] border border-[#5f5f5f] p-3 rounded bg-[#8c6dfd]  w-full"
                // onClick={handleEdit}
                type="submit"
              >
                Edit
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Card;
