"use client"

import Link from "next/link";
import "./Sidebar.css";
import CerrarSesion from "./CerrarSesion";
import { useState } from "react";

export default function Sidebar(){
    const [abierto, setAbierto] = useState(true);

    function abrirMenu() {
        setAbierto(!abierto);
    }
    return(
        <>
            <div className="menu-logo">
                <button onClick={abrirMenu}>
                <span className="material-symbols-outlined">menu</span>
                </button>
            </div>
        <div className={`sidebar ${abierto ? 'abierto' : ''}`}>
            <button className="back" onClick={abrirMenu}>
                <span className="material-symbols-outlined">undo</span>
            </button>
            <div className="inicio">
                <Link href="/inicio">
                <span className="material-symbols-outlined">home</span>
                Inicio
                </Link>
            </div>
            <div>
                <Link href="/listas">
                <span className="material-symbols-outlined">format_list_bulleted</span>
                Listas
                </Link>
            </div>
            <div>
                <Link href="/cuenta">
                <span className="material-symbols-outlined">person</span>
                Cuenta
                </Link>
            </div>
            <div>
                <Link href="/ajustes">
                <span className="material-symbols-outlined">settings</span>
                Ajustes
                </Link>
            </div>
            <div className="logout">
                <CerrarSesion />
            </div>
        </div>
        </>
    )
}