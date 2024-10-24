"use client"
import ModalSeleccion from "@/components/Modals/ModalSeleccion/ModalSeleccion"
import { useState } from "react"
import { useEffect } from "react"
import Lista from "@/components/Lista/Lista"

export default function ListasPage(){
    const [seleccionAbierto, setSeleccionAbierto] = useState(false)
    const [listas, setListas] = useState({})

    const obtenerListas = async () => {
        const response = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/listas`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: 'include'
        })
        const data = await response.json()
        setListas(data)
        if (data.message) window.location.href = "/login"
        if (response.status === 401) {
            window.location.href = "/login"
        }
    }

    useEffect(() => {
        return () => {
            obtenerListas()
        }
    }, [])

    return(
        <>
        {   seleccionAbierto && <ModalSeleccion
            cerrarModal={() => setSeleccionAbierto(false)}
        /> }

        <div className="flex flex-col text-[#0C0563] justify-start items-center gap-8 p-2 size-full bg-gray-100">
            <p className="text-6xl">Listas</p>
            <div className="flex flex-row gap-10 justify-around items-center w-full pt-12">
                <span className="text-2xl">Más recientes</span>
                <span className="text-xl">Tipo de lista</span>
                <span className="text-xl">Última vez</span>

                <button type="button" className="flex justify-center items-center text-center bg-[#0C0563] text-white w-32 h-10 text-4xl rounded-2xl pb-2" 
                    onClick={() => setSeleccionAbierto(true)}>
                    +
                </button>
            </div>
            <div className="flex flex-col p-2 px-20 justify-start items-start w-full gap-4">
                {listas.map && listas.map(lista => (
                    <Lista
                        key={lista.id}
                        nombre={lista.nombre}
                        descripcion={lista.descripcion}
                        tipo={lista.tipo}    
                        idLista={lista.id}
                    />
                ))}
            </div>
        </div>
        </>
    )
}