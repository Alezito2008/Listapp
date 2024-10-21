"use client"

import { useState } from "react"
import Cargando from "@/components/Cargando/Cargando"

export default function ModalCrear({ tipoLista, cerrarModal }){
    const [cargando, setCargando] = useState(false)

    const [nombre, setNombre] = useState('')
    const [descripcion, setDescripcion] = useState('')

    const crearLista = async () => {
        if (nombre.trim() === '') return alert('La lista debe tener un nombre')
        setCargando(true)
        const response = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/listas`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: 'include',
            body: JSON.stringify({ nombre, descripcion, tipoLista })
        })
        setCargando(false)
        const data = await response.json()
        if (data.message) return alert(data.message)
    }

    return(
        <>
            {cargando && <Cargando /> }
            <div className="overlay" onClick={cerrarModal}></div>
            <div className="flex justify-center items-center size-full text-[#0C0563]">
                <div className="flex justify-center items-center bg-white flex-col z-10 rounded-2xl w-96 h-72">
                    <p className="text-3xl">Crear una lista</p>
                    <p className="text-lg text-center">Ponele un nombre <br />y una descripción a tu lista</p>
                    <div className="flex flex-col items-start justify-start gap-6">
                        <div className="flex flex-col justify-start border-b-2 border-solid border-gray w-full">
                            <input type="text" placeholder='Nombre' 
                                onChange={e => setNombre(e.target.value)} value={nombre}
                                className="h-8 outline-none size-2/3"
                            />
                        </div>
                        <div>
                            <input placeholder='Descripción' 
                                onChange={e => setDescripcion(e.target.value)} value={descripcion}
                                className=""
                            />
                        </div>
                        <div className="flex flex-row justify-around w-full">
                            <button type="button" 
                                onClick={cerrarModal} 
                                className="flex justify-center items-center rounded-xl bg-gray-200 h-6 px-6 py-4">
                                    Atrás
                            </button>
                            <button type="button" 
                                onClick={() => {crearLista(); cerrarModal()}} 
                                className="flex justify-center items-center rounded-xl bg-[#0C0563] text-white h-6 px-6 py-4">
                                    Crear
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}