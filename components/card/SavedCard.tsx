import React from "react";
import api from "../../libs/api";
import Image from "next/image";
import { AiOutlineClose } from "react-icons/ai";
import { useRouter } from "next/navigation";

interface Props {
  post: Record<string, any>;
}

const SavedCard = ({ post }: Props) => {
  const router = useRouter()
  const deleteSavedPosts = async () => {
    await api.delete(`/api/saved/${post._id}/posts`);
    window.location.reload()
  };

  const handleClick = () => {
    router.push(`/PostDetails?postId=${post.post._id}`)
  }
  return (
    <div className="bg-[#13131a] border border-neutral-800 rounded-[20px] flex flex-col gap-5 p-2" >
      <div className="flex w-full justify-between">
        <div className="flex gap-2">
          {post.owner && post.owner.image ? (
            <Image
              src={post.owner.image}
              width={1000}
              height={1000}
              alt=""
              className=" h-[30px] w-[30px] rounded-full"
            />
          ) : (
            <div className='min-h-[30px] min-w-[30px] rounded-full bg-[#1c1c24]'></div>
          )}
          <div className="">
            <h1 className="text-[#eaeaea]">{post && post.owner ? post.owner.username : ''}</h1>
            <h1 className="text-[#5f5f5f] text-[13px]">{post && post.owner ? post.owner.email : ''}</h1>
          </div>
        </div>
        <AiOutlineClose
          className="text-[#eaeaea] cursor-pointer"
          onClick={deleteSavedPosts}
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
