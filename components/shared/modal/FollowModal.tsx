"use client";
import React, { useEffect } from "react";
import { useSession } from "next-auth/react";
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "@/components/ui/use-toast";
import axios from "axios";
import Link from "next/link";

const schema = z.object({
  email: z.string().email({ message: "Zadaný e-mail není ve správném tvaru" }),
  accept: z.boolean(),
});

type FormField = z.infer<typeof schema>;

const FollowModal = () => {
  const session = useSession();
  if (session.status === "unauthenticated")
    return (
      <div className=" w-full h-fit space-y-4">
        <p className="text-center">
          Pokud se chceš přihlásit k odběru novinek a informací o přidání nových
          článků, nejprve se přihlaš
        </p>
        <div className="flex flex-row gap-4">
          <Link
            href="?modal=register"
            className="bg-main-yellow rounded-xl min-h-[50px] w-full text-xl flex items-center justify-center"
          >
            Registrovat
          </Link>
          <Link
            href="?modal=login"
            className="bg-main-yellow rounded-xl min-h-[50px] w-full text-xl flex items-center justify-center"
          >
            Přihlásit
          </Link>
        </div>
      </div>
    );

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormField>({ resolver: zodResolver(schema) });

  useEffect(() => {
    if (session.status === "authenticated") {
      reset({
        // @ts-ignore
        email: session.data.user.email,
      });
    }
  }, [session]);

  const handleFollow: SubmitHandler<FormField> = async (followData) => {
    console.log(followData);
    if (!followData.accept) {
      toast({
        title: "Potvrď souhlas",
        description:
          "Pokud chceš dostávat informaci o novinkách, musí být zaškrtnutý souhlas",
        variant: "destructive",
      });
    }
    if (session.status === "authenticated") {
      if (session.data.user.email !== followData.email) {
        toast({
          title: "Email se neshoduje",
          description:
            "Pokud chceš novinky zasílat na jiný email, než se kterým si se registroval, musíš se nejdříve odhlásit",
          variant: "destructive",
        });
      }

      const userId = session.data.user.id;
      const allFollowData = Object.assign({}, followData, { userId });
      try {
        await axios.put("/api/subscribe", allFollowData);
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <>
      <p className="text-center">
        Přihlašte se k odběru novinek a informací o přidání nových článků
      </p>
      <form
        onSubmit={handleSubmit(handleFollow)}
        className="w-full flex flex-col gap-4"
      >
        <div className="flex flex-col">
          <label className="text-base pl-4">E-mail</label>
          <input
            type="email"
            className="min-h-[50px] rounded-xl border-2 border-main-green outline-none pl-4"
            {...register("email")}
          />
          {errors.email && (
            <div className="text-red-500">{errors.email.message}</div>
          )}
        </div>
        <div className="flex gap-6 w-[95%] mx-auto items-center">
          <input
            type="checkbox"
            className="scale-[1.3] outline-none "
            {...register("accept")}
          />
          <label>
            Souhlasím ze zasílám novinek a jsem majitel zadaného emailu.
          </label>
        </div>
        <button
          type="submit"
          className="bg-main-yellow rounded-xl min-h-[50px] w-full text-2xl"
        >
          Přihlásit k odběru
        </button>
      </form>
    </>
  );
};

export default FollowModal;
