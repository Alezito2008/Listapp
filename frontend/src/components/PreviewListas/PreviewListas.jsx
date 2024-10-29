"use client"
import "./PreviewListas.css";
import { useEffect, useState } from "react";
import ListaResumen from "./ListaResumen/ListaResumen";
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
                <span style={{marginLeft: "4rem"}}>Fecha</span>
                </div>
                <Link href="/listas" className="crearLista">
                    Listas
                </Link>
            </div>
            : ""}

            <div className="abajo">   

                {listas && listas.length > 0 ?  listas.map((item, index) => (
                    index < 3 &&
                        <ListaResumen key={index} nombreLista={item.nombre} id={item.id}/>
                    )) :
                <div className="mensaje">
                    <h2>No hay nada acá. Probá <Link href="/listas">Haciendo una lista.</Link></h2>    
                </div> 
                }        

            </div>
        </div>
    )
}