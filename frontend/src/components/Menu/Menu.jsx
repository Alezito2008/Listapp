"use client";
import { useRef, useState } from "react";
import { usePathname } from "next/navigation";
import useClickOutside from "@/hooks/useClickOutside/useClickOutside";
import "@/app/globals.css";
import Navbar from "@/components/Navbar/Navbar";
import Sidebar from "@/components/Navbar/Sidebar/Sidebar";

export default function Menu() {
  const [overlayAbierto, setOverlayAbierto] = useState(false);
  const [abierto, setAbierto] = useState(false);
  const sidebarRef = useRef(null);

  const pathname = usePathname();

  function cerrarOverlay() {
    setOverlayAbierto(false);
    setAbierto(false);
  }

  useClickOutside(sidebarRef, cerrarOverlay);

  function abrirSide() {
    setAbierto((prev) => !prev);
    setOverlayAbierto((prev) => !prev);
  }

  const hideNavbar = pathname === "/register" || pathname === "/login";

  return (
    <div>
      <div className={overlayAbierto ? "overlay" : "hidden"} onClick={cerrarOverlay}></div>
      {!hideNavbar && (
        <Navbar abrirSide={abrirSide}>
          <Sidebar ref={sidebarRef} abierto={abierto} cerrarSide={abrirSide} />
        </Navbar>
      )}
    </div>
  );
}
