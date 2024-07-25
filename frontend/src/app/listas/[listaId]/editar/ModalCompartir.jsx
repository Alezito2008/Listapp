import Boton from '@/components/Boton/Boton'
import Cargando from '@/components/Cargando/Cargando'
import Usuario from '@/components/Usuario/Usuario'
import Cookies from 'js-cookie'
import { useEffect, useState } from 'react'

export default function ModalCompartir({ listaId, setCompartirAbierto }) {

    const [usuario, setUsuario] = useState('')
    const [compartidos, setCompartidos] = useState([])
    const [cargando, setCargando] = useState(true)

    const id = Cookies.get('id')

    const compartir = async () => {
        const response = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/listas/${listaId}/compartir`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: 'include',
            body: JSON.stringify({ tag: usuario })
        })
        const data = await response.json()
        if (response.status === 200) return window.location.href = '/listas/'+listaId
        return alert(data.message)
    }

    const obtenerCompartidos = async () => {
        const response = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/listas/${listaId}/obtenerCompartidos`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: 'include'
        })
        const data = await response.json()
        setCompartidos(data)
        setCargando(false)
    }

    const eliminarUsuario = async (tag) => {
        const response = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/listas/${listaId}/compartir`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: 'include',
            body: JSON.stringify({ tag })
        })
        const data = await response.json()
        if (response.status === 200) {
            const usuarios = compartidos.usuarios.filter(usuario => usuario.tag !== tag)
            return setCompartidos({ ...compartidos, usuarios })
        }
        return alert(data.message)
        
    }

    const compartirUrl = async () => {
        const response = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/crearInvitacion`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: 'include',
            body: JSON.stringify({ id: listaId })
        })
        const data = await response.json()
        if (response.status !== 200) return alert(data.message)
        navigator.clipboard.writeText(`${process.env.NEXT_PUBLIC_URL}/invitacion/${data.invitacion}`)
    }

    useEffect(() => {
        return () => {
            obtenerCompartidos()
        }
    }, [])

    return (
        <>
            { cargando && <Cargando /> }
            <div className="overlay" onClick={e => setCompartirAbierto(false)}></div>
            <form action={compartir} className='form-compartir'>
                <div className="flex items-center">
                    <h2>Compartir lista</h2>
                    {/* { navigator.share && <span className="material-symbols-outlined ml-auto"
                    onClick={compartirUrl} >share</span> } */}
                </div>
                <label htmlFor="usuario">Nombre de usuario<span className='text-red-500'>*</span> </label>
                <div className="entrada">
                    <span className='material-symbols-outlined'>alternate_email</span>
                    <input type="usuario" id="usuario" placeholder='usuario' required value={usuario} onChange={e => setUsuario(e.target.value)} />
                </div>
                <p>Personas con acceso</p>
                <div className="compartidos">
                    { !cargando && 
                        compartidos.usuarios.map((usuario, index) => 
                        <Usuario key={index} listaId={listaId}
                        eliminarUsuario={eliminarUsuario}
                        nombre={usuario.nombre}
                        tag={usuario.tag}
                        eliminar={compartidos.propietario && usuario.id != id}/>
                        )
                    }
                </div>
                <Boton texto='Compartir' icono='globe' disabled={usuario.trim() === ''} />
                <div className="seccion-compartir">
                    { navigator.clipboard && <button type='button' className='boton-copiar' onClick={compartirUrl}>
                        <span className="material-symbols-outlined">link</span>
                        Copiar enlace
                    </button> }
                    <span className='material-symbols-outlined'>qr_code_2</span>
                </div>
            </form>
        </>
    )
}