import React from "react";
import axios from "axios";
import Image from "next/image";
import { AiOutlineClose } from "react-icons/ai";
import { useRouter } from "next/navigation";

interface Props {
  post: Record<string, any>;
}

const SavedCard = ({ post }: Props) => {
  const router = useRouter()
  const deleteSavedPosts = async () => {
    await axios.delete(`/api/saved/${post._id}/posts`);
    window.location.reload()
  };

  const handleClick = () => {
    router.push(`/PostDetails?postId=${post.post._id}`)
  }
  return (
    <div className="bg-[#1c1c24] rounded-[30px] flex flex-col gap-3 p-5" >
      <div className="flex w-full justify-between">
        <div></div>
        {/*<div className="flex gap-2">
           <Image
            src={post.poster.image}
            width={1000}
            height={1000}
            alt=""
            className=" h-[30px] w-[30px] rounded-full"
          />
          <div className="">
            <h1 className="text-[#eaeaea]">{post.poster.username}</h1>
            <h1 className="text-[#5f5f5f] text-[13px]">{post.poster.email}</h1>
          </div>
        </div>*/}
        <AiOutlineClose
          className="text-[#eaeaea] cursor-pointer"
          onClick={() => deleteSavedPosts(post)}
        />
      </div>
      <Image
        src={post && post.post ? post.post.image : ""}
        width={1000}
        height={1000}
        alt=""
        className="w-full h-[300px] rounded-[20px]"
      />
      <h1 onClick={handleClick} className='text-[#eaeaea] text-[15px] cursor-pointer'>View Post</h1>
    </div>
  );
};

export default SavedCard;
