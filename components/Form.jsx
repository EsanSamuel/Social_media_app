import React from "react";

const Form = ({ type, post, setPost, handleSubmit, submitting }) => {
  return (
    <div className="w-full sm:px-20 p-5 pt-10 h-auto">
      <h1 className="text-[40px] font-bold bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
        {type} Post
      </h1>
      <p className="mt-5">
        {type} and share assignments post with others students world wide,and
        get answers here.
      </p>
      <div className="pt-10 sm:p-5 mt-10 flex flex-col gap-5">
        <label className="">
          <h1 className="pb-3 font-bold">Prompt</h1>
          <textarea
            className="w-full flex rounded-lg h-[200px] mt-2 p-3 text-sm text-gray-500 outline-0 input"
            placeholder="Enter Prompt"
            onChange={(e) => setPost({ ...post, prompt: e.target.value })}
          />
        </label>

        <label className="">
          <h1 className="pb-3 font-bold">Tag</h1>
          <input
            className="w-full flex rounded-lg mt-2 p-3 text-sm tex3t-gray-500 outline-0 input"
            placeholder="#tag"
            onChange={(e) => setPost({ ...post, tag: e.target.value })}
          />
        </label>
      </div>
      <div className="flex float-right gap-3 mt-5 pb-5">
        <button className="bg-red-400 p-2 rounded text-white">Cancel</button>
        {!submitting ? (
          <button
            className="bg-green-400 p-2 rounded text-white"
            onClick={handleSubmit}
          >
            Create
          </button>
        ) : (
          <button className="bg-green-400 p-2 rounded text-white opacity:50">
            Creating...
          </button>
        )}
      </div>
    </div>
  );
};

export default Form;
