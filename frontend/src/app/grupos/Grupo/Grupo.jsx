"use client"

import { useState } from "react"
import useClickOutside from "@/hooks/useClickOutside/useClickOutside"
import { useRef } from "react"
import Opciones from "@/components/Opciones/Opciones"

export default function Grupo({name="Grupo" ,abrirEliminar, abrirCompartir}){
    const [opcionesAbiertas, setOpcionesAbiertas] = useState(false)

    const opcionesRef = useRef(null)
    useClickOutside(opcionesRef, () => setOpcionesAbiertas(false));
    return(
        <div className="flex flex-row w-4/5 bg-white rounded-xl m-2 ml-0 h-12 items-center justify-between p-4">
            <button type="button" className="flex flex-row items-center gap-12">
                <span className="material-symbols-outlined material-3rem">group</span>
                <span>{name}</span>
            </button>
            <span>@usuario1, @usuario2</span>
                <Opciones opcionesAbiertas={opcionesAbiertas} 
                    opcionesRef={opcionesRef} abrirOpciones={() => setOpcionesAbiertas(!opcionesAbiertas)}
                    callback1={abrirEliminar} text1="Eliminar" icon1="delete" 
                    callback2={abrirCompartir} text2="Compartir" icon2="person_add"
                    />
            </div>
    )
}