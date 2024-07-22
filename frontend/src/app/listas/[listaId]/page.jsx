'use client'

import { useEffect, useState } from 'react';
import './styles.css'
import { useParams } from "next/navigation";
import Cargando from '@/components/Cargando/Cargando';
import Item from '@/components/Item/Item';
import Boton from '@/components/Boton/Boton';

export default function Lista() {
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
        await fetch('http://localhost:5000/items/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                nombre: nombreItem,
                cantidadConseguida: 0,
                cantidadNecesitada: cantidadItem,
                listaId
            }),
            credentials: 'include'
        })
        window.location.reload()
    }

    const obtenerListas = async () => {
        const response = await fetch(`http://localhost:5000/listas/${listaId}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: 'include'
        })
        setCargando(false)
        const data = await response.json()
        setListaInfo(data)
    }

    useEffect(() => {
        obtenerListas()
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
                <h1>{nombre}</h1>
                <div className="contenedor-items">
                    {
                        items.map(item => (
                            <Item key={item.id} nombre={item.nombre} cantidadNecesitada={item.cantidadNecesitada} cantidadConseguida={item.cantidadConseguida} />
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