"use client";
import React, { CSSProperties } from "react";
import Card from "./card/Cards";
import usePosts from "../hooks/usePosts";
import Link from "next/link";
import ClipLoader from "react-spinners/ClipLoader";
import Spinner from 'react-spinner-material';


interface Props {
  data: Record<string, any>;
}

const override: CSSProperties = {
  display: "block",
  margin: "0 auto",
  borderColor: "#8c6dfd",
};

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

  if (isLoading) {
    return (
      <div>
        <h1 className="text-center text-[#eaeaea] pt-[30%]">
          <ClipLoader
            color='#8c6dfd'
            cssOverride={override}
            size={150}
            aria-label="Loading Spinner"
            data-testid="loader"
          />
        </h1>
      </div>
    )
  }
  return (
    <div className="lg:px-10 md:pt-10 pt-[25%] overflow-y-auto p-5">
      <h1 className="text-[#eaeaea] sm:text-[25px] text-[22px]">Home Feed</h1>
      <Link href='/create-post'><button className="bg-[#8c6dfd] text-[#eaeaea] px-3 py-2 rounded sm:mt-5 float-right ">
        Create Post
      </button></Link>
      <div className="lg:px-10 sm:py-20 pt-5">
        <Cardform data={post} />
      </div>
    </div>
  );
};

export default Posts;
