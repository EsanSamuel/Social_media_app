"use client"
import api from '../../libs/api'
import { useSession } from 'next-auth/react'
import Image from 'next/image'
import React, { useState, useEffect } from 'react'
import toast from 'react-hot-toast'
import { IoCloseOutline } from 'react-icons/io5'
import { useRouter } from 'next/navigation'
import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'

interface Props {
    comment: Record<string, any>
}

const CommentCard = ({ comment }: Props) => {
    const { data: session } = useSession()
    const [editComment, setEditComment] = useState('')
    const [reply, setReply] = useState([])
    const [editmodal, setEditModal] = useState(false)
    const router = useRouter()

    const deleteComment = async () => {
        await api.delete(`/api/comment/${comment._id}`)
        toast.success('Comment deleted successfully!')
    }

    useEffect(() => {
        const getComment = async () => {
            try {
                const response = await api.get(`/api/getcommentid/${comment._id}`)
                setEditComment(response.data.comment)
            } catch (error) {
                console.log(error)
            }
        }
        getComment()
    })

    const schema = z.object({
        editComment: z.string().min(1)
    })

    type TSchema = z.infer<typeof schema>

    const { register, handleSubmit, formState: { errors } } = useForm<TSchema>({
        resolver: zodResolver(schema)
    })

    const EditComment = async ({ editComment }: TSchema) => {
        await api.patch(`/api/comment/${comment._id}`, {
            comment: editComment
        })
        toast.success('Comment edited!')
        window.location.reload()
    }

    const handleReplies = () => {
        router.push(`/Replies?commentId=${comment._id}`)
    }

    useEffect(() => {
        const getReply = async () => {
            try {
                const response = await api.get(`/api/replycomments/${comment._id}`)
                setReply(response.data)
            } catch (error) {
                console.log(error)
            }
        }
        getReply()
    })

    return (
        <div className='w-auto'>
            <div className='flex flex-col gap-3  rounded-[10px] p-2 text-[#eaeaea] w-auto'>
                <div className=' flex gap-2'>
                    {comment.poster && comment.poster.image ? (
                        <Image
                            src={comment.poster.image}
                            width={100}
                            height={100}
                            alt=""
                            className="w-[35px] h-[35px] rounded-full"
                            priority
                        />
                    ) : (
                        <div className='min-w-[35px] min-h-[35px] rounded-full bg-[#1c1c24]'></div>
                    )}
                    <div className='flex flex-col '>
                        <h1 className='text-[12px] text-[#5f5f5f]'>{comment && comment.poster ? comment.poster.username : ''}</h1>
                        <div className='text-[14px]'>{comment.comment}</div>

                        <div className='flex gap-6 text-[#5f5f5f] text-[11px] cursor-pointer'>
                            {session?.user?.id === (comment && comment.poster ? comment.poster._id : '') && (
                                <div className='flex gap-6 '>
                                    <h1 onClick={deleteComment}>Delete</h1>
                                    <><h1 onClick={() => setEditModal(true)}>Edit</h1></>
                                </div>
                            )}
                            <><h1 onClick={handleReplies}>Reply</h1></>
                        </div>
                        {reply.length > 0 && (
                            <h1 className='text-[#5f5f5f] text-[11px]'>{reply.length} {reply.length > 1 ? 'replies' : 'reply'}</h1>
                        )}
                    </div>
                </div>

            </div>
            <div className='sm:mt-10'>
                {editmodal && (
                    <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none bg-neutral-800 bg-opacity-70 ">

                        <div className='relative w-full lg:w-3/6 my-6 mx-auto lg:max-w-3xl h-full lg:h-auto'>

                            <form onSubmit={handleSubmit(EditComment)} className='w-full lg:h-auto border-0 rounded-lg shadow-lg relative flex flex-col gap-4 h-auto p-10 bg-[#13131a] outline-none focus:outline-none'>
                                <IoCloseOutline
                                    className="text-[#eaeaea] text-[20px] cursor-pointer float-right mt-[-30px]"
                                    onClick={() => setEditModal(false)}
                                />
                                <input
                                    {...register('editComment')}
                                    className="text-[#eaeaea] border border-[#5f5f5f] p-3 rounded bg-transparent w-full"
                                    onChange={(e) => setEditComment(e.target.value)}
                                    value={editComment}
                                />
                                {errors.editComment && <p>{errors.editComment.message}</p>}
                                <button
                                    className="text-[#eaeaea] border border-[#5f5f5f] p-3 rounded bg-[#8c6dfd] mt-3  w-full"
                                    type='submit'
                                >
                                    Edit
                                </button>
                            </form>
                        </div>
                    </div>
                )}
            </div>

        </div>
    )
}

export default CommentCard