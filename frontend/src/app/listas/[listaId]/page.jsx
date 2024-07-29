'use client'

import { useEffect, useState } from 'react';
import './styles.css'
import { useParams } from "next/navigation";
import Cargando from '@/components/Cargando/Cargando';
import Item from '@/components/Item/Item';
import { io } from 'socket.io-client';
import { useRouter } from 'next/navigation';
import Cookies from 'js-cookie';
import ModalAI from './ModalAI';
import ModalAgregar from './ModalAgregar';

export default function Lista() {

    const socket = io(process.env.NEXT_PUBLIC_SERVER_URL)

    const router = useRouter()
    const token = Cookies.get('token')

    const { listaId } = useParams()

    const [nombreItem, setNombreItem] = useState('')
    const [cantidadItem, setCantidadItem] = useState(1)
    const [medida, setMedida] = useState('')

    const [agregarAbierto, setAgregarAbierto] = useState(false)
    const [AIAbierto, setAIAbierto] = useState(false)


    const [receta, setReceta] = useState(null)

    const [cargando, setCargando] = useState(true)
    const [listaInfo, setListaInfo] = useState({
        nombre: '',
        items: []
    })

    const {nombre, items} = listaInfo

    const agregarItem = async () => {
        socket.emit('agregar-item', { nombre: nombreItem, cantidadNecesitada: parseInt(cantidadItem), medida, listaId, token })
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

        if (response.status === 200) {
            setCargando(false)
            const data = await response.json()
            setListaInfo(data)
            return
        }
        router.push('/login')
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
                    i.id === item.id ? { ...i, marcado: item.marcado } : i
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

            { AIAbierto && <ModalAI
                cerrarModal={() => setAIAbierto(false)}
                setNombreItem={setNombreItem}
                setCantidadItem={setCantidadItem}
                setAgregarAbierto={setAgregarAbierto}
                receta={receta}
                setReceta={setReceta}
            /> }

            {agregarAbierto && <ModalAgregar
                cerrarModal={ () => {setAgregarAbierto(false)} }
                agregarAbierto={agregarAbierto}
                nombreItem={nombreItem}
                setNombreItem={setNombreItem}
                cantidadItem={cantidadItem}
                setCantidadItem={setCantidadItem}
                agregarItem={agregarItem}
                medida={medida}
                setMedida={setMedida}
            />}
            
            <div className='contenedor-lista'>
                <h1 onClick={e => router.push(`/listas/${listaId}/editar`)}>{nombre}  <span className="material-symbols-outlined text-gray-500">edit</span> </h1>
                <div className="contenedor-items">
                    <div className="informacion">
                        <span>Nombre</span>
                        <span>Cantidad</span>
                    </div>
                    {
                        items.map(item => (
                            <Item
                                key={item.id}
                                id={item.id}
                                nombre={item.nombre}
                                cantidadNecesitada={item.cantidadNecesitada}
                                marcado={item.marcado}
                                medida={item.medida}
                                socket={socket}
                                listaId={listaId}
                            />
                        ))
                    }
                    <div className='flex justify-center mt-2 gap-3'>
                        <button onClick={e => {
                            setNombreItem('')
                            setMedida('u')
                            setAgregarAbierto(true)
                        }}>
                            <span className="material-symbols-outlined">add</span>Agregar
                        </button>
                        <button className='boton-ia' onClick={e => { setAIAbierto(true) } }>
                            <span className="material-symbols-outlined bolt">bolt</span>
                        </button>
                    </div>
                </div>
            </div>
        </>
    )
}