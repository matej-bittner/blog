import React from "react";
import Link from "next/link";
import { FaPlus } from "react-icons/fa";
import { MdOutlineAutoGraph } from "react-icons/md";
import { getCurrentUser } from "@/lib/session";
const ProfileLeft = async () => {
  const user = await getCurrentUser();
  if (!user) return null;
  const date = new Date(user.createdAt);
  const formattedDate = date.toLocaleDateString("cs-CZ", {
    year: "numeric",
    month: "numeric",
  });

  return (
    <div className="w-full h-fit pb-8 sm:pb-0 sm:h-[600px] flex flex-col items-center pt-4 sm:pt-[7vh]">
      <img
        src="/1.jpg"
        alt=""
        className="object-cover h-[130px] aspect-square rounded-full"
      />
      <h1 className="text-2xl pt-2 sm:pt-6">
        {user.name + " " + user.surname}
      </h1>
      {user.description && (
        <p className="text-xl font-light text-center">{user.description}</p>
      )}
      <p className="hidden sm:block text-xl font-light pt-8 pb-12">
        Člen od: <span className="font-normal">{formattedDate}</span>
      </p>
      <Link
        href="?profile=edit"
        className="text-xl px-2 py-1 bg-main-yellow rounded-lg mt-4 sm:mt-0 drop-shadow-sm"
      >
        Editovat
      </Link>
      <div className="flex sm:flex-col gap-5 sm:gap-4 sm:mt-20 mt-10">
        <Link href="?profile=add" className="flex gap-2 ">
          <p className="text-xl sm:w-[130px]">Přidat článek</p>
          <FaPlus size="30" />
        </Link>
        <Link href="?profile=stats" className="flex gap-2">
          <p className="text-xl sm:w-[130px]">Statistiky</p>
          <MdOutlineAutoGraph size="30" />
        </Link>{" "}
        <Link href="?profile=posts" className="flex gap-2">
          <p className="text-xl sm:w-[130px]">Moje články</p>
          <MdOutlineAutoGraph size="30" />
        </Link>
      </div>
    </div>
  );
};

export default ProfileLeft;
