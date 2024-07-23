'use client'

import { useEffect, useState } from 'react';
import './styles.css'
import { useParams } from "next/navigation";
import Cargando from '@/components/Cargando/Cargando';
import Item from '@/components/Item/Item';
import Boton from '@/components/Boton/Boton';
import { io } from 'socket.io-client';
import { useRouter } from 'next/navigation';
import Cookies from 'js-cookie';

export default function Lista() {

    const socket = io(process.env.NEXT_PUBLIC_SERVER_URL)

    const router = useRouter()
    const token = Cookies.get('token')

    const { listaId } = useParams()

    const [nombreItem, setNombreItem] = useState('')
    const [cantidadItem, setCantidadItem] = useState(1)

    const [agregarAbierto, setAgregarAbierto] = useState(false)
    const [cargando, setCargando] = useState(true)
    const [listaInfo, setListaInfo] = useState({
        nombre: '',
        items: []
    })

    const {nombre, items} = listaInfo

    const agregarItem = async () => {
        socket.emit('agregar-item', { nombre: nombreItem, cantidadNecesitada: parseInt(cantidadItem), listaId, token })
        setAgregarAbierto(false)
    }

    const obtenerLista = async () => {
        const response = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/listas/${listaId}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: 'include'
        })

        // if (response.status === 401) router.push('/login')
        // else {
            setCargando(false)
            const data = await response.json()
            setListaInfo(data)
        // }
    }

    useEffect(() => {
        obtenerLista()

        socket.on('connect', () => {
            socket.emit('sala', listaId)
        })

        socket.on('eliminar-item', id => {
            setListaInfo(prev => {
                return {
                    ...prev,
                    items: prev.items.filter(item => item.id !== id)
                }
            })
        })

        socket.on('agregar-item', item => {
            setListaInfo(prev => {
                return {
                    ...prev,
                    items: [...prev.items, item]
                }
            })
        })

        socket.on('actualizar-item', item => {
            setListaInfo(prev => ({
                ...prev,
                items: prev.items.map(i =>
                    i.id === item.id ? { ...i, cantidadConseguida: item.cantidadConseguida } : i
                ),
            }));
        });

        return () => {
            socket.off('eliminar-item')
            socket.off('actualizar-item')
            socket.off('agregar-item')
        }
    }, [])

    return (
        <>
            {cargando && <Cargando />}
            {agregarAbierto && <div className="overlay" onClick={e => setAgregarAbierto(false)}></div>}
            <div className={`modal-agregar  ${!agregarAbierto && 'hidden'}`}>
                <h1>Agregar Item</h1>
                <form action={agregarItem}>
                    <label htmlFor="nombre">Nombre<span className='text-red-500'>*</span></label>
                    <input type="text" id="nombre" placeholder='Nombre del item' onChange={e => setNombreItem(e.target.value)} value={nombreItem}/>
                    <label htmlFor="cantidad">Cantidad<span className='text-red-500'>*</span></label>
                    <input type="number" id="cantidad" placeholder='123' onChange={e => setCantidadItem(e.target.value)} value={cantidadItem}/>
                    <div className='flex justify-center mt-4'>
                        <Boton texto={'Hecho'} icono={'check'} disabled={
                            !(nombreItem.trim() !== '' && cantidadItem !== null && cantidadItem > 0)
                        }/>
                    </div>
                </form>
            </div>
            <div className='contenedor-lista'>
                <h1 onClick={e => router.push(`/listas/${listaId}/editar`)}>{nombre}  <span className="material-symbols-outlined text-gray-500">edit</span> </h1>
                <div className="contenedor-items">
                    {
                        items.map(item => (
                            <Item key={item.id} id={item.id} nombre={item.nombre} cantidadNecesitada={item.cantidadNecesitada} cantidadConseguida={item.cantidadConseguida} socket={socket} listaId={listaId} />
                        ))
                    }
                    <div className='flex justify-center mt-2'>
                        <button onClick={e => setAgregarAbierto(true)}>
                            <span className="material-symbols-outlined">add</span>Agregar
                        </button>
                    </div>
                </div>
            </div>
        </>
    )
}