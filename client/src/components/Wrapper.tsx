import React from "react";
import { Footer } from "@/components";

export const Wrapper: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  return (
    <div className="w-screen h-screen flex items-end relative">
      <div className="flex flex-col items-center w-full h-[calc(100%-55px)] pb-15 overflow-auto">
        {children}
        <Footer />
      </div>
    </div>
  );
};
