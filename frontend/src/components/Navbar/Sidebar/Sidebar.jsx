"use client"

import "@/styles/forms.css";
import "./Sidebar.css";
import ItemSidebar from "./ItemSidebar/ItemSidebar";
import CerrarSesion from "./ItemSidebar/CerrarSesion";

export default function Sidebar( { abierto, cerrarSide } ){

    return(
        <div className={`sidebar ${abierto ? "abierto" : ""}`} >
            <div onClick={cerrarSide}>
                <ItemSidebar href="/inicio" icon="home" text="Inicio" />
            </div>
            <div onClick={cerrarSide}>
                <ItemSidebar href="/listas" icon="format_list_bulleted" text="Listas" />
            </div>
            <div onClick={cerrarSide}>
                <ItemSidebar href="/cuenta" icon="person" text="Cuenta" />
            </div>
            <div onClick={cerrarSide}>
                <ItemSidebar href="/amigos" icon="group" text="Amigos" />
            </div>
            <div onClick={cerrarSide}>
                <ItemSidebar href="/grupos" icon="extension" text="Grupos" />
            </div>
                <CerrarSesion cerrarSide={cerrarSide} />
        </div>
    )
}