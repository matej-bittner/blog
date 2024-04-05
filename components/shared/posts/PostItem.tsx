import React from "react";
import Image from "next/image";

const PostItem = ({ post }: any) => {
  return (
    <div className="shadow-md border-black w-[440px] md:w-[400px] lg:w-[440px] max-w-[90%] h-[400px] md:h-[355px] lg:h-[400px] rounded-md overflow-clip flex flex-col ">
      <div className="relative w-full h-[220px] lg:h-[250px] rounded-b-md overflow-clip">
        <Image src="/1.jpg" alt="" fill className="object-cover" />
      </div>
      <div className="flex items-center flex-1">
        <div className="text-black px-2 flex flex-col space-y-3 w-full">
          <h2 className="text-xl">{post.title}</h2>
          <p className="text-base">{post.description}</p>
        </div>
        <div className="w-[80px] aspect-square rounded-full relative overflow-clip mx-2">
          <Image src="/1.jpg" alt="" fill className="object-cover" />
        </div>
      </div>
    </div>
  );
};

export default PostItem;
