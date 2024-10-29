'use client'
import './Navbar.css';
import Link from 'next/link';
import Logo from '../Logo/Logo';
import SidebarBoton from './Sidebar/SidebarBoton';
import { usePathname } from 'next/navigation';
import { useState } from 'react';

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
    if(esLista){
        obtenerLista(id)
    }

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
                <div>
                    <p>{infoLista.nombre}</p>
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
