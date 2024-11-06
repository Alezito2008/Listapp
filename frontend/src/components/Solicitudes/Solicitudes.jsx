"use client"
import "@/styles/iconSize.css"
import { useState } from "react"
import MenuSolicitudes from "./MenuSolicitudes/MenuSolicitudes"
import useClickOutside from "@/hooks/useClickOutside/useClickOutside"
import { useRef } from "react"

export default function Solicitudes(){
    const [menuAbierto, setMenuAbierto] = useState(false)

    return(
        <>
        <button type="button" onClick={() => setMenuAbierto(!menuAbierto)}>
            <img src="/solicitudes.svg" alt="solicitudes" className="size-[2.5rem] mt-1" />
        </button>

        {   menuAbierto && <MenuSolicitudes

        /> }
        </>
    )
}