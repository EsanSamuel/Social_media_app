import React from "react";
import PromptCard from "./PromptCard";

const Profile = ({ name, desc, data, handleDelete, handleEdit }) => {
  return (
    <div className="sm:p-20 p-5 w-full">
      <h1 className="text-[40px] font-bold bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
        {name} Profile
      </h1>
      <p>{desc}</p>

      <div className="mt-10 flex flex-col items-center gap-3">
       {data?.length > 0 ? (
        <>
        {data.reverse().map((post) => (
          <PromptCard
            key={post._id}
            post={post}
            handleEdit={() => handleEdit && handleEdit(post)}
            handleDelete={() => handleDelete && handleDelete(post)}
          />
        ))}
        </>
       ):(
        <div>Loading...</div>
       )}
      </div>
    </div>
  );
};

export default Profile;
