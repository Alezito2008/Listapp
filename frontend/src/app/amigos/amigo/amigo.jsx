"use client"

import { useState } from "react"
import useClickOutside from "@/hooks/useClickOutside/useClickOutside"
import { useRef } from "react"
import Opciones from "@/components/Opciones/Opciones"

export default function Amigo({abrirPerfil, abrirEliminar, abrirBloquear, nombre, tag, setInfoAmigo}){
    const [opcionesAbiertas, setOpcionesAbiertas] = useState(false)

    const opcionesRef = useRef(null)
    useClickOutside(opcionesRef, () => setOpcionesAbiertas(false));
    return(
        <div className="flex flex-row w-4/5 bg-white rounded-xl m-2 ml-0 h-12 items-center justify-between p-2" onClick={() => {setInfoAmigo({ nombre, tag })}}>
            <button type="button" className="flex flex-row items-center gap-12" onClick={() => {abrirPerfil()}} >
                <span className="material-symbols-outlined material-3rem">account_circle</span>
                <span>{nombre}</span>
            </button>
            <span>@{tag}</span>
                <Opciones opcionesAbiertas={opcionesAbiertas} opcionesRef={opcionesRef} abrirOpciones={() => setOpcionesAbiertas(!opcionesAbiertas)}
                    callback1={abrirEliminar} text1="Eliminar" icon1="delete" 
                    callback2={abrirBloquear} text2="Bloquear" icon2="block"
                    />
            </div>
    )
}