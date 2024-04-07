import React from "react";

import { CgLogIn } from "react-icons/cg";
import Link from "next/link";
import MobileMenu from "@/components/shared/navbar/MobileMenu";
import SignOut from "@/components/shared/navbar/SignOut";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
const Navbar = async () => {
  // const session = false;

  // server site render session
  const session = await getServerSession(authOptions);
  // console.log(session?.user?.email);
  return (
    <nav className="relative h-[85px] md:h-[75px] bg-main-yellow md:bg-white px-2 flex items-center justify-between sm:px-4 max-w-[1440px] mx-auto md:px-8 lg:px-12 xl:px-14">
      <div className="md:order-2 md:flex-1 md:ml-14 lg:ml-24">
        {/*<RiArrowDownDoubleFill className="h-fit w-[60px] md:hidden" />*/}
        <MobileMenu />
        <div className="hidden text-xl md:flex  gap-6 md:items-center">
          <Link href="/">O Nás</Link>
          <Link href="/">Kontakt</Link>
          <Link
            className="bg-main-green px-3 py-2 rounded-full text-white"
            href="?modal=follow"
          >
            Sledovat
          </Link>
        </div>
      </div>
      <Link href="/" className="sm:flex sm:items-center sm:gap-4 md:order-1">
        <img src="/logo.svg" alt="" className="h-[50px]" />
        <h2 className="text-2xl hidden sm:block md:hidden lg:block">Blog.cz</h2>
      </Link>
      <div className="md:order-3">
        {!session ? (
          <>
            <Link href="?modal=login">
              <CgLogIn className="h-fit w-[60px] md:hidden" />
            </Link>
            <Link
              href="?modal=login"
              className="text-main-green text-xl hidden md:block"
            >
              Přihlásit
            </Link>
          </>
        ) : (
          <>
            <SignOut />

            {/*<CgLogOut className="h-fit w-[60px] md:hidden" />*/}
            {/*<p className="text-main-green text-xl hidden md:block">Odhlásit</p>*/}
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
