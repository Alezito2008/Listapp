"use client"

import Amigo from "./Amigo/Amigo"
import { useState } from "react"
import ModalPerfil from "@/components/Modals/ModalPerfil/ModalPerfil"
import ModalEliminarAmigo from "./ModalEliminarAmigo/ModalEliminarAmigo"
import ModalBloquear from "./ModalBloquear/ModalBloquear"
import Cargando from "@/components/Cargando/Cargando"
import { useEffect } from "react"
import ModalSolicitudOk from "./ModalSolicitudOk/ModalSolicitudOk"
import ModalSolicitudBad from "./ModalSolicitudBad/ModalSolicitudBad"

export default function AmigosPage(){
    const [perfilAbierto, setPerfilAbierto] = useState(false)
    const [eliminarAbierto, setEliminarAbierto] = useState(false)
    const [bloquearAbierto, setBloquearAbierto] = useState(false)
    const [cargando, setCargando] = useState(false)
    const [infoCuenta, setInfoCuenta] = useState({})
    const [añadirAmigo, setAñadirAmigo] = useState("")
    const [solicitudOkAbierto, setSolicitudOkAbierto] = useState(false)
    const [solicitudBadAbierto, setSolicitudBadAbierto] = useState(false)
    const [error, setError] = useState("")

    const obtenerInfo = async (signal) => {
        try {
            setCargando(true);
            const response = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/account`, {
                method: "GET",
                headers: { "Content-Type": "application/json" },
                credentials: "include",
                signal,
            });
            const data = await response.json();
            setInfoCuenta(data);
        } catch (error) {
            if (error.name !== "AbortError") {
                console.error("Fetch error:", error);
            }
        } finally {
            setCargando(false);
        }
    };

    const enviarSolicitud = async () => {
        setCargando(true)
        const response = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/enviarsolicitud`,{
            method: "POST",
            headers: {"Content-Type": "application/json"},
            credentials: "include",
            body: JSON.stringify({
                "tagAmigo": añadirAmigo
            })
        })
        const data = await response.json()
        if(!data.error){
            setSolicitudOkAbierto(true)
        }
        else {
            setError(data.error)
            setSolicitudBadAbierto(true)
        }
        setCargando(false)
    }

    useEffect(() => {
        const controller = new AbortController();
        obtenerInfo(controller.signal);

        return () => {
            controller.abort();
        };
    }, []); 

    return(
        <>

        { cargando && <Cargando />}


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

        {   solicitudOkAbierto && <ModalSolicitudOk
                callback={() => {setSolicitudOkAbierto(false); setAñadirAmigo("")}}
                amigo={añadirAmigo}
        /> }

        {   solicitudBadAbierto && <ModalSolicitudBad
                callback={() => {setSolicitudBadAbierto(false); setAñadirAmigo("")}}
                error={error}
        /> }

        <div className="flex flex-col text-[#0C0563] justify-start items-center gap-8 pl-40 size-full bg-gray-100">
            <div className="flex flex-row gap-10 justify-start w-full pt-12">
                <div className="rounded-xl border-solid border-8 border-[#0C0563] size-40 flex justify-center items-center">
                    <span className="material-symbols-outlined material-10rem">person</span>
                </div>
                <div>
                    <p className="text-2xl">{infoCuenta.nombre}</p>
                    <p className="text-lg">@{infoCuenta.tag}</p>
                </div>
            </div>

            <div className="flex flex-col w-full justify-center items-start gap-4">
                <span className="text-3xl">Añadir amigos</span> 
                <input type="text" onChange={(e) => setAñadirAmigo(e.target.value)} value={añadirAmigo}
                    onKeyDown={(e) => {if(e.key == "Enter") enviarSolicitud()}}
                    placeholder="@           Usuario de nuevo amigo" className="w-4/5 outline-none rounded-lg pl-4 h-10"/>
            </div>
            <div className="flex flex-col w-full">
                <div className="flex flex-row justify-between items-center w-full">
                    <div className="flex w-full"><span className="text-2xl">Lista de amigos</span></div>
                    <div className="flex w-full justify-start mr-52"><span className="text-xl">Usuarios</span></div>
                </div>
                <div className="flex flex-col w-full justify-center items-start">
                    <Amigo abrirPerfil={() => setPerfilAbierto(true)} 
                        abrirEliminar={() => setEliminarAbierto(true)} abrirBloquear={() => setBloquearAbierto(true)} 
                        nombre="Alezito2008" tag="alezito"
                    />
                    <Amigo abrirPerfil={() => setPerfilAbierto(true)} 
                        abrirEliminar={() => setEliminarAbierto(true)} abrirBloquear={() => setBloquearAbierto(true)} 
                        nombre="Fogolin08" tag="fogo"
                    />
                </div>
            </div>
        </div>
        </>
    )
}