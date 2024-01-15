"use client"
import React, { useState } from 'react'
import Sidebar from '../../components/nav/Sidebar'
import useUsers from '../../hooks/useUsers'
import UserCard from '../../components/card/UserCard'

const users = () => {
    const [searchUser, setSearchUser] = useState('')
    const { data: users = [], isLoading } = useUsers()
    if (isLoading) {
        return (
            <div className='p-20 text-center text-[#eaeaea]'>Loading users...</div>
        )
    }
    
    return (
        <div className="sm:p-5 sm:flex gap-5 w-full relative">
            <Sidebar />

            <div className="sm:px-20 sm:py-10 p-5 w-full ">
                <h1 className='text-[20px] text-[#eaeaea] pb-5'>All users</h1>
                <div className='  w-full'> <input className='w-full bg-[#1c1c24] text-[#eaeaea] py-2 px-4 rounded outline-none'
                    placeholder='Search user...'
                    onChange={(e) => setSearchUser(e.target.value)}
                /></div>
                <div className='grid xl:grid-cols-5 sm:grid-cols-3 grid-cols-2 gap-7 mt-10'>
                    {users.filter((user: Record<string, any>) => {
                        if (searchUser === '') {
                            return user
                        } else if (user.username.toLowerCase().includes(searchUser.toLowerCase())) {
                            return user
                        }
                    }).map((user: Record<string, any>) => (
                        <div key={user._id} className=''>
                            <UserCard user={user} hasBorder />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default users