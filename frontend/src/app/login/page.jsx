'use client'

import '@/styles/cuentas.css'
import Link from 'next/link'
import { useState } from 'react'
import Cargando from '@/components/Cargando/Cargando'
import { useRouter } from 'next/navigation'

export default function LoginPage() {

    const router = useRouter()

    let [usuario, setUsuario] = useState('')
    let [contraseña, setContraseña] = useState('')
    let [error, setError] = useState('')
    let [cargando, setCargando] = useState(false)

    const iniciarSesion = async () => {
        setError('')
        if (usuario.trim() === '' || contraseña.trim() === '') return setError('Por favor completá todos los campos')
        let data = {
            tag: usuario,
            contraseña
        }
        setCargando(true)
        let response = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: 'include',
            body: JSON.stringify(data)
        })
        let json = await response.json()
        if (response.status === 200) return router.push('/inicio')
        setError(json.message)
        setCargando(false)
    }

    return (
        <>
            {cargando && <Cargando />}
            <div className="login">
                <h1>Iniciar sesión</h1>
                <h3>Bienvenido! Por favor ingresá los datos</h3>
                <form className="login-form" action={iniciarSesion}>
                    <div>
                        <label htmlFor="usuario">Usuario</label>
                        <div className='entrada'>
                            <span className='material-symbols-outlined'>person</span>
                            <input type='text' placeholder='Ingresá tu usuario' id='usuario' onChange={e => setUsuario(e.target.value)} value={usuario}/>
                        </div>
                    </div>
                    <div>
                        <label htmlFor="contraseña">Contraseña</label>
                        <div className='entrada'>
                            <span className='material-symbols-outlined'>lock</span>
                            <input type='password' placeholder='•••••••••••••' id='contraseña' onChange={e => setContraseña(e.target.value)} value={contraseña}/>
                        </div>
                    </div>
                    <div className='w-full text-right text-[--secondary-color] weight-300 font-medium text-[.9rem] -mt-1'>
                        Olvidé la contraseña
                    </div>
                    <button className='w-full bg-[--secondary-color] text-white font-semibold py-2 rounded-md'>
                        Iniciar Sesión
                    </button>
                    <p className='text-center text-red-500'>
                        {error}
                    </p>
                </form>
                <foot className='mt-auto text-center'>
                    <p>¿No tenés cuenta?</p>
                    <Link href='/register' className='text-[--secondary-color] font-medium'>Registrarse</Link>
                </foot>
            </div>
        </>
    )
}
 