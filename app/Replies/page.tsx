"use client"
import React, { FormEvent, useState, useEffect } from 'react'
import { useSearchParams } from 'next/navigation'
import axios from 'axios'
import { useSession } from 'next-auth/react'
import Image from 'next/image'
import ReplyCard from '../../components/card/ReplyCard'

const Replies = () => {
    const { data: session } = useSession()
    const searchParams = useSearchParams()
    const commentId = searchParams.get('commentId')
    const [reply, setReply] = useState('')
    const [comment, setComment] = useState<any>('')
    const [allReplies, setAllReplies] = useState<any>([])

    useEffect(() => {
        const getComment = async () => {
            try {
                const response = await axios.get(`/api/getcommentid/${commentId}`)
                console.log(response.data)
                setComment(response.data)
            } catch (error) {
                console.log(error)
            }
        }
        getComment()
    }, [])


    const createReply = async (e: FormEvent) => {
        e.preventDefault()
        try {
            const response = await axios.post('/api/replycomments/new', {
                userId: session?.user?.id,
                commentId: commentId,
                reply
            })
            console.log(response.data)
            window.location.reload()
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        const getReplies = async () => {
            const response = await axios.get(`/api/replycomments/${commentId}`)
            console.log(response.data)
            setAllReplies(response.data)
        }
        getReplies()
    }, [])


    return (
        <div className='sm:px-[20%] p-5'>
            <h1 className='text-[#eaeaea] text-[20px] text-center pb-5'>Replies</h1>
            <div className=' flex gap-2'>
                {comment.poster && comment.poster.image ? (
                    <Image
                        src={comment && comment.poster ? comment.poster.image : ''}
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
                    <div className='text-[14px] text-[#eaeaea]'>{comment.comment}</div>
                </div>
            </div>
            <div className='pt-10 flex flex-col gap-3'>
                <input onChange={(e) => setReply(e.target.value)} placeholder='Enter Reply...'
                    className='text-white bg-transparent border border-b-[#5f5f5f] p-2 rounded w-full border-hidden outline-none' />
                <button onClick={createReply} className='bg-[#8c6dfd] p-2 rounded text-white w-full rounded-[20px] hover:opacity-50'>Reply</button>
            </div>
            <div className='sm:p-10 pt-10'>
                <h1 className='text-white pb-2'>Replies</h1>
                {allReplies?.length > 0 ? (
                    <>
                        {allReplies.map((reply: Record<string, any>) => (
                            <div key={reply._id} className='w-auto'>
                                <ReplyCard reply={reply} />
                            </div>
                        ))}
                    </>
                ) : (
                    <div>
                        <h1 className='text-[#5f5f5f] sm:p-10 p-5 text-center'>No replies found!, Be the first to reply!</h1>
                    </div>
                )}
            </div>
        </div>
    )
}

export default Replies