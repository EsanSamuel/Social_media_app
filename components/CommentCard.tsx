"use client"
import axios from 'axios'
import { useSession } from 'next-auth/react'
import Image from 'next/image'
import React, { useState, useEffect } from 'react'
import toast from 'react-hot-toast'
import { IoCloseOutline } from 'react-icons/io5'

interface Props {
    comment: Record<string, any>
}

const CommentCard = ({ comment }: Props) => {
    const { data: session } = useSession()
    const [editComment, setEditComment] = useState('')
    const [editmodal, setEditModal] = useState(false)

    const deleteComment = async () => {
        await axios.delete(`/api/comment/${comment._id}`)
        toast.success('Comment deleted successfully!')
    }

    useEffect(() => {
        const getComment = async () => {
            try {
                const response = await axios.get(`/api/getcommentid/${comment._id}`)
                setEditComment(response.data.comment)
                console.log(response.data.comment)
            } catch (error) {
                console.log(error)
            }
        }
        getComment()
    }, [])



    const EditComment = async () => {
        await axios.patch(`/api/comment/${comment._id}`, {
            comment: editComment
        })
        toast.success('Comment edited!')
    }
    return (
        <div className='w-auto'>
            <div className='flex flex-col gap-3  rounded-[10px] p-2 text-[#eaeaea] w-auto'>
                <div className=' flex gap-2'> <Image
                    src={comment && comment.poster ? comment.poster.image : ''}
                    width={100}
                    height={100}
                    alt=""
                    className="w-[35px] h-[35px] rounded-full"
                    priority
                />
                    <div className='flex flex-col '>
                        <h1 className='text-[12px] text-[#5f5f5f]'>{comment && comment.poster ? comment.poster.username : ''}</h1>
                        <div className='text-[14px]'>{comment.comment}</div>
                        {session?.user?.id === (comment && comment.poster ? comment.poster._id : '') && (
                            <div className='flex gap-6 text-[#5f5f5f] text-[11px] cursor-pointer'>
                                <h1 onClick={deleteComment}>Delete</h1>
                                <><h1 onClick={() => setEditModal(true)}>Edit</h1></>
                            </div>
                        )}
                    </div>
                </div>

            </div>
            <div className='mt-10'>
                {editmodal && (
                    <div className="bg-[#13131a] h-auto bottom-0 p-10 py-12 pt-14 rounded-[20px]   w-full border border-[#5f5f5f]">
                        <IoCloseOutline
                            className="text-[#eaeaea] text-[20px] cursor-pointer float-right mt-[-30px]"
                            onClick={() => setEditModal(false)}
                        />
                        <input
                            className="text-[#eaeaea] border border-[#5f5f5f] p-3 rounded bg-transparent w-full"
                            onChange={(e) => setEditComment(e.target.value)}
                            value={editComment}
                        />
                        <button
                            className="text-[#eaeaea] border border-[#5f5f5f] p-3 rounded bg-[#8c6dfd] mt-3  w-full"
                            onClick={EditComment}
                        >
                            Edit
                        </button>
                    </div>
                )}
            </div>

        </div>
    )
}

export default CommentCard