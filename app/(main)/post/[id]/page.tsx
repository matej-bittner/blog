import React from "react";
import AddComment from "@/components/shared/posts/AddComment";
import AllComments from "@/components/shared/posts/AllComments";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

interface Article {
  id: string;
  title: string;
  description: string;
  content: string;
  createdAt: Date;
  published: boolean;
  authorId: string;
}

interface Author {
  id: string;
  email: string;
  name: string;
  surname: string;
  password: string; // Consider making this optional or readonly for security
  createdAt: Date;
}

const Post = async ({ params }: any) => {
  const postId = params.id;
  const session = await getServerSession(authOptions);
  const getPost = async () => {
    const postFromDb = await prisma.post.findUnique({ where: { id: postId } });
    const authorFromDb = await prisma.user.findUnique({
      where: { id: postFromDb?.authorId },
    });

    return [postFromDb, authorFromDb];
  };

  const postData: any = await getPost();
  const [article, author] = postData;

  return (
    <section className="px-4 max-w-[850px] mx-auto md:px-8 lg:px-12 xl:px-14 space-y-3 sm:space-y-6 lg:space-y-10 pt-6 flex items-center justify-center flex-col pb-6">
      <div className="space-y-4">
        <h1 className="text-xl text-center font-semibold">{article.title}</h1>
        <p className="italic font-light">{article.description}</p>
      </div>
      <div className="flex gap-4 items-center ">
        <img
          src="/1.jpg"
          alt=""
          className="w-[60px] aspect-square rounded-full overflow-clip object-cover"
        />
        <p>
          <span className="underline">
            {author.name + " " + author.surname}
          </span>
          <br /> sportovec, novinář a redaktor
        </p>
      </div>
      <p>{article.content}</p>
      <img alt="" src="/2.jpg" className="w-[90%] h-auto max-w-[600px]" />
      <p>
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Delectus in
        laudantium molestiae neque sit tenetur? Adipisci aliquam aspernatur
        blanditiis fuga, maiores perferendis totam ut vero.
      </p>
      <hr className="w-[80%] border-2 border-main-yellow rounded-full" />
      <AddComment articleId={article.id} session={session} />
      <hr className="w-[80%] border-2 border-main-yellow rounded-full" />
      <div className="w-full space-y-3">
        <AllComments articleId={article.id} nowLoggedId={session?.user.id} />
      </div>
    </section>
  );
};

export default Post;
