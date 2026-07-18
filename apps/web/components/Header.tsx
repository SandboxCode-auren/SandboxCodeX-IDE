"use client";

import MenuIcon from "./icons/MenuIcon";
import { useMenu } from "./navigation/MenuContext";

export default function Header() {

  const { toggle } = useMenu();

  return (
    <header
      style={{
        height: 64,
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "0 20px",
        borderBottom: "1px solid #393939",
        background: "#161616",
        position: "sticky",
        top: 0,
        zIndex: 20,
      }}
    >
      <button
        onClick={toggle}
        style={{
          width: 40,
          height: 40,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          background: "transparent",
          border: "1px solid #393939",
          cursor: "pointer",
        }}
      >
        <MenuIcon />
      </button>

      <strong>SandboxCodeX</strong>

      <div style={{ width: 40 }} />
    </header>
  );
}
