"use client"
import Avatar from "@/components/Avatar/Avatar"
import "./styles.css"
import CerrarSesion from "./BotonCerrarSesion"
import BotonEditar from "./BotonEditar"
import { useState } from "react"
import ModalCuenta from "@/components/Modals/ModalCuenta/ModalCuenta"

export default function CuentaPage(){
    const [modalAbierto, setModalAbierto] = useState(false)

    const abrirModal = () => setModalAbierto(!modalAbierto);

    return(
        <>
        {
            modalAbierto && <ModalCuenta callback={abrirModal}
            />
        }
        <div className="cuenta">
            <div className="flex flex-col gap-4">
                <Avatar value="placeholder" style='shape' size={180} />
                <span className="text-2xl">¡Hola placeholder!</span>
                <p>Descripción</p>
            </div>
            <div className="flex flex-row w-2/3 justify-around gap-10">
                <div className="flex flex-col gap-4">
                    <div className="elementoCuenta">
                        <label htmlFor="usuario">Usuario:</label>
                        <span id="usuario">placeholder</span>
                        <BotonEditar callback={() => setModalAbierto(!modalAbierto)} />
                    </div>
                    <div className="elementoCuenta">
                        <label htmlFor="password">Contraseña:</label>
                        <span id="password">...</span>
                        <BotonEditar callback={() => setModalAbierto(!modalAbierto)} />
                    </div>
                </div>
                <div className="flex flex-col gap-4">
                    <div className="elementoCuenta">
                        <label htmlFor="nombre">Nombre:</label>
                        <span id="nombre">placeholder</span>
                        <BotonEditar callback={() => setModalAbierto(!modalAbierto)} />
                    </div>
                    <div className="elementoCuenta">
                        <label htmlFor="cumple">Cumpleaños:</label>
                        <span className="rounded border-2 border-[#0C0563] border-solid ml-3 px-2">11/11/1111</span>
                        <BotonEditar callback={() => setModalAbierto(!modalAbierto)} />
                    </div>
                </div>
            </div>
            <div>
            <CerrarSesion />
            </div>
        </div>
        </>
    )
}