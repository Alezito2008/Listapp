"use client"
import "./PreviewListas.css";
import { useEffect, useState } from "react";
import Lista from "./ListaResumen/ListaResumen";
import Link from "next/link";

export default function PreviewListas(){

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
        if (data.message) console.error(data.message)
    }

    useEffect(() => {
        return () => {
            obtenerListas()
        }
    }, [])

    return(
        <div className="preview-listas">

            {listas && listas.length > 0 ? 
            <div className="arriba">
                <div className="titulo-listas">
                <span>Listas recientes</span>
                </div>
                <div>
                <span>Fecha</span>
                </div>
            </div>
            : ""}

            <div className="abajo">   

                {listas && listas.length > 0 ?  listas.map((item, index) => (
                    index < 3 &&
                        <Lista key={index} grupal={false} nombreLista={item.nombre} fecha={"11/09/2001"} id={item.id}/>
                    )) :
                <div className="mensaje">
                    <h2>No hay nada acá. Probá <Link href="/listas">Haciendo una lista</Link>.</h2>    
                </div> 
                }        

            </div>
        </div>
    )
}