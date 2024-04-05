import React from "react";
import Link from "next/link";

const Footer = () => {
  return (
    <footer className="h-[250px] w-full bg-main-yellow border-t-2 border-black">
      <div className="relative px-2 sm:px-4 max-w-[1440px] mx-auto md:px-8 lg:px-12 xl:px-14 h-full w-full flex flex-col items-center justify-center space-y-2">
        <div className="sm:absolute sm:top-[50px] sm:left-[50px] md:left-[75px] lg:left-[100px] xl:left-[140px] 2xl:left-[90px]">
          <img src="/logo.svg" alt="" className="w-[70px]" />
          <p className="hidden sm:block">blog </p>
        </div>
        <div className="flex flex-col w-fit  text-lg sm:text-xl md:text-2xl pb-2 text-center sm:text-left">
          <Link href="">Novinky</Link>
          <Link href="">Zprávy</Link>
          <Link href="">Sport</Link>
          <Link href="">Elektronika</Link>
        </div>
        <div className="text-lg sm:text-xl md:text-2xl">
          <p>E-mail - blog@kontakt.cz</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
