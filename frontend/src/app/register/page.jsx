"use client"

import "@/styles/cuentas.css";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Cargando from "@/components/Cargando/Cargando";

export default function RegisterPage(){

    const router = useRouter();

    const [visibilidadPassword, setVisibilidadPassword] = useState(false);
    const [visibilidadPassword2, setVisibilidadPassword2] = useState(false);
    const [cargando, setCargando] = useState(false);

    let [usuario, setUsuario] = useState('');
    let [contraseña, setContraseña] = useState('');
    let [confirmarContraseña, setConfirmarContraseña] = useState('');
    let [error, setError] = useState('');

    function mostrarPassword(){
        setVisibilidadPassword(!visibilidadPassword);
    }

    function mostrarPassword2(){
        setVisibilidadPassword2(!visibilidadPassword2);
    }

    const registrarse = async () => {
        setError('')
        if (usuario.trim() === '' || contraseña.trim() === '') return setError('Por favor completá todos los campos')
        if (contraseña !== confirmarContraseña) return setError('Las contraseñas no coinciden')
        let data = {
            nombre: usuario,
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
        if (response.status === 200) window.location.href = '/inicio';
        setError(json.message)
        setCargando(false)
    }

    return(
        <>
        {cargando && <Cargando />}
        <div className="bg">
            <div>
            <img src="/logoCuentas.svg" alt="Logo" className="w-20"/>
            </div>
            <div className="interfaz">
                <div><p className="text-2xl text-center">Crear una cuenta de Listapp</p></div>

                <form action={registrarse}>
                    <div className='entrada'>
                            <span className='material-symbols-outlined'>person</span>

                            <input 
                                type='text' placeholder='Ingresar usuario' id='usuario' 
                                onChange={e => setUsuario(e.target.value)} value={usuario.toLowerCase().replaceAll(' ', '')} 
                            />
                    </div>

                    <div className='entrada'>
                        <div className="w-20 ml-1"><img src="/password.svg" alt="contraseña" /></div>

                        <div>
                            <input 
                                type={visibilidadPassword ? 'text' : "password"} placeholder='Ingresar contraseña' id='contraseña'
                                onChange={e => setContraseña(e.target.value)} value={contraseña}
                            />
                        </div>

                        <button onClick={mostrarPassword}>
                            <span className="material-symbols-outlined">{visibilidadPassword ? "visibility" : "visibility_off"}</span>
                        </button>
                    </div>

                    <div className="entrada">
                        <div className="w-20"><img src="/logo.svg" alt="check" /></div>

                        <div>
                            <input 
                                type={visibilidadPassword2 ? 'text' : "password"} placeholder='Repetir contraseña' id='confirmar-contraseña'
                                onChange={e => setConfirmarContraseña(e.target.value)} value={confirmarContraseña}
                            />
                            </div>
                        <button onClick={mostrarPassword2}>
                            <span className="material-symbols-outlined">{visibilidadPassword2 ? "visibility" : "visibility_off"}</span>
                        </button>
                    </div>
                </form>


                <button className="bg-[#0C0563] text-white rounded-3xl w-72 h-14 text-lg" onClick={registrarse}>
                    Registrarse
                </button>

            </div>

            <div>
                <p className="text-center text-red-500">
                    {error}
                    </p>
            </div>

            <div>
                <p className="flex items-center gap-2"> ¿Ya tenés una cuenta? <a href="/login"><span className="text-blue-900"> Iniciar Sesión</span></a></p>
            </div>
        </div>
        </>
    )
}