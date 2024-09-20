import "./ListaResumen.css";
import { useState } from "react";
import ModalCompartir from "@/components/Modals/ModalCompartir/ModalCompartir";
import Link from "next/link";

//falta click afuera de menuOpciones = cerrar menu
//falta popup de confirmación de eliminación de listas

export default function Lista({ grupal, nombreLista, fecha, id}){
    const [opcionesAbiertas, setOpcionesAbiertas] = useState(false);
    const [compartirAbierto, setCompartirAbierto] = useState(false);
    const [listaBorrada, setListaBorrada] = useState(false);

    function OpcionesApretadas(){
        setOpcionesAbiertas(!opcionesAbiertas);
    }

    function borrarLista(){
        setListaBorrada(true);
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
        if (response.status === 200) borrarLista();
    }

    function compartirLista(){
    }

    function compartirLista(){
        setCompartirAbierto(true);
    }

    return(
        <div className={listaBorrada ? "hidden" : "listaResumen"}>
                { compartirAbierto && <ModalCompartir
                    listaId={id}
                    cerrarModal={() => setCompartirAbierto(false)}
                    abrirQR={() => setQrAbierto(true)}
                /> }

                <Link href={"/listas/" + id} className="izquierda">
                    <img src={grupal ? "/personas.svg" : "/persona.svg"} alt="Ícono personas" />
                    <span>{nombreLista}</span>
                </Link>
                <div className="derecha">
                    <span>{fecha}</span>
                    <div className="opciones">
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
                        <button type="button" onClick={OpcionesApretadas} style={{height: "100%"}}>
                            <img src="options.svg" alt="opciones" />
                        </button>
                    </div>
                </div>
        </div>
    )
}