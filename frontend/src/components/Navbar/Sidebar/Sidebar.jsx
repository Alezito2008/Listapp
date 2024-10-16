"use client"

import "@/styles/forms.css";
import "./Sidebar.css";
import CerrarSesion from "./CerrarSesion";
import ItemSidebar from "./ItemSidebar/ItemSidebar";

export default function Sidebar( { abierto, cerrarSide } ){

    return(
        <div className={`sidebar ${abierto ? "abierto" : ""}`} >
            <div className="pt-4" onClick={cerrarSide}>
                <ItemSidebar href="/inicio" icon="home" text="Inicio" callback={cerrarSide}/>
            </div>
            <div>
                <ItemSidebar href="/listas" icon="format_list_bulleted" text="Listas" callback={cerrarSide}/>
            </div>
            <div>
                <ItemSidebar href="/cuenta" icon="person" text="Cuenta" callback={cerrarSide}/>
            </div>
            <div>
                <ItemSidebar href="/amigos" icon="group" text="Amigos" callback={cerrarSide}/>
            </div>
            <div>
                <ItemSidebar href="/grupos" icon="extension" text="Grupos" callback={cerrarSide}/>
            </div>
            <div className="logout" onClick={cerrarSide}>
                <CerrarSesion />
            </div>
        </div>
    )
}