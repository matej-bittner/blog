import React from "react";
import Navbar from "@/components/shared/navbar/Navbar";
import Footer from "@/components/shared/Footer";

export default function MainLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main className="relative">
      <Navbar />
      <div className="min-h-[calc(100vh-85px)] md:min-h-[calc(100vh-75px)]">
        {children}
      </div>
      <Footer />
    </main>
  );
}
