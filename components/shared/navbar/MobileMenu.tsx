"use client";
import React, { useEffect, useState } from "react";
import { RiAccountCircleFill, RiArrowDownDoubleFill } from "react-icons/ri";
import Link from "next/link";
import { useSession } from "next-auth/react";

const MobileMenu = () => {
  const [openMobile, setOpenMobile] = useState(false);
  const session = useSession();
  // console.log(session);
  useEffect(() => {
    function handleResize() {
      setOpenMobile(false);
    }

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div className="">
      <RiArrowDownDoubleFill
        onClick={() => setOpenMobile(!openMobile)}
        className={`h-fit w-[60px] md:hidden transition ${openMobile && "-rotate-180"}`}
      />
      <div
        className={`md:hidden z-10 w-full bg-orange-400 absolute flex items-center justify-center left-0 transition-all duration-300 top-[85px] md:top-[75px] ${!openMobile ? "h-0" : "h-[400px] max-h-[calc(100vh-85px)] md:max-h-[calc(100vh-75px)]"} `}
      >
        <div
          className={`text-3xl w-fit text-center gap-4 ease-in flex-col flex  ${!openMobile ? " opacity-0" : "opacity-100 transition-all duration-500 "}`}
        >
          <Link href="/">O Nás</Link>
          <Link href="/">Kontakt</Link>
          <Link
            className="bg-[#05B857] px-3 py-2 rounded-full text-white"
            href="/"
          >
            Sledovat
          </Link>
          {session.status === "authenticated" && (
            <Link href="/profile" className="flex items-center gap-2">
              <RiAccountCircleFill size="32" />
              <p>Profil</p>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default MobileMenu;
