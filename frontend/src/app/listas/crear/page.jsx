'use client'

import Boton from '@/components/Boton/Boton'
import './styles.css'
import '@/styles/forms.css'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Cargando from '@/components/Cargando/Cargando'

export default function CrearListaPage() {

    const router = useRouter()

    const [cargando, setCargando] = useState(false)

    const [nombre, setNombre] = useState('')
    const [descripcion, setDescripcion] = useState('')

    const crearLista = async () => {
        if (nombre.trim() === '') return alert('La lista debe tener un nombre')
        setCargando(true)
        const response = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/listas`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: 'include',
            body: JSON.stringify({ nombre, descripcion })
        })
        setCargando(false)
        const data = await response.json()
        if (data.message) return alert(data.message)
        else window.location.href = '/listas'
    }

    return (
        <>
            { cargando && <Cargando />}
            <div className="crear-lista">
                <h1>Crear lista</h1>
                <form action={crearLista} >
                    <label htmlFor="nombre">Nombre<span className='text-red-500'>*</span></label>
                    <input type="text" id="nombre" placeholder='Mi lista' onChange={e => setNombre(e.target.value)} value={nombre}/>
                    <label htmlFor="descripcion">Descripción</label>
                    <input id="descripcion" placeholder='Esta es mi lista de compras' onChange={e => setDescripcion(e.target.value)} value={descripcion}/>
                    <div className='flex justify-center mt-3'>
                        <Boton texto='Hecho' icono='check' />
                    </div>
                </form>
            </div>
        </>
    )
}