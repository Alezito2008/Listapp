'use client'

import Boton from '@/components/Boton/Boton'
import './styles.css'
import '@/styles/forms.css'

import { useEffect, useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import Cargando from '@/components/Cargando/Cargando'

export default function EditarListaPage() {

        const router = useRouter()
    
        const { listaId } = useParams()

        const [cargando, setCargando] = useState(true)
        const [nombre, setNombre] = useState('')
        const [descripcion, setDescripcion] = useState('')

        const obtenerLista = async () => {
            const response = await fetch(`http://localhost:5000/listas/${listaId}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                },
                credentials: 'include'
            })
    
            if (response.status === 401) router.push('/login')
            else {
                setCargando(false)
                const data = await response.json()
                setNombre(data.nombre)
                setDescripcion(data.descripcion)
            }
        }

        useEffect(() => {
            obtenerLista()
        }, [])

        const editarLista = async () => {
            if (nombre.trim() === '') return alert('La lista debe tener un nombre')
            const response = await fetch(`http://localhost:5000/listas/${listaId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                credentials: 'include',
                body: JSON.stringify({ nombre, descripcion })
            })
            const data = await response.json()
            if (response.status === 200) return window.location.href = '/listas/'+listaId
            return alert(data.message)
        }

        const eliminarLista = async () => {
            const response = await fetch(`http://localhost:5000/listas/${listaId}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json'
                },
                credentials: 'include'
            })
            const data = await response.json()
            if (response.status === 200) return window.location.href = '/listas'
            return alert(data.message)
        }
    
        return (
            <>
                { cargando && <Cargando />}
                <div className="editar-lista">
                    <h1>Editar lista</h1>
                    <form action={editarLista}>
                        <label htmlFor="nombre">Nombre<span className='text-red-500'>*</span></label>
                        <input type="text" id="nombre" placeholder='Nombre de la lista' onChange={e => setNombre(e.target.value)} value={nombre}/>
                        <label htmlFor="descripcion">Descripción</label>
                        <input id="descripcion" placeholder='Descripción de la lista' onChange={e => setDescripcion(e.target.value)} value={descripcion}/>
                        <div className='flex justify-center mt-3'>
                            <Boton texto='Hecho' icono='check' disabled={nombre.trim() === ''}/>
                        </div>
                    </form>
                    <button className='boton-eliminar' onClick={eliminarLista}>
                        <span className="material-symbols-outlined">delete</span>
                        Eliminar Lista
                    </button>
                </div>
            </>
        )
}