"use client"
import Avatar from "@/components/Avatar/Avatar"
import "./styles.css"
import CerrarSesion from "./BotonCerrarSesion"
import BotonEditar from "../../components/BotonEditar/BotonEditar"
import { useEffect, useState } from "react"
import ModalCuenta from "@/components/Modals/ModalCuenta/ModalCuenta"
import ModalOpciones from "@/components/Modals/ModalOpciones/ModalOpciones"
import BotonOpciones from "./BotonOpciones"
import Cargando from "@/components/Cargando/Cargando"

export default function CuentaPage(){
    const [modalAbierto, setModalAbierto] = useState(false)
    const [datoModal, setDatoModal] = useState("")
    const [opcionesAbierto, setOpcionesAbierto] = useState(false)
    const [cargando, setCargando] = useState(false)
    const [infoCuenta, setInfoCuenta] = useState({})

    const abrirModal = () => setModalAbierto(!modalAbierto);

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

    useEffect(() => {
        const controller = new AbortController();
        obtenerInfo(controller.signal);

        return () => {
            controller.abort();
        };
    }, []); 

    return(
        <>
        {cargando && <Cargando />}

        {   modalAbierto && <ModalCuenta 
                callback={abrirModal} tipoDato={datoModal} infoCuenta={infoCuenta}
        /> }

        { opcionesAbierto && <ModalOpciones
            callback={() => setOpcionesAbierto(false)}
        /> }

        <div className="cuenta">
            <div className="flex flex-col justify-start items-center gap-4">
                <Avatar value={infoCuenta.tag} style='shape' size={180} />
                <span className="text-2xl">¡Hola {infoCuenta.nombre}!</span>
                <div className="flex flex-row justify-center gap-2">
                {   infoCuenta.descripcion ?
                    <p>infoCuenta.descripcion</p>
                    :
                    <p className="italic">¡Poné tu propia descripción!</p>
                }   
                <BotonEditar callback={() => {abrirModal(); setDatoModal("descripcion")}}  />
                </div>
            </div>
            <div className="flex flex-row w-2/3 justify-around gap-10">
                <div className="flex flex-col gap-4">
                    <div className="elementoCuenta">
                        <label htmlFor="usuario">Usuario:</label>
                        <span id="usuario">{infoCuenta.tag}</span>
                        <BotonEditar callback={() => {abrirModal(); setDatoModal("usuario")}} />
                    </div>
                    <div className="elementoCuenta">
                        <label htmlFor="password">Contraseña:</label>
                        <span id="password">...</span>
                        <BotonEditar callback={() => {abrirModal(); setDatoModal("contraseña")}} />
                    </div>
                </div>
                <div className="flex flex-col gap-4">
                    <div className="elementoCuenta">
                        <label htmlFor="nombre">Nombre:</label>
                        <span id="nombre">{infoCuenta.nombre}</span>
                        <BotonEditar callback={() => {abrirModal(); setDatoModal("nombre")}} />
                    </div>
                    <div className="elementoCuenta">
                        <label htmlFor="cumple">Cumpleaños:</label>
                        <span className="rounded border-2 border-[#0C0563] border-solid ml-3 px-2">12/09/2008</span>
                        <BotonEditar callback={() => {abrirModal(); setDatoModal("cumpleaños")}} />
                    </div>
                </div>
            </div>
            <div className="flex flex-row justify-between w-full">
                <div className="flex justify-center w-full pl-12"><CerrarSesion /></div>
                <BotonOpciones abrirOpciones={() => setOpcionesAbierto(true)}/>
            </div>
        </div>
        </>
    )
}