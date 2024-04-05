import React from "react";
import Hero from "@/components/shared/Hero";
import PostItem from "@/components/shared/posts/PostItem";
import { prisma } from "@/lib/prisma";
import Link from "next/link";

async function GetPosts() {
  const postsDb = await prisma.post.findMany({
    where: { published: true },
    orderBy: { createdAt: "desc" },
  });
  return postsDb;
}

const Page = async () => {
  const posts = await GetPosts();

  return (
    <div className="text-red-500">
      <Hero />
      <div className="px-2 sm:px-4 max-w-[1440px] mx-auto md:px-8 lg:px-12 xl:px-14 py-4 grid grid-cols-1 md:grid-cols-2 2xl:grid-cols-3 justify-items-center gap-4 ">
        {posts.map((item) => (
          <Link
            key={item.id}
            className="w-full flex justify-center"
            href={`/post/${item.id}`}
          >
            <PostItem post={item} />
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Page;
