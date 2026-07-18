"use client";

import { useMenu } from "./MenuContext";

export default function Overlay() {

  const { open, setOpen } = useMenu();

  return (
    <div
      onClick={() => setOpen(false)}
      style={{
        position: "fixed",
        inset: 0,
        background: "rgba(0,0,0,.45)",
        opacity: open ? 1 : 0,
        visibility: open ? "visible" : "hidden",
        transition: "opacity .2s ease",
        zIndex: 998,
      }}
    />
  );
}
