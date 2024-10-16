'use client'

import { useEffect, useState } from 'react';
import './styles.css'
import { useParams } from "next/navigation";
import Cargando from '@/components/Cargando/Cargando';
import Item from '@/components/Item/Item';
import { io } from 'socket.io-client';
import { useRouter } from 'next/navigation';
import Cookies from 'js-cookie';
import ModalAI from '../../../components/Modals/ModalAI/ModalAI';
import ModalAgregar from '../../../components/Modals/ModalAgregar/ModalAgregar';

export default function Lista() {

    const socket = io(process.env.NEXT_PUBLIC_SERVER_URL)

    const router = useRouter()
    const token = Cookies.get('token')

    const { listaId } = useParams()

    const [agregarAbierto, setAgregarAbierto] = useState(false)
    const [AIAbierto, setAIAbierto] = useState(false)

    const [receta, setReceta] = useState(null)

    const [cargando, setCargando] = useState(true)
    const [listaInfo, setListaInfo] = useState({
        tipo: '',
        nombre: '',
        items: []
    })

    const [editando, setEditando] = useState(false)

    const [itemInfo, setItemInfo] = useState({
        seleccionado: null,
        nombre: '',
        cantidad: 1,
        medida: 'un'
    });

    const {nombre, items} = listaInfo

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
                    i.id === item.id ? { ...i,
                        ...Object.fromEntries(Object.entries(item).filter(([key, value]) => value !== undefined))
                    } : i
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
                setAgregarAbierto={setAgregarAbierto}
                receta={receta}
                setReceta={setReceta}
                setItemInfo={setItemInfo}
            /> }

            {agregarAbierto && <ModalAgregar
                cerrarModal={ () => {setAgregarAbierto(false); setEditando(false)} }
                itemInfo={itemInfo}
                setItemInfo={setItemInfo}
                listaInfo={listaInfo}
                socket={socket}
                editando={editando}
            />}
            
            <div className='contenedor-lista'>
                <h1 onClick={e => router.push(`/listas/${listaId}/editar`)}>{nombre}  <span className="material-symbols-outlined text-gray-500">edit</span> </h1>
                <div className="contenedor-items">
                    { listaInfo.tipo === 'c' &&
                        <div className="informacion">
                            <span>Nombre</span>
                            <span>Cantidad</span>
                        </div>
                    }
                    {
                        items.map(({id, nombre, cantidadNecesitada, marcado, medida}) => (
                            <Item
                                key={id}
                                id={id}
                                nombre={nombre}
                                cantidadNecesitada={cantidadNecesitada}
                                marcado={marcado}
                                medida={medida}
                                listaInfo={listaInfo}
                                socket={socket}
                                listaId={listaId}
                                setItemInfo={setItemInfo}
                                abrirEditar={() => {setAgregarAbierto(true); setEditando(true)}}
                            />
                        ))
                    }
                    <div className='flex justify-center mt-2 gap-3'>
                        <button onClick={e => {
                            setAgregarAbierto(true)
                            setItemInfo({ nombre: '', cantidad: null, medida: 'un' })
                            }}>
                            <span className="material-symbols-outlined">add</span>Agregar
                        </button>

                        { listaInfo.tipo === 'c' && 
                            <button className='boton-ia' onClick={e => { setAIAbierto(true) } }>
                                <span className="material-symbols-outlined bolt">bolt</span>
                            </button>
                        }

                    </div>
                </div>
            </div>
        </>
    )
}