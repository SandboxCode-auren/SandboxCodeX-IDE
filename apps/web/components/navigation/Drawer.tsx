"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect } from "react";
import { useMenu } from "./MenuContext";

const menus = [
  { title: "Workspace", href: "/" },
  { title: "Repositories", href: "/repositories" },
  { title: "Runtime", href: "/runtime" },
  { title: "Console", href: "/console" },
  { title: "Timeline", href: "/timeline" },
  { title: "Artifacts", href: "/artifacts" },
  { title: "Settings", href: "/settings" },
  { title: "Login", href: "/login" },
];

export default function Drawer() {
  const pathname = usePathname();
  const { open, setOpen } = useMenu();

  useEffect(() => {
    const esc = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };

    window.addEventListener("keydown", esc);
    return () => window.removeEventListener("keydown", esc);
  }, [setOpen]);

  return (
    <>
      {open && (
        <div
          onClick={() => setOpen(false)}
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(0,0,0,.45)",
            zIndex: 998,
          }}
        />
      )}

      <aside
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          bottom: 0,
          width: 290,
          background: "#161616",
          borderRight: "1px solid #393939",
          transform: open ? "translateX(0)" : "translateX(-100%)",
          transition: "transform .22s ease",
          zIndex: 999,
          overflowY: "auto",
        }}
      >
        <div
          style={{
            height: 64,
            display: "flex",
            alignItems: "center",
            padding: "0 22px",
            borderBottom: "1px solid #393939",
            fontWeight: 700,
          }}
        >
          SANDBOXCODEX
        </div>

        {menus.map((item) => {
          const active = pathname === item.href;

          return (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setOpen(false)}
              style={{
                display: "flex",
                alignItems: "center",
                height: 54,
                padding: "0 22px",
                textDecoration: "none",
                color: active ? "#78A9FF" : "#F4F4F4",
                borderLeft: active
                  ? "4px solid #0F62FE"
                  : "4px solid transparent",
                background: active
                  ? "rgba(15,98,254,.12)"
                  : "transparent",
              }}
            >
              {item.title}
            </Link>
          );
        })}
      </aside>
    </>
  );
}
