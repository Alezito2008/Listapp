'use client'

import '@/styles/cuentas.css'
import Link from 'next/link'
import { useState } from 'react'
import Cargando from '@/components/Cargando/Cargando'

export default function RegisterPage() {

    let [nombre, setNombre] = useState('')
    let [usuario, setUsuario] = useState('')
    let [contraseña, setContraseña] = useState('')
    let [confirmarContraseña, setConfirmarContraseña] = useState('')
    let [error, setError] = useState('')
    let [cargando, setCargando] = useState(false)

    const registrarse = async () => {
        setError('')
        if (usuario.trim() === '' || contraseña.trim() === '' || nombre.trim() === '') return setError('Por favor completá todos los campos')
        if (contraseña !== confirmarContraseña) return setError('Las contraseñas no coinciden')
        let data = {
            nombre: nombre,
            tag: usuario,
            contraseña
        }
        setCargando(true)
        let response = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/register`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: 'include',
            body: JSON.stringify(data)
        })
        let json = await response.json()
        if (response.status !== (200 || 204)) setError(json.message)
        setCargando(false)
    }

    return (
        <>
            {cargando && <Cargando />}
            <div className="login">
                <h1>Registrarse</h1>
                <h3>Bienvenido! Por favor ingresá los datos</h3>
                <div className="login-form">
                <div>
                        <label htmlFor="nombre">Nombre</label>
                        <div className='entrada'>
                            <span className='material-symbols-outlined'>person</span>
                            <input type='text' placeholder='Ingresá tu nombre' id='nombre' onChange={e => setNombre(e.target.value)} value={nombre}/>
                        </div>
                    </div>
                    <div>
                        <label htmlFor="usuario">Usuario</label>
                        <div className='entrada'>
                            <span className='material-symbols-outlined'>alternate_email</span>
                            <input type='text' placeholder='Ingresá tu usuario' id='usuario' onChange={e => setUsuario(e.target.value)} value={usuario.toLowerCase().replaceAll(' ', '')}/>
                        </div>
                    </div>
                    <div>
                        <label htmlFor="contraseña">Contraseña</label>
                        <div className='entrada'>
                            <span className='material-symbols-outlined'>lock</span>
                            <input type='password' placeholder='•••••••••••••' id='contraseña' onChange={e => setContraseña(e.target.value)} value={contraseña}/>
                        </div>
                    </div>
                    <div>
                        <label htmlFor="confirmar-contraseña">Confirmar contraseña</label>
                        <div className='entrada'>
                            <span className='material-symbols-outlined'>lock</span>
                            <input type='password' placeholder='•••••••••••••' id='confirmar-contraseña' onChange={e => setConfirmarContraseña(e.target.value)} value={confirmarContraseña}/>
                        </div>
                    </div>
                    <button className='mt-3 w-full bg-[--secondary-color] text-white font-semibold py-2 rounded-md'
                    onClick={registrarse}>
                        Registrarse
                    </button>
                    <p className='text-center text-red-500'>
                        {error}
                    </p>
                </div>
                <foot className='mt-auto text-center'>
                    <p>¿Ya tenés cuenta?</p>
                    <Link href='/login' className='text-[--secondary-color] font-medium'>Iniciar Sesión</Link>
                </foot>
            </div>
        </>
    )
}
 