"use client"
import "./PreviewListas.css";
import { useEffect, useState } from "react";
import Lista from "./Lista/Lista";
import Link from "next/link";

export default function PreviewListas(){

    const [listas, setListas] = useState({})
    const [mensajeError, setMensajeError] = useState('')

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
            {listas && listas.length > 0 ?  listas.map((item, index) => (
                index < 5 &&
                    <Lista key={index} grupal={false} nombreLista={item.nombre} fecha={"11/09/2001"}/>
                )) :
              <div className="mensaje">
                <h2>No hay nada acá. Probá <Link href="/listas">Haciendo una lista</Link>.</h2>    
              </div> 
            }        
        </div>
    )
}