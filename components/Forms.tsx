import Image from "next/image";
import React, { ChangeEvent } from "react";

interface Props {
  post: string;
  setPost: any;
  image: string;
  setImage: any;
  isLoading: boolean
  createPost: any;
}

const Form = ({ post, setPost, image, setImage, isLoading, createPost }: Props) => {
  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    const file = e.target.files?.[0];
    if (!file) return;
    if (!file.type.includes("image")) {
      console.log("Please upload an image!");
      return;
    }
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      const result = reader.result as string;

      setImage(result);
    };
  };

  return (
    <div className="sm:px-20 p-5 w-full">
      <h1 className="text-[25px] text-[#eaeaea]">Create Post</h1>
      {!image ? (
        <div className="w-auto min-h-[400px] border border-neutral-800 rounded mt-10 border-dashed">
          <div>
            <h1 className="text-[#eaeaea] text-center mt-[100px]">
              Select Image
            </h1>
            <input
              type="file"
              onChange={handleImageChange}
              className="opacity-0 h-[400px] w-full"
            />
          </div>
        </div>
      ) : (
        <div className="w-full min-h-[400px] border border-neutral-800 rounded mt-10 border-dashed p-5">
          <Image
            src={image}
            width={1000}
            height={1000}
            alt=""
            className="w-full min-h-[400px] rounded"
          />
        </div>
      )}

      <input
        className=" w-full mt-10 border border-neutral-800 py-3 rounded bg-transparent px-2 text-white"
        onChange={(e) => setPost(e.target.value)}
        value={post}
        placeholder="Enter Post"
      />

      <button
        className={`w-full  py-3 bg-[#8c6dfd] rounded mt-5 text-white hover:opacity-50 ${isLoading && 'opacity-50'}`}
        onClick={createPost}
      >
        {isLoading ? 'Posting...' : 'Post'}
      </button>
    </div>
  );
};

export default Form;
