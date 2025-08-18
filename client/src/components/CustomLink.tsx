import React from "react";
import { Link, type NavLinkProps } from "react-router-dom";

type LinkProps = {
  children: React.ReactNode;
  to: string;
} & NavLinkProps;

export const CustomLink = ({ to, children }: LinkProps) => {
  return (
    <Link
      to={to}
      className="text-red-400 transition-colors hover:text-blue-500"
    >
      {children}
    </Link>
  );
};
