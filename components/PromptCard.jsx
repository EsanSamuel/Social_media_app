"use client"
import React, { useState } from 'react'
import { useSession } from 'next-auth/react'
import { usePathname, useRouter } from 'next/navigation'
import Image from 'next/image'
import { BiCopy } from 'react-icons/bi'

const PromptCard = ({ post, handleTagClick, handleDelete, handleEdit }) => {
  const { data: session } = useSession()
  const [copied, setCopied] = useState()
  const pathName = usePathname()
  const router = useRouter()

  const handleProfileClick = () => {
    if (post.creator._id === session?.user.id) return router.push('/Profile')

    router.push(`/Profile/${post.creator._id}?name=${post.creator.username}`);
  }

  return (
    <div className='flex-1 break-inside-avoid rounded-lg border border-gray-300 bg-white/20 bg-clip-padding p-6 pb-4   md:w-[460px] w-full h-fit'>
      <div className='flex gap-3 cursor-pointer' onClick={handleProfileClick}><Image src={post.creator.image} width={40} height={40} className='rounded-full' />
        <div className='flex flex-col text-left' >
          <h3>{post.creator.username}</h3>
          <p className='text-[12px]'>{post.creator.email}</p>
        </div><br />
      </div>
      <h2 className='text-left mt-5'>{post.prompt}</h2>
      <div className='bg-blue-500 px-3 py-1 rounded-full text-white h-auto float-right mt-2'>#{post.tag}</div>

      {session?.user.id === post.creator._id && pathName === "/Profile" && (
        <div className='mt-5 flex-center gap-4 border-t border-gray-100 pt-3 flex float-left'>
          <div>
            <p
              className='font-inter text-sm green_gradient cursor-pointer'
              onClick={handleEdit}
            >
              Edit
            </p>
          </div>
          <p
            className='font-inter text-sm orange_gradient cursor-pointer'
            onClick={handleDelete}
          >
            Delete
          </p>
         
        </div>
      )}
    </div>

  )
}

export default PromptCard