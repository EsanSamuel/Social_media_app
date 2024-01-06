"use client"
import React, { useEffect, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import axios from 'axios'
import { BsThreeDots } from 'react-icons/bs'
import Image from 'next/image'
import { FaRegHeart } from 'react-icons/fa'
import { useSession } from 'next-auth/react'
import CommentCard from '../../components/card/CommentCard'
import { toast } from 'react-hot-toast'

const page = () => {
    const { data: session } = useSession()
    const [post, setPost] = useState<any>('')
    const searchParams = useSearchParams()
    const postId = searchParams.get('postId')
    const [comment, setComment] = useState('')
    const [allComment, setAllComment] = useState<any>([])

    useEffect(() => {
        const getPosts = async () => {
            const response = await axios.get(`/api/posts/${postId}`)
            setPost(response.data)
            console.log(response.data)
        }
        getPosts()
    }, [])

    const createComment = async () => {
        setComment('')
        try {
            await axios.post('/api/comment/new', {
                userId: session?.user?.id,
                postId: postId,
                comment
            })

            toast.success('Comment posted!')
            window.location.reload()
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        const getComment = async () => {
            const response = await axios.get(`/api/comment/${postId}`)
            setAllComment(response.data)
            console.log(response.data)
        }
        getComment()
    }, [])



    return (
        <div className='sm:px-[20%] p-5'>
            <div className="mt-10 bg-[#1c1c24] sm:rounded-[40px] rounded-[20px] sm:p-7 p-5">
                <div className="flex w-full justify-between gap-2">
                    <div className="flex gap-2" >
                        <Image
                            src={post && post.poster ? post.poster.image : ''}
                            width={100}
                            height={100}
                            alt=""
                            className="w-[35px] h-[35px] rounded-full"
                        />
                        <div className="flex flex-col">
                            <h1 className="text-[#eaeaea] text-[15px]">
                                {post && post.poster ? post.poster.username : ''}
                            </h1>
                            <div>
                                <p className="text-[13px] text-[#5f5f5f]">{post && post.poster ? post.poster.email : ''}</p>
                            </div>
                        </div>
                    </div>
                    <BsThreeDots
                        className="text-[#eaeaea] text-[20px] cursor-pointer"

                    />
                </div>

                <div className="mt-5 flex flex-col gap-5">
                    <h1 className="text-[#eaeaea] text-[15px]">{post.post}</h1>
                    <Image
                        src={post.image}
                        width={1000}
                        height={1000}
                        alt=""
                        className="w-full sm:h-[500px] h-[300px] rounded-[30px]"
                    />
                    <div className='flex gap-2'>
                        <FaRegHeart className="text-[#eaeaea] text-[15px] cursor-pointer" />
                        <h1 className='text-[#eaeaea] text-[15px] mt-[-2px]'>{post.likeCounts}</h1>
                    </div>
                </div>


            </div>
            <div className='pt-10 flex flex-col gap-3'>
                <input onChange={(e) => setComment(e.target.value)} placeholder='Enter Comment...'
                    className='text-white bg-transparent border border-b-[#5f5f5f] p-2 rounded w-full border-hidden outline-none' />
                <button onClick={createComment} className='bg-[#8c6dfd] p-2 rounded text-white w-full rounded-[20px]'>Comment</button>
            </div>
            <div className='sm:p-10 pt-10'>
                <h1 className='text-white pb-2'>Comments</h1>
                {allComment?.length > 0 ? (
                    <>
                        {allComment.map((comment: Record<string, any>) => (
                            <div key={comment._id} className='w-auto'>
                                <CommentCard comment={comment} />
                            </div>
                        ))}
                    </>
                ) : (
                    <div>
                        <h1 className='text-[#5f5f5f] sm:p-10 p-5 text-center'>No comments found!, Be the first to comment!</h1>
                    </div>
                )}
            </div>

        </div>
    )
}

export default page