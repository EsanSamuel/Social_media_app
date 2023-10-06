"use client";

import React, { useState, useEffect } from "react";
import axios from "axios";
import PromptCard from "./PromptCard";

const CardList = ({ data, handleTagClick }) => {
  return (
    <div className="mt-16 flex justify-center flex-col items-center gap-3">
      {data?.length > 0 ? (
        <>
          {data.reverse().map((post) => (
            <PromptCard
              key={post._id}
              post={post}
              handleTagClick={handleTagClick}
            />
          ))}
        </>
      ) : (
        <div>Loading...</div>
      )}
    </div>
  );
};

const Feed = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [allPost, setAllPosts] = useState([]);

  useEffect(() => {
    const getData = async () => {
      const response = await axios.get("/api/prompt");
      setAllPosts(response.data.reverse());
      console.log(response.data);
    };

    getData();
  }, []);

  return (
    <div className="mt-10">
      <input
        className="w-full flex rounded-lg mt-2 p-3 text-sm text-gray-500 outline-0 input"
        type="search"
        placeholder="Search..."
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      <CardList data={allPost} handleTagClick={() => {}} />
    </div>
  );
};

export default Feed;
