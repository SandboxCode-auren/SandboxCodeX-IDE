"use client";

import Link from "next/link";
import { ReactNode } from "react";

type Props = {
  children: ReactNode;
  href?: string;
};

export default function Button({
  children,
  href = "/login",
}: Props) {
  return (
    <Link
      href={href}
      style={{
        display: "block",
        width: "100%",
        textAlign: "center",
        background: "#0F62FE",
        color: "#fff",
        padding: "16px",
        borderRadius: 0,
        textDecoration: "none",
        fontWeight: 600,
        letterSpacing: 1,
        marginBottom: 28,
      }}
    >
      {children}
    </Link>
  );
}
