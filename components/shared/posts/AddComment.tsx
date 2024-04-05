"use client";
import React from "react";
import Link from "next/link";
import { z } from "zod";
import { useRouter } from "next/navigation";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { toast } from "@/components/ui/use-toast";

const schema = z.object({
  content: z
    .string()
    .min(5, { message: "Text musí být minimálně 5 znaků dlouhý" })
    .max(50, { message: "Text může být maximálně 50 znaků dlouhý" }),
});

type FormFields = z.infer<typeof schema>;

const AddComment = ({ articleId, session }: any) => {
  if (!session)
    return (
      <div className="w-[90%] mx-auto rounded-md bg-gray-200 h-[250px] flex flex-col items-center justify-center text-center">
        <p className="text-xl sm:text-2xl text-gray-800">
          Pro přidání komentáře se{" "}
          <Link href="?modal=login" className="underline font-bold">
            přihlašte
          </Link>
        </p>
      </div>
    );

  const loggedUser = session.user.id;
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormFields>({
    resolver: zodResolver(schema),
  });
  const handleAddComment: SubmitHandler<FormFields> = async (
    addCommentData,
  ) => {
    const allCommentData = Object.assign(
      {},
      addCommentData,
      { userId: loggedUser },
      { postId: articleId },
    );
    try {
      await axios.post("/api/add-comment", allCommentData);
      reset();
      router.refresh();
    } catch (error) {
      toast({
        title: "Chyba",
        description: "Oops! Něco se nepovedlo.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="space-y-2 w-full ">
      <p className="text-main-yellow">Pro čtenáře</p>
      <h1 className="text-xl  font-semibold">Zanechte komentář k příspěvku</h1>

      <form
        onSubmit={handleSubmit(handleAddComment)}
        className="flex flex-col w-[90%] max-w-[600px] mx-auto gap-3"
      >
        <textarea
          className="rounded-md border-2 p-1 min-h-[250px] outline-none"
          placeholder="Ahoj,.."
          {...register("content")}
        ></textarea>
        {errors.content && (
          <div className="text-red-500">{errors.content.message}</div>
        )}
        <button
          type="submit"
          className="bg-[#FFEB34] py-2 rounded-md font-semibold border-1"
        >
          Odeslat
        </button>
      </form>
    </div>
  );
};

export default AddComment;
