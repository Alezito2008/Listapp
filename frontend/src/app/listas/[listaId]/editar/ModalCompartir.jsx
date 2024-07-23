import Boton from '@/components/Boton/Boton'
import { useState } from 'react'

export default function ModalCompartir({ listaId, setCompartirAbierto }) {

    const [usuario, setUsuario] = useState('')

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

    return (
        <>
            <div className="overlay" onClick={e => setCompartirAbierto(false)}></div>
            <form action={compartir} className='form-compartir'>
                <h2>Compartir lista</h2>
                <label htmlFor="usuario">Nombre de usuario<span className='text-red-500'>*</span> </label>
                <div className="entrada">
                    <span className='material-symbols-outlined'>alternate_email</span>
                    <input type="usuario" id="usuario" placeholder='usuario' required value={usuario} onChange={e => setUsuario(e.target.value)} />
                </div>
                <Boton texto='Compartir' icono='globe' disabled={usuario.trim() === ''} />
            </form>
        </>
    )
}