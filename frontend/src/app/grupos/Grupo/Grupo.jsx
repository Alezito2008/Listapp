"use client"

import './grupo.css'

import { useState } from "react"
import useClickOutside from "@/hooks/useClickOutside/useClickOutside"
import { useRef } from "react"
import Opciones from "@/components/Opciones/Opciones"

export default function Grupo({name="Grupo" ,abrirEliminar, abrirCompartir}){
    const [opcionesAbiertas, setOpcionesAbiertas] = useState(false)

    const opcionesRef = useRef(null)
    useClickOutside(opcionesRef, () => setOpcionesAbiertas(false));
    return(
        <div className="grupo">
            <div className='w-full pl-8'>
                <button type="button" className="flex flex-row items-center gap-12">
                    <span className="material-symbols-outlined material-3rem">group</span>
                    <span>{name}</span>
                </button>
            </div>
            <span>@usuario1, @usuario2</span>
            <div className='w-full flex justify-end pr-8'>
                <Opciones opcionesAbiertas={opcionesAbiertas} 
                    opcionesRef={opcionesRef} abrirOpciones={() => setOpcionesAbiertas(!opcionesAbiertas)}
                    callback1={abrirEliminar} text1="Eliminar" icon1="delete" 
                    callback2={abrirCompartir} text2="Compartir" icon2="person_add"
                />
            </div>
            </div>
    )
}