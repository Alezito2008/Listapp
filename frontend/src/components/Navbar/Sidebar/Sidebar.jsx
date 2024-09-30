"use client"

import "@/styles/forms.css";
import Link from "next/link";
import "./Sidebar.css";
import CerrarSesion from "./CerrarSesion";

export default function Sidebar( { abierto } ){

    return(
        <div className={`sidebar ${abierto ? "abierto" : ""}`} >
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
    )
}