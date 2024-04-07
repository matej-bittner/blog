import React from "react";
import Link from "next/link";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth";
import { prisma } from "@/lib/prisma";
import PublishedButton from "@/components/shared/profile/right/PublishedButton";
import DeleteButton from "@/components/shared/DeleteButton";

async function GetPosts() {
  const session = await getServerSession(authOptions);
  const AllUserPosts = await prisma.post.findMany({
    where: { authorId: session?.user.id },
    orderBy: { createdAt: "desc" },
  });
  return AllUserPosts;
}

const AllUserPosts = async () => {
  const allPosts = await GetPosts();

  return (
    <div className="w-full h-full flex flex-col items-center gap-4 pt-2 relative">
      <Link
        href="/profile"
        className="absolute underline underline-offset-2 left-2"
      >
        ← zpět
      </Link>
      <h1 className="text-2xl w-full text-center font-[500]">Přidat článek</h1>
      {allPosts.map((item) => {
        const date = new Date(item.createdAt);
        const formattedDate = date.toLocaleDateString("cs-CZ");

        return (
          <div
            key={item.id}
            className="h-fit w-[90%] border-2 border-main-green rounded-lg flex flex-col p-2 gap-4"
          >
            <div className="flex flex-col items-center flex-1 text-center">
              <h1 className="text-xl">{item.title}</h1>
              <p className="font-light">{item.description}</p>
            </div>
            <div className="w-full bottom-0 right-0 py-2 px-3 flex gap-6 justify-between items-center">
              <Link
                href={`/post/${item.id}`}
                className="underline text-center sm:text-left"
              >
                Zobrazit článek
              </Link>
              <div className="flex gap-4 items-center">
                <div className="flex flex-col gap-2 sm:flex-row sm:gap-4 items-center">
                  {!item.published && (
                    <PublishedButton postId={item.id} userId={item.authorId} />
                  )}
                  <Link
                    href={`?profile=edit-post&id=${item.id}`}
                    className="bg-main-yellow py-1 px-2 rounded-md"
                  >
                    editovat
                  </Link>
                </div>
                <p className="underline italic whitespace-nowrap ">
                  {formattedDate}
                </p>
                <DeleteButton
                  articleId={item.id}
                  confirmMessage="Opravdu chcete článek odstranit?"
                  toastMessage="Článek byl odstaraněn, včetně všch komentářů"
                  buttonText="Smazat článek"
                  variant="post"
                />
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default AllUserPosts;
