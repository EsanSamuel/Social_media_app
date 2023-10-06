"use client"
import React, { useEffect, useState } from 'react'
import { useSession } from 'next-auth/react'
import axios from 'axios'
import { useRouter, useSearchParams } from 'next/navigation'
import Form from '../../components/Form'

const Index = () => {
  const { data: session } = useSession()
  const [submitting, setSubmitting] = useState(false)
  const [post, setPost] = useState({
    prompt: '',
    tag: ''
  })
  const router = useRouter()
  const searchParams = useSearchParams()
  const promptId = searchParams.get('id')

  useEffect(() => {
    const getPostDetails = async () => {
      const response = await fetch(`/api/prompt/${promptId}`)
      const data = await response.json()

      setPost({
        prompt: data.prompt,
        tag: data.tag
      })
    }

    if (promptId) getPostDetails()
  }, [promptId])

  const EditPost = async (e) => {
    e.preventDefault()
    setSubmitting(true)
    try {
      const response = await axios.patch(`/api/prompt/${promptId}`, {
        prompt: post.prompt,
        tag: post.tag
      })
      router.push('/')
    } catch (error) {
      console.log(error)
    }
  }
  return (
    <Form
      type='Edit'
      post={post}
      setPost={setPost}
      submitting={submitting}
      handleSubmit={EditPost} />
  )
}

export default Index