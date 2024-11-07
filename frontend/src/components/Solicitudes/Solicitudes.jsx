"use client"
import "@/styles/iconSize.css"
import { useEffect, useState } from "react"
import MenuSolicitudes from "./MenuSolicitudes/MenuSolicitudes"
import useClickOutside from "@/hooks/useClickOutside/useClickOutside"
import { useRef } from "react"

export default function Solicitudes(){
    const [menuAbierto, setMenuAbierto] = useState(false)
    const [solicitudes, setSolicitudes] = useState([])
    const [cargando, setCargando] = useState(false)     
    const menuRef = useRef(null)
    useClickOutside(menuRef, () => setMenuAbierto(false))

    const obtenerSolicitudes = async (signal) => {
        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/solicitudes`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include',
                signal: signal,
            });
    
            if (!response.ok) {
                throw new Error('Error fetching solicitudes');
            }
    
            const data = await response.json();
            setSolicitudes(data);
        } catch (error) {
            if (error.name === 'AbortError') {
                console.log('Request aborted');
        } 
        }
    };
    
    useEffect(() => {
        const controller = new AbortController();
        const signal = controller.signal;
    
        if(menuAbierto) obtenerSolicitudes(signal);
    
        return () => {
            controller.abort();
        };
    }, [menuAbierto]);

    return(
        <>
        <div className="relative inline-block" ref={menuRef}>
            <button type="button" onClick={() => setMenuAbierto(!menuAbierto)}>
                <img src={solicitudes ? "/solicitudesHay.svg" : "/solicitudes.svg"} alt="solicitudes" className="size-[2.5rem] mt-1" />
            </button>

            {   menuAbierto && <MenuSolicitudes
                    solicitudes={solicitudes}
            /> }
        </div>
        </>
    )
}