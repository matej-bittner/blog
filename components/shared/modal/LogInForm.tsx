import React from "react";
import { z } from "zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { signIn } from "next-auth/react";
import { usePathname, useRouter } from "next/navigation";
import { toast } from "@/components/ui/use-toast";

const schema = z.object({
  email: z.string().email({ message: "Zadaný e-mail není ve správném tvaru" }),
  password: z
    .string()
    .min(8, { message: "Heslo musí být alespoň 8 znaků dlouhé" }),
});

type FormFields = z.infer<typeof schema>;
const LogInForm = () => {
  const pathname = usePathname();
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormFields>({
    resolver: zodResolver(schema),
  });
  const handleLogIn: SubmitHandler<FormFields> = async (loginData) => {
    await signIn("credentials", {
      ...loginData,
      redirect: false,
    }).then(({ ok, error }: any) => {
      if (ok) {
        router.push(pathname);
        router.refresh();
        toast({
          title: "Vítej!",
          description: "Přihlášení proběhlo v pořádku",
        });
      } else {
        toast({
          title: "Chyba",
          description: `Oops! ${error}`,
          variant: "destructive",
        });
      }
    });
  };

  return (
    <form
      onSubmit={handleSubmit(handleLogIn)}
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
        className="bg-main-yellow rounded-xl min-h-[50px] w-full text-2xl"
      >
        Přihlásit
      </button>
    </form>
  );
};

export default LogInForm;
