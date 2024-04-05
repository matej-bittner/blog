import React from "react";
import Image from "next/image";

const Hero = () => {
  return (
    <div className="bg-[#FFEB34] w-full h-[500px] lg:h-[600px] hidden md:block">
      <div className="px-2 sm:px-4 max-w-[1440px] mx-auto md:px-8 lg:px-12 xl:px-14 h-full w-full flex">
        <div className="text-black w-3/5 flex flex-col items-center justify-center gap-12">
          <p className="text-3xl">
            <span className="underline">“Blog”</span>je místo kde se můžete
            dozvědět něco nového, vzdělávat a spojit se s lidmi.
          </p>
          <p className="text-xl">
            Jednoduchá cesta, jak přidat vlastní článek.{" "}
          </p>
        </div>
        <div className="w-2/5  relative">
          <Image src="/logo.svg" alt="" fill />
        </div>
      </div>
    </div>
  );
};

export default Hero;
