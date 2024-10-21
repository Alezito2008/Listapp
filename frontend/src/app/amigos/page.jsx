"use client"

import Amigo from "./Amigo/Amigo"
import { useState } from "react"
import ModalPerfil from "@/components/Modals/ModalPerfil/ModalPerfil"
import ModalEliminarAmigo from "./ModalEliminarAmigo/ModalEliminarAmigo"
import ModalBloquear from "./ModalBloquear/ModalBloquear"

export default function AmigosPage(){
    const [perfilAbierto, setPerfilAbierto] = useState(false)
    const [eliminarAbierto, setEliminarAbierto] = useState(false)
    const [bloquearAbierto, setBloquearAbierto] = useState(false)

    return(
        <>
        { perfilAbierto &&
            <ModalPerfil 
            callback={() => setPerfilAbierto(false)}
        />  }

        { eliminarAbierto &&
            <ModalEliminarAmigo
            callback={() => setEliminarAbierto(false)}
        />  }
        
        { bloquearAbierto &&
            <ModalBloquear
            callback={() => setBloquearAbierto(false)}
        />  }

        <div className="flex flex-col text-[#0C0563] justify-start items-center gap-8 pl-40 size-full bg-gray-100">
            <div className="flex flex-row gap-10 justify-start w-full pt-12">
                <div className="rounded-xl border-solid border-8 border-[#0C0563] size-40 flex justify-center items-center">
                    <span className="material-symbols-outlined material-10rem">person</span>
                </div>
                <div>
                    <p className="text-2xl">Placeholder</p>
                    <p className="text-lg">@placeholder</p>
                </div>
            </div>

            <div className="flex flex-col w-full justify-center items-start gap-4">
                <span className="text-3xl">Añadir amigos</span>
                <input type="text" placeholder="@           Buscar" className="w-4/5 outline-none rounded-lg pl-4 h-10"/>
            </div>
            <div className="flex flex-col w-full">
                <div className="flex flex-row justify-between items-center w-full">
                    <div className="flex w-full"><span className="text-2xl">Lista de amigos</span></div>
                    <div className="flex w-full justify-start mr-52"><span className="text-xl">Usuarios</span></div>
                </div>
                <div className="flex flex-col w-full justify-center items-start">
                    <Amigo abrirPerfil={() => setPerfilAbierto(true)} 
                        abrirEliminar={() => setEliminarAbierto(true)} abrirBloquear={() => setBloquearAbierto(true)} 
                    />
                    <Amigo abrirPerfil={() => setPerfilAbierto(true)} 
                        abrirEliminar={() => setEliminarAbierto(true)} abrirBloquear={() => setBloquearAbierto(true)} 
                    />
                </div>
            </div>
        </div>
        </>
    )
}