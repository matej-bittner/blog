import React from "react";
import { z } from "zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import axios from "axios";
import { toast } from "@/components/ui/use-toast";

const schema = z.object({
  name: z.string().min(3, { message: "Jméno musí být alespoň 3 znaky dlouhé" }),
  surname: z
    .string()
    .min(2, { message: "Příjmení musí být alespoň 2 znaky dlouhé" }),
  email: z.string().email({ message: "Zadaný e-mail není ve správném tvaru" }),
  password: z
    .string()
    .min(8, { message: "Heslo musí být alespoň 8 znaků dlouhé" }),
});

type FormFields = z.infer<typeof schema>;
const RegisterModal = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormFields>({
    resolver: zodResolver(schema),
  });
  const handleRegister: SubmitHandler<FormFields> = async (registerData) => {
    try {
      await axios.post("/api/register", registerData);
      reset();
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
    <form
      onSubmit={handleSubmit(handleRegister)}
      className="w-full flex flex-col gap-2"
    >
      <div className="flex flex-col">
        <label className="text-base pl-4">Jméno</label>
        <input
          type="text"
          className="min-h-[50px] rounded-xl border-2 border-main-green outline-none pl-4"
          {...register("name")}
        />
        {errors.name && (
          <div className="text-red-500">{errors.name.message}</div>
        )}
      </div>
      <div className="flex flex-col">
        <label className="text-base pl-4">Příjmení</label>
        <input
          type="text"
          className="min-h-[50px] rounded-xl border-2 border-main-green outline-none pl-4"
          {...register("surname")}
        />
        {errors.surname && (
          <div className="text-red-500">{errors.surname.message}</div>
        )}
      </div>
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
      <div className="flex flex-col">
        <label className="text-base pl-4">Heslo</label>
        <input
          type="password"
          className="min-h-[50px] rounded-xl border-2 border-main-green outline-none pl-4"
          {...register("password")}
        />
        {errors.password && (
          <div className="text-red-500">{errors.password.message}</div>
        )}
      </div>

      <button
        type="submit"
        className="bg-main-yellow rounded-xl min-h-[50px] w-full text-2xl mt-2"
      >
        Registrovat
      </button>
    </form>
  );
};

export default RegisterModal;
