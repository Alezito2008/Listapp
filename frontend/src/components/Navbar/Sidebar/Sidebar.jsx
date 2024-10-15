"use client"

import "@/styles/forms.css";
import Link from "next/link";
import "./Sidebar.css";
import CerrarSesion from "./CerrarSesion";

export default function Sidebar( { abierto, cerrarSide } ){

    return(
        <div className={`sidebar ${abierto ? "abierto" : ""}`} >
            <div className="inicio pt-4" onClick={cerrarSide}>
                <Link href="/inicio">
                <span className="material-symbols-outlined">home</span>
                Inicio
                </Link>
            </div>
            <div>
                <Link href="/listas" onClick={cerrarSide}>
                <span className="material-symbols-outlined">format_list_bulleted</span>
                Listas
                </Link>
            </div>
            <div>
                <Link href="/cuenta" onClick={cerrarSide}>
                <span className="material-symbols-outlined">person</span>
                Cuenta
                </Link>
            </div>
            <div>
                <Link href="/ajustes" onClick={cerrarSide}>
                <span className="material-symbols-outlined">settings</span>
                Ajustes
                </Link>
            </div>
            <div>
                <Link href="/amigos" onClick={cerrarSide}>
                    <span className="material-symbols-outlined">group</span>
                    Amigos
                </Link>
            </div>
            <div>
                <Link href="/grupos" onClick={cerrarSide}>
                    <span className="material-symbols-outlined">extension</span>
                    Grupos
                </Link>
            </div>
            <div className="logout" onClick={cerrarSide}>
                <CerrarSesion />
            </div>
        </div>
    )
}