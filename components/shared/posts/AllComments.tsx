import React from "react";
import { prisma } from "@/lib/prisma";
import DeleteButton from "@/components/shared/profile/right/DeleteButton";

async function GetAllComments(articleId: any) {
  // const session = await getServerSession(authOptions);

  const allComments = await prisma.comment.findMany({
    where: { postID: articleId },
    orderBy: { createdAt: "desc" },
    include: { author: true },
  });
  return allComments;
}

const AllComments = async ({ articleId, nowLoggedId }: any) => {
  const allComments = await GetAllComments(articleId);

  return (
    <>
      {allComments.map((item) => {
        const date = new Date(item.createdAt);
        const formattedDate = date.toLocaleDateString("cs-CZ");
        return (
          <div
            key={item.id}
            className="w-[90%] mx-auto rounded-md  min-h-[60px] flex flex-col sm:flex-row items-center justify-center border-2 px-4 py-1 gap-2 sm:gap-4"
          >
            <>
              <img
                src="/1.jpg"
                alt=""
                className="w-[45px] aspect-square rounded-full overflow-clip hidden sm:block"
              />
              <p className="flex-1">{item.content}</p>
              <div className="flex sm:flex-col items-center gap-2 sm:gap-0">
                <p className="font-light text-sm">{formattedDate}</p>
                <p className="font-light text-sm">
                  {item.author?.name + " " + item.author?.surname}
                </p>
              </div>
              {nowLoggedId === item.author.id && (
                <div>
                  <DeleteButton
                    commentId={item.id}
                    confirmMessage="Opravdu chcete odstranit komentář?"
                    toastMessage="Odstranění komentáře proběhlo úspěšně"
                    buttonText={`odstranit komentář`}
                    variant="comment"
                  />
                </div>
              )}
            </>
          </div>
        );
      })}
      {Array.isArray(allComments) && allComments.length === 0 && (
        <div className="w-[90%] mx-auto rounded-md  min-h-[60px] flex flex-col sm:flex-row items-center justify-center border-2 px-4 py-1 gap-2 sm:gap-4">
          <h1>Nebyly přidány žádné komentáře k příspěvku</h1>
        </div>
      )}
    </>
  );
};

export default AllComments;
