"use client"
import axios from 'axios'
import { useSession } from 'next-auth/react'
import Image from 'next/image'
import React, { useState, useEffect } from 'react'
import toast from 'react-hot-toast'

interface Props {
    comment: Record<string, any>
}

const CommentCard = ({ comment }: Props) => {
    const { data: session } = useSession()
    const [editComment, setEditComment] = useState('')

    const deleteComment = async () => {
        await axios.delete(`/api/comment/${comment._id}`)
        toast.success('Comment deleted successfully!')
    }

    const EditComment = async () => {
        await axios.patch(`/api/comment/${comment._id}`, {
            comment: editComment
        })
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
                            <div className='flex gap-4 text-[#5f5f5f] text-[11px] cursor-pointer'>
                                <h1 onClick={() => deleteComment(comment)}>Delete</h1>
                                <><h1>Edit</h1></>
                            </div>
                        )}
                    </div>
                </div>

            </div>
        </div>
    )
}

export default CommentCard