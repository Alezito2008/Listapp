'use client'

import Boton from '@/components/Boton/Boton';
import './styles.css';
import Lista from '@/components/Lista/Lista';
import { redirect } from 'next/navigation';
import ModalSeleccion from '../../components/Modals/ModalSeleccion/ModalSeleccion';
import { useEffect, useState } from 'react';

export default async function ListasPage() {

    const [listas, setListas] = useState({})
    const [mensajeError, setMensajeError] = useState('')
    const [seleccionAbierto, setSeleccionAbierto] = useState(false)

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
        if (data.message) setMensajeError(data.message)
        if (response.status === 401) {
            redirect('/login')
        }
    }

    useEffect(() => {
        return () => {
            obtenerListas()
        }
    }, [])

    return (
        <>
        { seleccionAbierto && <ModalSeleccion
            cerrarModal={() => setSeleccionAbierto(false)}
        /> }
        <div className="listas">
            <div className='flex justify-between items-center'>
                <h1>Listas</h1>
                <Boton icono='add' texto='Crear' accion={e => setSeleccionAbierto(true)} />
            </div>
            <div className='contenedor-listas'>
                {listas.map && listas.map(lista => (
                    <Lista
                        key={lista.id}
                        nombre={lista.nombre}
                        descripcion={lista.descripcion}
                        tipo={lista.tipo}    
                        idLista={lista.id}
                    />
                ))}
                <p>{mensajeError}</p>
            </div>
        </div>
        </>
    )
}