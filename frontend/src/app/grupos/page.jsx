"use client"

import Grupo from "./Grupo/Grupo"
import { useState } from "react"
import ModalEliminarGrupo from "./ModalEliminarGrupo/ModalEliminarGrupo"
import ModalCrearGrupo from "./Grupo/ModalCrearGrupo/ModalCrearGrupo"


export default function GruposPage(){
    const [eliminarAbierto, setEliminarAbierto] = useState(false)
    const [crearAbierto, setCrearAbierto] = useState(false)

    return(
        <>
        {   eliminarAbierto && <ModalEliminarGrupo
                callback={() => setEliminarAbierto(!eliminarAbierto)}
        /> }

        {   crearAbierto && <ModalCrearGrupo
                callback={() => setCrearAbierto(!crearAbierto)}
        /> }

        <div className="flex flex-col text-[#0C0563] justify-between items-center gap-8 pl-40 size-full bg-gray-100">
            <div className="flex flex-row w-full justify-start pt-10">
                <p className="text-start text-5xl">Grupos</p>
            </div>
            <div className="flex flex-col items-center w-full justify-center pb-20 gap-6">
                <div className="flex flex-col w-full">
                    <div className="flex flex-row justify-between items-center w-4/5">
                        <div className="flex w-full"><span className="text-2xl">Nombre</span></div>
                        <div className="flex w-full justify-start ml-12"><span className="text-xl">Miembros</span></div>
                        <button type="button" 
                            className="flex justify-center items-center text-center bg-[#0C0563] text-white w-1/4 h-10 text-4xl rounded-2xl pb-2" 
                            onClick={() => setCrearAbierto(true)}>
                                +
                        </button>
                    </div>
                </div>
                <div className="flex flex-col w-full justify-center items-start">
                        <Grupo  
                            abrirEliminar={() => setEliminarAbierto(true)}
                        />
                        <Grupo  
                            abrirEliminar={() => setEliminarAbierto(true)}
                        />
                        <Grupo  
                            abrirEliminar={() => setEliminarAbierto(true)} 
                        />
                        <Grupo  
                            abrirEliminar={() => setEliminarAbierto(true)} 
                        />
                </div>
            </div>
        </div>
        </>
    )
}