"use client";
import axios from "axios";
import React, { useState, useEffect } from "react";
import Card from "./Cards";
import usePosts from "../hooks/usePosts";
import Link from "next/link";
import useUsers from "../hooks/useUsers";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "../@/components/ui/carousel"
import UserCard from "./UserCard";
import UserCarousel from "./UserCarousel";


interface Props {
  data: Record<string, any>;
}

const Cardform = ({ data }: Props) => (
  <div>
    {data.map((post: Record<string, any>) => (
      <div key={post._id}>
        <Card post={post} />
      </div>
    ))}
  </div>
);

const Posts = () => {
  const { data: post = [], isLoading } = usePosts();
  const { data: users = [] } = useUsers()

  if (isLoading) {
    return (
      <div>
        <h1 className="text-center text-[#eaeaea] pt-[30%]">
          Loading posts...
        </h1>
      </div>
    )
  }
  return (
    <div className="sm:px-10 pt-10  overflow-y-auto p-5">
      <h1 className="text-[#eaeaea] sm:text-[25px] text-[22px]">Home Feed</h1>
      <Link href='/create-post'><button className="bg-[#8c6dfd] text-[#eaeaea] px-3 py-2 rounded sm:mt-5 float-right ">
        Create Post
      </button></Link>
      <div className="sm:px-10 sm:py-20 pt-5">
        <Cardform data={post} />
      </div>

     {/* <div className='sm:hidden mt-5'>
        <UserCarousel />
         </div>*/}
    </div>
  );
};

export default Posts;
