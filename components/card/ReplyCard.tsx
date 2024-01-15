"use client"
import axios from 'axios'
import { useSession } from 'next-auth/react'
import { redirect } from 'next/navigation'
import Image from 'next/image'
import React, { FormEvent, useEffect, useState } from 'react'
import { IoCloseOutline } from 'react-icons/io5'
import toast from 'react-hot-toast'

interface Props {
    reply: Record<string, any>
}

const ReplyCard = ({ reply }: Props) => {
    const [editModal, setEditModal] = useState(false)
    const [editReply, setEditReply] = useState('')
    const { data: session } = useSession()
    const handleDelete = async () => {
        try {
            await axios.delete(`/api/replycomments/${reply._id}`)
        } catch (error) {
            console.log(error)
        }
    }
    //if (!session?.user) redirect('/')

    const EditReply = async (e: FormEvent) => {
        e.preventDefault()
        try {
            await axios.patch(`/api/replycomments/${reply._id}`, {
                reply: editReply
            })
            window.location.reload()
            toast.success('reply edited!')
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        const getReply = async () => {
            const response = await axios.get(`/api/getreply/${reply._id}`)
            setEditReply(response.data.reply)
        }
        getReply()
    }, [])

    return (
        <div>
            <div className=' flex gap-2'>
                {reply.poster && reply.poster.image ? (
                    <Image
                        src={reply.poster.image}
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
                    <h1 className='text-[12px] text-[#5f5f5f]'>{reply && reply.poster ? reply.poster.username : ''}</h1>
                    <div className='text-[14px] text-[#eaeaea]'>{reply.reply}</div>
                    {session?.user?.id === (reply && reply.poster ? reply.poster._id : '') && (
                        <div className='flex gap-6 text-[#5f5f5f] text-[11px] cursor-pointer'>
                            <h1 onClick={handleDelete}>Delete</h1>

                            <><h1 onClick={() => setEditModal(true)}>Edit</h1></>
                        </div>
                    )}
                </div>
            </div>

            <div className='mt-10'>
                {editModal && (
                    <div className="bg-[#13131a] h-auto bottom-0 p-10 py-12 pt-14 rounded-[20px]   w-full border border-[#5f5f5f]">
                        <IoCloseOutline
                            className="text-[#eaeaea] text-[20px] cursor-pointer float-right mt-[-30px]"
                            onClick={() => setEditModal(false)}
                        />
                        <input
                            className="text-[#eaeaea] border border-[#5f5f5f] p-3 rounded bg-transparent w-full"
                            onChange={(e) => setEditReply(e.target.value)}
                            value={editReply}
                        />
                        <button
                            className="text-[#eaeaea] border border-[#5f5f5f] p-3 rounded bg-[#8c6dfd] mt-3  w-full"
                            onClick={EditReply}
                        >
                            Edit
                        </button>
                    </div>
                )}
            </div>
        </div>
    )
}

export default ReplyCard