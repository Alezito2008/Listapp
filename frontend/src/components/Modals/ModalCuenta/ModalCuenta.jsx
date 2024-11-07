"use client"
import { useState } from "react";
import Cargando from "@/components/Cargando/Cargando";
import Cookies from "js-cookie"

export default function ModalCuenta({ callback, tipoDato, infoCuenta } ){
    const [cargando, setCargando] = useState(false)
    const [dato, setDato] = useState("")
    const [contraseñaAnterior, setContraseñaAnterior] = useState("")
    const [repetirContraseña, setRepetirContraseña] = useState("")
    const [error, setError] = useState("")
    let datosEnviar = { ...infoCuenta, usuario: infoCuenta.tag };

    const enviarData = async () => {
        setCargando(true);
        await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/usuarios/${infoCuenta.tag}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            credentials: "include",
            body: JSON.stringify({
                "tag": datosEnviar.usuario,
                "nombre" : datosEnviar.nombre,
                "descripcion": datosEnviar.descripcion
            })
        });
        setCargando(false)
        Cookies.remove("token");
        window.location.href = "/login";
    }

    const cambiarContraseña = async () => {
        setCargando(true)
        const response = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/changepassword`, {
            method: "POST",
            headers: { "Content-Type": "application/json"},
            credentials: "include",
            body: JSON.stringify({
                "contraseñaAnterior": contraseñaAnterior,
                "nuevaContraseña": dato
            })
        })
        const data = await response.json()
        setCargando(false)
        if(data.error){
            setError("Contraseña incorrecta.")
            return
        }
        callback()
    }

    const guardar = () => {
        if(dato == "") {
            setError("Completá todos los campos.")
            return;
        }
        if(tipoDato == "contraseña"){
            if(dato != repetirContraseña){
                setError("Las contraseñas deben ser iguales.")
                return;
            }
            cambiarContraseña()
            return;
        }

        datosEnviar[tipoDato] = dato; 
        enviarData();
        callback()
    }

    return(
        <>
            {cargando && <Cargando />}
            <div className="overlay" onClick={callback}></div>
            <div className="flex justify-center items-center size-full text-[#0C0563]">
                <div className={"flex justify-center items-center bg-white flex-col z-10 rounded-2xl w-1/4 " + (tipoDato == "contraseña" ? "h-2/3 gap-12" : "h-72 gap-20")}>
                    <div className={"flex flex-col justify-center items-start gap-5"}>
                        <p className="text-2xl">Cambiar {tipoDato}</p>
                        {tipoDato == "contraseña" && 
                            <div className="flex justify-start border-b-2 border-solid border-gray width-full">
                                <input 
                                    type="password" placeholder="Contraseña actual" className="h-8 outline-none size-2/3" 
                                    onChange={e => setContraseñaAnterior(e.target.value)} value={contraseñaAnterior}
                                />
                            </div>
                        }
                        <div className="flex justify-start border-b-2 border-solid border-gray w-full">
                            <input 
                                type={tipoDato == "contraseña" ? "password" : "text"} 
                                placeholder={(tipoDato == "descripción" || tipoDato == "contraseña" ? "Nueva " : "Nuevo ") + tipoDato} 
                                className="h-8 outline-none size-2/3"
                                onChange={e => setDato(e.target.value)} value={dato}
                            />
                        </div>
                        {tipoDato == "contraseña" && 
                            <div className="flex justify-start border-b-2 border-solid border-gray width-full">
                                <input 
                                    type="password" placeholder="Repetir contraseña" className="h-8 outline-none size-2/3" 
                                    onChange={e => setRepetirContraseña(e.target.value)} value={repetirContraseña}
                                />
                            </div>
                        }
                            <span className="text-red-500 break-words text-center w-56">{error}</span>
                    </div>
                    <div className="flex flex-row gap-10">
                        <button type="button" onClick={callback} className="flex justify-center items-center rounded-xl bg-gray-200 h-6 px-6 py-4">Atrás</button>
                        <button type="button" onClick={guardar} className="flex justify-center items-center rounded-xl bg-[#0C0563] text-white h-6 px-6 py-4">Guardar</button>
                    </div>
                </div>
            </div>
        </>
    )
}