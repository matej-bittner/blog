import React from "react";
import Navbar from "@/components/shared/navbar/Navbar";
import Footer from "@/components/shared/Footer";
import ModalLayout from "@/components/shared/modal/ModalLayout";

export default function MainLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main className="relative">
      <Navbar />
      <ModalLayout />

      <div className="min-h-[calc(100vh-85px)] md:min-h-[calc(100vh-75px)]">
        {children}
      </div>
      <Footer />
    </main>
  );
}
