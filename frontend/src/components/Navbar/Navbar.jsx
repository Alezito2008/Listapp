'use client'
import './Navbar.css';
import "@/styles/iconSize.css"
import Link from 'next/link';
import Logo from '../Logo/Logo';
import SidebarBoton from './Sidebar/SidebarBoton';
import Solicitudes from '../Solicitudes/Solicitudes';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import { useEffect } from 'react';

export default function Navbar({ children, abrirSide }) {
    const [infoLista, setInfoLista] = useState({})
    const [solicitudesAbierto, setSolicitudesAbierto] = useState(false);

    const path = usePathname()

    const obtenerLista = async (id) => {
        const response = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/listas/${id}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
        credentials: 'include'
        })
        const data = await response.json()
        setInfoLista(data)
    }

    const esLista = path.slice(0,8) == "/listas/" && (path.slice(10) != "/editar" && !isNaN(path.slice(10)))
    const id = path.slice(8)
    
    useEffect(() => {
        if(esLista){
            obtenerLista(id)
        }
        if(path == "/amigos"){
            setSolicitudesAbierto(true)
            return
        }
        setSolicitudesAbierto(false)
    }, [path])

    return (
        <div className='navbar'>
            <div className='sidelogo'>
                <div>   
                    <SidebarBoton abrirSide={abrirSide} />
                    { children }
                </div>
                <div>
                    <Logo />
                </div>
            </div>
            {   esLista &&
                <div className='text-4xl text-[#0C0563] flex flex-row gap-4 items-center pr-40'>
                    <p>{infoLista.nombre}</p>
                    <Link href={"/listas/" + id + "/editar"}>
                        <span className='material-symbols-outlined material-2rem'>edit</span>
                    </Link>
                </div>
            }
            <div className='flex-row gap-8'>
                {   solicitudesAbierto && <Solicitudes

                /> }
                <Link href="/cuenta">
                    <img src="/perfil.svg" alt="Avatar" />
                </Link>
            </div>
        </div>
    );
}
