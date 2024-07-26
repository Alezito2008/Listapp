'use client'

import Boton from '@/components/Boton/Boton'
import './styles.css'
import '@/styles/forms.css'

import { useEffect, useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import Cargando from '@/components/Cargando/Cargando'
import ModalCompartir from './ModalCompartir'
import ModalQR from './ModalQR'

export default function EditarListaPage() {

        const router = useRouter()
    
        const { listaId } = useParams()

        const [cargando, setCargando] = useState(true)
        const [nombre, setNombre] = useState('')
        const [descripcion, setDescripcion] = useState('')

        const [compartirAbierto, setCompartirAbierto] = useState(false)
        const [qrAbierto, setQrAbierto] = useState(false)

        const obtenerLista = async () => {
            const response = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/listas/${listaId}`, {
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
            const response = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/listas/${listaId}`, {
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
            const response = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/listas/${listaId}`, {
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
                { compartirAbierto && <ModalCompartir
                    listaId={listaId}
                    cerrarModal={() => setCompartirAbierto(false)}
                    abrirQR={() => setQrAbierto(true)}
                /> }
                { qrAbierto && <ModalQR
                    cerrarModal={() => setQrAbierto(false)}
                /> }
                <div className="editar-lista">
                    <div className="flex justify-end mb-3">
                        <button className='boton-compartir' onClick={ e => setCompartirAbierto(true) }>
                            <span className='material-symbols-outlined'>globe</span>
                            Compartir
                        </button>
                    </div>
                    <h1>Editar lista</h1>
                    <form action={editarLista}>
                        <label htmlFor="nombre">Nombre<span className='text-red-500'>*</span></label>
                        <input type="text" id="nombre" placeholder='Nombre de la lista' onChange={e => setNombre(e.target.value)} value={nombre}/>
                        <label htmlFor="descripcion">Descripción</label>
                        <input id="descripcion" placeholder='Descripción de la lista' onChange={e => setDescripcion(e.target.value)} value={descripcion}/>
                        <div className='flex justify-center mt-3 mb-3'>
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