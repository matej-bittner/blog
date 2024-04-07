"use client";
import React, { useEffect } from "react";
import Link from "next/link";
import { SubmitHandler, useForm } from "react-hook-form";
import { signOut, useSession } from "next-auth/react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useToast } from "@/components/ui/use-toast";

// schema
const schema = z.object({
  name: z
    .string()
    .min(3, { message: "Jméno musí být alespoň 3 znaky dlouhé" })
    .optional(),
  surname: z
    .string()
    .min(2, { message: "Příjmení musí být alespoň 2 znaky dlouhé" })
    .optional(),
  email: z
    .string()
    .email({ message: "Zadaný e-mail není ve správném tvaru" })
    .optional(),
  description: z
    .string()
    .max(35, { message: "Popis může být maximálně 35 znaků dlouhý" })
    .optional(),
});

// types
type FormFields = z.infer<typeof schema>;

const EditUserForm = () => {
  const session = useSession();

  const router = useRouter();
  const { toast } = useToast();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormFields>({
    resolver: zodResolver(schema),
  });

  useEffect(() => {
    if (session.status === "authenticated") {
      reset({
        // @ts-ignore
        name: session.data.user.name,
        surname: session.data.user.surname,
        // @ts-ignore
        email: session.data.user.email,
        // @ts-ignore
        description: session.data.user.description,
      });
    }
  }, [session]);

  const handleEditUser: SubmitHandler<FormFields> = async (editUserData) => {
    try {
      let userId = session.data?.user.id;
      const allData = Object.assign({}, editUserData, { userId });
      await axios.put("/api/edit-user", allData);
      await signOut({ redirect: false });
      router.push("/?modal=login");
      router.refresh();
      toast({
        title: "Změna byla úspěšná",
        description: "Po promítnutí je potřeba se znovu přihlásit",
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

  return (
    <>
      <Link
        href="/profile"
        className="absolute underline underline-offset-2 left-2"
      >
        ← zpět
      </Link>
      <form
        onSubmit={handleSubmit(handleEditUser)}
        action=""
        className="profile-form"
      >
        <h1 className="text-2xl w-full text-center font-[500]">
          Změnit kontaktní údaje
        </h1>
        <div className="flex flex-col">
          <label>Jméno:</label>
          <input type="text" {...register("name")} />
          {errors.name && (
            <div className="text-red-500">{errors.name.message}</div>
          )}
        </div>
        <div className="flex flex-col">
          <label>Příjmení:</label>
          <input type="text" {...register("surname")} />
          {errors.surname && (
            <div className="text-red-500">{errors.surname.message}</div>
          )}
        </div>
        <div className="flex flex-col">
          <label>Email:</label>
          <input type="email" {...register("email")} />
          {errors.email && (
            <div className="text-red-500">{errors.email.message}</div>
          )}
        </div>
        <div className="flex flex-col">
          <label>Popis (např. sportovec, novinář, redaktor,..):</label>
          <input type="text" {...register("description")} />
          {/*{errors.desc && (*/}
          {/*  <div className="text-red-500">{errors.desc.message}</div>*/}
          {/*)}*/}
        </div>

        <button className="bg-main-yellow w-fit text-xl px-2 py-1 rounded-md mx-auto drop-shadow-sm">
          Uložit změny
        </button>
      </form>
    </>
  );
};

export default EditUserForm;
