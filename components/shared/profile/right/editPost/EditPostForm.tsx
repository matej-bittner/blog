"use client";
import React from "react";
import Link from "next/link";
import { z } from "zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { toast } from "@/components/ui/use-toast";
import { useRouter } from "next/navigation";

const schema = z.object({
  title: z
    .string()
    .min(5, { message: "Nadpis musí být alespoň 3 znaky dlouhý" }),
  content: z.string().min(100, { message: "Článek je moc krátký" }),
  description: z
    .string()
    .max(60, { message: "Popis je moc dlouhý" })
    .min(15, { message: "Popis je moc krátký" }),
  published: z.boolean(),
});

type FormFields = z.infer<typeof schema>;
const EditPostForm = ({ article }: any) => {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormFields>({
    resolver: zodResolver(schema),
    defaultValues: {
      title: article.title,
      content: article.content,
      description: article.description,
      published: article.published,
    },
  });

  const handleEditPost: SubmitHandler<FormFields> = async (editPostData) => {
    try {
      const userId = article.authorId;
      const postId = article.id;
      const allData = Object.assign({}, editPostData, { userId }, { postId });

      await axios.put("/api/edit-post", allData);
      router.push("?profile=posts");
      router.refresh();
      toast({
        title: "Editace Proběhla v pořádku",
        description: "juhu",
      });
    } catch (error) {
      toast({
        title: "Chyba",
        description: "Oops! Něco se nepovedlo.",
        variant: "destructive",
      });
    }
  };

  return (
    <>
      <Link
        href="/profile"
        className="absolute underline underline-offset-2 left-2"
      >
        ← zpět
      </Link>
      <form onSubmit={handleSubmit(handleEditPost)} className="profile-form">
        <h1 className="text-2xl w-full text-center font-[500]">
          Editovat článek
        </h1>
        <div className="flex flex-col">
          <label>Nadpis:</label>
          <input type="text" {...register("title")} />
          {errors.title && (
            <div className="text-red-500">{errors.title.message}</div>
          )}
        </div>{" "}
        <div className="flex flex-col">
          <label>Krátký popis (max. 60 znaků):</label>
          <input type="text" {...register("description")} />
          {errors.description && (
            <div className="text-red-500">{errors.description.message}</div>
          )}
        </div>
        <div className="flex flex-col">
          <label>Obsah:</label>
          <textarea className="h-[400px]" {...register("content")}></textarea>
          {errors.content && (
            <div className="text-red-500">{errors.content.message}</div>
          )}
        </div>
        <div
          className={`flex gap-4 justify-center ${article.published && "hidden"}`}
        >
          <p className="text-lg">Po uložení publikovat</p>
          <input type="checkbox" {...register("published")} />
        </div>
        <button
          type="submit"
          className="bg-main-yellow w-fit text-xl px-2 py-1 rounded-md mx-auto drop-shadow-sm"
        >
          Uložit
        </button>
      </form>
    </>
  );
};

export default EditPostForm;
