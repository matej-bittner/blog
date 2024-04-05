"use client";
import React, { useState } from "react";
import Link from "next/link";

import { z } from "zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { useSession } from "next-auth/react";
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
const CreatePostForm = () => {
  const session = useSession();
  const router = useRouter();
  let userId = session.data?.user.id;

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormFields>({
    resolver: zodResolver(schema),
  });

  const handleAddPost: SubmitHandler<FormFields> = async (addPostData) => {
    try {
      const allData = Object.assign({}, addPostData, { userId });
      await axios.post("/api/add-post", allData);
      reset();
      router.refresh();
      toast({
        title: "Článek Byl přidán",
        description: "juhu",
      });
    } catch (error) {
      let message: string | undefined;
      // @ts-ignore
      message = error.response?.data;

      if (message === undefined) {
        message = "něco se nepovedlo";
      }

      toast({
        title: "Chyba",
        description: `Oops! ${message}`,
        variant: "destructive",
      });
    }
  };
  const [publish, setPublish] = useState(false);

  return (
    <>
      <Link
        href="/profile"
        className="absolute underline underline-offset-2 left-2"
      >
        ← zpět
      </Link>
      <form onSubmit={handleSubmit(handleAddPost)} className="profile-form">
        <h1 className="text-2xl w-full text-center font-[500]">
          Přidat článek
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
        <div className="flex gap-4 justify-center">
          <p className="text-lg">Okamžitě publikovat</p>
          <input
            type="checkbox"
            onClick={() => {
              setPublish(!publish);
            }}
            {...register("published")}
          />
        </div>
        <button className="bg-main-yellow w-fit text-xl px-2 py-1 rounded-md mx-auto drop-shadow-sm">
          {publish ? "Publikovat" : "Uložit koncept"}
        </button>
      </form>
    </>
  );
};

export default CreatePostForm;
