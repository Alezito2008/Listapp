"use client"

import "@/styles/cuentas.css";
import { useState } from "react";
import Cargando from "@/components/Cargando/Cargando";

export default function LoginPage(){

    let [visibilidadPassword, setVisibilidadPassword] = useState(false)
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
        if (response.status === 200) window.location.href = '/inicio';
        setError(json.message)
        setCargando(false)
    }

    function mostrarPassword(){
        setVisibilidadPassword(!visibilidadPassword);
    }

    return(
        <>
        {cargando && <Cargando />}
        <div className="bg">
            <div>
                <img src="/logoCuentas.svg" alt="Logo" className="w-20"/>
            </div>

            <div className="interfaz">
            <div><p className="text-4xl text-center">Bienvenido de vuelta</p></div>

            <form action={iniciarSesion} className="mt-4">
                <div className="entrada">
                    <span className='material-symbols-outlined'>person</span>
                    <div>
                        <input 
                            type="text" placeholder="Ingresá tu usuario" id='usuario' className="outline-none"
                            onChange={e => setUsuario(e.target.value)} value={usuario.toLowerCase().replaceAll(' ', '')}
                        />
                    </div>
                </div>
                <div className="entrada">
                    <div className="w-20 ml-1"><img src="/password.svg" alt="contraseña" /></div>
                    <div>
                        <input 
                            type={visibilidadPassword ? 'text' : "password"} placeholder='Ingresar contraseña' id='contraseña'
                            onChange={e => setContraseña(e.target.value)} value={contraseña} className="outline-none"
                        />
                    </div>

                    <button type="button" onClick={mostrarPassword}>
                        <span className="material-symbols-outlined">{visibilidadPassword ? "visibility" : "visibility_off"}</span>
                    </button>

                </div>
            </form>
            <button className="bg-[#0C0563] text-white rounded-3xl w-72 h-14 text-lg mt-4" onClick={iniciarSesion}>
                    Iniciar Sesión
                </button>
            </div>

            <div>
                <p className="text-center text-red-500">
                    {error}
                    </p>
            </div>


            <div>
                <p className="flex items-center gap-2"> ¿No tenés una cuenta? <a href="/register"><span className="text-blue-900"> Registrarse</span></a></p>
            </div>
        </div>
        </>
    )
}