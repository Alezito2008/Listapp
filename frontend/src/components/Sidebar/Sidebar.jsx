"use client"

import Link from "next/link";
import "./Sidebar.css";
import CerrarSesion from "./CerrarSesion";
import { useState } from "react";

//falta agregar overlay + click afuera de sidebar = cerrar
export default function Sidebar(){
    const [abierto, setAbierto] = useState(false);

    function abrirMenu() {
        setAbierto(!abierto);
    }
    return(
        <div className="sidebar-parent">
                <button className="menu-logo" onClick={abrirMenu}>
                <span className="material-symbols-outlined">menu</span>
                </button>
           {/* <div className={abierto ? "overlay" : ""}></div> */}
        <div className={`sidebar ${abierto ? 'abierto' : ''}`}>
            <div className="inicio">
                <Link href="/inicio" onClick={abrirMenu}>
                <span className="material-symbols-outlined">home</span>
                Inicio
                </Link>
            </div>
            <div>
                <Link href="/listas" onClick={abrirMenu}>
                <span className="material-symbols-outlined">format_list_bulleted</span>
                Listas
                </Link>
            </div>
            <div>
                <Link href="/cuenta" onClick={abrirMenu}>
                <span className="material-symbols-outlined">person</span>
                Cuenta
                </Link>
            </div>
            <div>
                <Link href="/ajustes" onClick={abrirMenu}>
                <span className="material-symbols-outlined">settings</span>
                Ajustes
                </Link>
            </div>
            <div className="logout" onClick={abrirMenu}>
                <CerrarSesion />
            </div>
        </div>
        </div>
    )
}