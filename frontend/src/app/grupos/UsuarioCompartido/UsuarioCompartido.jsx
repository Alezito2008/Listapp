import Opciones from "@/components/Opciones/Opciones"
import "@/styles/iconSize.css"
import { useState } from "react"
import { useRef } from "react"

export default function UsuarioCompartido({tag}){
    const [opcionesAbiertas, setOpcionesAbiertas] = useState(false)

    const opcionesRef = useRef(null)

    return(
        <div className="flex flex-row items-center justify-between w-full px-4">
            <div className="flex flex-row gap-2 items-center">
                <span className="material-symbols-outlined material-2rem">account_circle</span>
                <p>@{tag}</p>
            </div>
            <Opciones 
                opcionesAbiertas={opcionesAbiertas} 
                abrirOpciones={() => setOpcionesAbiertas(!opcionesAbiertas)} opcionesRef={opcionesRef} 
            />
        </div>
    )
}