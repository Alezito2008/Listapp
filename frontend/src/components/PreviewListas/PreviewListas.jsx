"use client"
import "./PreviewListas.css";
import { useEffect, useState } from "react";
import Lista from "./ListaResumen/ListaResumen";
import Link from "next/link";
import ModalSeleccion from "@/components/Modals/ModalSeleccion/ModalSeleccion";
import ModalCompartir from "@/components/Modals/ModalCompartir/ModalCompartir";

export default function PreviewListas(){

    const [listas, setListas] = useState({})
    const [seleccionAbierto, setSeleccionAbierto] = useState(false);

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
        if (data.message) console.error(data.message)
    }

    useEffect(() => {
        return () => {
            obtenerListas()
        }
    }, [])

    function crearLista(){
        setSeleccionAbierto(true);
    }

    return(
        <div className="preview-listas">
            { seleccionAbierto && <ModalSeleccion
            cerrarModal={() => setSeleccionAbierto(false)} /> 
            }

            {listas && listas.length > 0 ? 
            <div className="arriba">
                <div className="titulo-listas">
                <span>Listas recientes</span>
                </div>
                <div>
                <span style={{marginLeft: "4rem"}}>Fecha</span>
                </div>
                <button className="crearLista" onClick={crearLista}>
                    +
                </button>
            </div>
            : ""}

            <div className="abajo">   

                {listas && listas.length > 0 ?  listas.map((item, index) => (
                    index < 3 &&
                        <Lista key={index} nombreLista={item.nombre} id={item.id}/>
                    )) :
                <div className="mensaje">
                    <h2>No hay nada acá. Probá <Link href="/listas">Haciendo una lista.</Link></h2>    
                </div> 
                }        

            </div>
        </div>
    )
}