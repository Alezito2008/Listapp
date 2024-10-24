"use client"
import Avatar from "@/components/Avatar/Avatar"
import "./styles.css"
import CerrarSesion from "./BotonCerrarSesion"
import BotonEditar from "./BotonEditar"
import { useState } from "react"
import ModalCuenta from "@/components/Modals/ModalCuenta/ModalCuenta"
import ModalOpciones from "@/components/Modals/ModalOpciones/ModalOpciones"
import BotonOpciones from "./BotonOpciones"

export default function CuentaPage(){
    const [modalAbierto, setModalAbierto] = useState(false)
    const [datoModal, setDatoModal] = useState("")
    const [opcionesAbierto, setOpcionesAbierto] = useState(false)

    const abrirModal = () => setModalAbierto(!modalAbierto);

    return(
        <>
        {   modalAbierto && <ModalCuenta 
                callback={abrirModal} tipoDato={datoModal}
        /> }

        { opcionesAbierto && <ModalOpciones
            callback={() => setOpcionesAbierto(false)}
        /> }

        <div className="cuenta">
            <div className="flex flex-col gap-4">
                <Avatar value="placeholder" style='shape' size={180} />
                <span className="text-2xl">¡Hola placeholder!</span>
                <div className="flex flex-row justify-center gap-2">
                <p>Descripción</p>
                <BotonEditar callback={() => {abrirModal(); setDatoModal("descripción")}}  />
                </div>
            </div>
            <div className="flex flex-row w-2/3 justify-around gap-10">
                <div className="flex flex-col gap-4">
                    <div className="elementoCuenta">
                        <label htmlFor="usuario">Usuario:</label>
                        <span id="usuario">placeholder</span>
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
                        <span id="nombre">placeholder</span>
                        <BotonEditar callback={() => {abrirModal(); setDatoModal("nombre")}} />
                    </div>
                    <div className="elementoCuenta">
                        <label htmlFor="cumple">Cumpleaños:</label>
                        <span className="rounded border-2 border-[#0C0563] border-solid ml-3 px-2">11/11/1111</span>
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