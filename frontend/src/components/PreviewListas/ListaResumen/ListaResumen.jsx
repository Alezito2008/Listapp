import "./ListaResumen.css";
import { useState } from "react";
import { io } from 'socket.io-client';

export default function Lista({ grupal, nombreLista, fecha, id}){
    const [opcionesAbiertas, setOpcionesAbiertas] = useState(false);
    const socket = io(process.env.NEXT_PUBLIC_SERVER_URL)

    function OpcionesApretadas(){
        setOpcionesAbiertas(!opcionesAbiertas);
    }

    const eliminarLista = async () => {
        const response = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/listas/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: 'include'
        })
        const data = await response.json()
        if (response.status === 200) return window.location.reload(true)
        return alert(data.message)
    }

    function compartirLista(){

    }

    return(
        <div className="lista">
                <div className="izquierda">
                    <img src={grupal ? "/personas.svg" : "/persona.svg"} alt="Ícono personas" />
                    <span>{nombreLista}</span>
                </div>
                <div className="derecha">
                    <span>{fecha}</span>
                    <div className="opciones">
                        <button type="button" onClick={OpcionesApretadas} style={{height: "100%"}}>
                            <img src="options.svg" alt="opciones" />
                        </button>
                        <div className={opcionesAbiertas ? "menuOpciones" : "hidden"}>
                            <button onClick={eliminarLista}>
                                <span className="material-symbols-outlined">delete</span>
                                <span>Eliminar</span>
                            </button>
                            <button style={{marginLeft: "0.65rem"}} onClick={compartirLista}>
                                <img src="/person_add.svg" alt="compartir" />
                                <span>Compartir</span>
                            </button>
                        </div>
                    </div>
                </div>
        </div>
    )
}