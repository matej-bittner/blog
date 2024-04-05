"use client";
import React from "react";
import { CgLogOut } from "react-icons/cg";
import { signOut } from "next-auth/react";
import { redirect, useRouter } from "next/navigation";
import Link from "next/link";

import { RiAccountCircleFill } from "react-icons/ri";

const SignOut = () => {
  const router = useRouter();
  const signOutFc = async () => {
    await signOut({ redirect: false });
    router.push("/");
    router.refresh();
  };
  return (
    <>
      <CgLogOut
        onClick={() => signOutFc()}
        className="h-fit w-[60px] md:hidden cursor-pointer"
      />
      <div className="flex gap-4 items-center">
        <p
          onClick={() => signOutFc()}
          className="text-main-green text-xl hidden md:block cursor-pointer"
        >
          Odhlásit
        </p>
        <Link className="hidden md:flex items-center" href="/profile">
          <RiAccountCircleFill size="32" />
        </Link>
      </div>
    </>
  );
};

export default SignOut;
