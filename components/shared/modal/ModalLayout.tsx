"use client";
import React from "react";
import Link from "next/link";
import { IoMdClose } from "react-icons/io";
import { usePathname, useSearchParams } from "next/navigation";
import LogInForm from "@/components/shared/modal/LogInForm";
import RegisterModal from "@/components/shared/modal/RegisterModal";
import FollowModal from "@/components/shared/modal/FollowModal";

// import { useSession } from "next-auth/react";

const ModalLayout = () => {
  const pathname = usePathname();
  const search = useSearchParams();
  const modal = search.get("modal");

  // const session = useSession();
  // console.log(session.data?.user?.email);

  if (!modal) return null;
  return (
    <div className="fixed inset-0 w-full h-screen z-10 backdrop-blur-[2px] flex items-center justify-center">
      <div className="h-fit min-w-[300px] max-w-[500px] w-[85%] sm:w-[400px] rounded-xl bg-white border-2 py-4 px-6 flex flex-col gap-4">
        {/*<div className="min-h-[500px] h-[60%] sm:h-[500px] min-w-[300px] max-w-[500px] w-[85%] sm:w-[400px] rounded-xl bg-[#D9D9D9] border-2 p-2 flex flex-col gap-4">*/}
        <h1 className="text-3xl text-center underline">
          {modal === "follow" ? "Sledovat" : "Vítej!"}
        </h1>
        <Link href={`${pathname}`} className="absolute ">
          <IoMdClose size="35" />
        </Link>
        {/*form*/}
        {modal === "login" && <LogInForm />}
        {modal === "register" && <RegisterModal />}
        {modal === "follow" && <FollowModal />}
        {modal === "register" || modal === "login" ? (
          <div className="flex items-center w-[90%] mx-auto h-[80px]">
            <hr className="border-2 border-black w-full" />
            <p className="text-xl px-4">Nebo</p>
            <hr className="border-2 border-black w-full" />
          </div>
        ) : null}

        {/*option*/}
        <div className="flex">
          {modal === "login" && (
            <Link
              href="?modal=register"
              className="bg-main-yellow rounded-xl min-h-[50px] w-full text-2xl flex items-center justify-center"
            >
              Registrovat
            </Link>
          )}
          {modal === "register" && (
            <Link
              href="?modal=login"
              className="bg-main-yellow rounded-xl min-h-[50px] w-full text-2xl flex items-center justify-center"
            >
              Přihlásit
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default ModalLayout;
