'use client'
import './Navbar.css';
import Link from 'next/link';
import Logo from '../Logo/Logo';
import BotonEditar from '../BotonEditar/BotonEditar';
import SidebarBoton from './Sidebar/SidebarBoton';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import { useEffect } from 'react';

export default function Navbar({ children, abrirSide }) {
    const [infoLista, setInfoLista] = useState({})

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

    const esLista = path.slice(0,8) == "/listas/"
    const id = path.slice(8)
    
    useEffect(() => {
        if(esLista){
            obtenerLista(id)
        }
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
                <div className='text-3xl text-[#0C0563]'>
                    <p>{infoLista.nombre}</p>
                    <BotonEditar callback={() => window.location.href = "/listas/" + id + "/editar"} />
                </div>
            }
            <div>
                <Link href="/cuenta">
                    <img src="/perfil.svg" alt="Avatar" />
                </Link>
            </div>
        </div>
    );
}
