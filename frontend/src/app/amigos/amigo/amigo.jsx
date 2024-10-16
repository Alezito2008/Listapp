"use client"

import { useState } from "react"
import useClickOutside from "@/hooks/useClickOutside/useClickOutside"
import { useRef } from "react"

export default function Amigo({abrirPerfil, abrirEliminar, abrirBloquear}){
    const [opcionesAbiertas, setOpcionesAbiertas] = useState(false)

    const opcionesRef = useRef(null)
    useClickOutside(opcionesRef, () => setOpcionesAbiertas(false));
    return(
        <div className="flex flex-row w-4/5 bg-white rounded-xl m-2 ml-0 h-12 items-center justify-between p-2">
            <button type="button" className="flex flex-row items-center gap-12" onClick={abrirPerfil} >
                <span className="material-symbols-outlined notangrande">account_circle</span>
                <span>Amigo</span>
            </button>
            <span>@usuario</span>
            <div ref={opcionesRef}>
                <button type="button" onClick={() => setOpcionesAbiertas(!opcionesAbiertas)}><img src="/options.svg" alt="opciones" /></button>
                { opcionesAbiertas && 
                        <div className="menuOpciones">

                        <button type="button" onClick={abrirEliminar}>
                            <span className="material-symbols-outlined">delete</span>
                            <span>Eliminar</span>
                        </button>

                        <button type="button" onClick={abrirBloquear}>
                            <span className="material-symbols-outlined">block</span>
                            <span>Bloquear</span>
                        </button>

                    </div>
                }
            </div>
        </div>
    )
}