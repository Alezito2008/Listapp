import "./ListaResumen.css";
import { useState } from "react";
import ModalCompartir from "@/components/Modals/ModalCompartir/ModalCompartir";
import ModalQR from "@/components/Modals/ModalQR/ModalQR";
import Link from "next/link";
import { useRef } from "react";
import useClickOutside from "@/hooks/useClickOutside/useClickOutside";
import ModalEliminar from "@/components/Modals/ModalEliminar/ModalEliminar";

export default function Lista({ grupal = false, nombreLista, fecha = "11/11/1111", id}){
    const [opcionesAbiertas, setOpcionesAbiertas] = useState(false);
    const [compartirAbierto, setCompartirAbierto] = useState(false);
    const [listaBorrada, setListaBorrada] = useState(false);
    const [QrAbierto, setQrAbierto] = useState(false);
    const [eliminarAbierto, setEliminarAbierto] = useState(false);

    function OpcionesApretadas(e) {
        e.stopPropagation();
        setOpcionesAbiertas((prev) => !prev);
    }

    const opcionesRef = useRef(null);

    useClickOutside(opcionesRef, () => setOpcionesAbiertas(false));

    function abrirEliminar(){
        setEliminarAbierto(!eliminarAbierto);
    }

    function borrarLista(){
        setListaBorrada(true);
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

                {  QrAbierto && <ModalQR 
                    cerrarModal={() => setQrAbierto(false)} 
                /> }

                {   eliminarAbierto && <ModalEliminar
                    cerrarModal={() => setEliminarAbierto(false)}
                    borrarLista={borrarLista}
                    listaId={id}
                /> }

                <Link href={"/listas/" + id} className="izquierda">
                    <img src={grupal ? "/personas.svg" : "/persona.svg"} alt="Ícono personas" />
                    <span>{nombreLista}</span>
                </Link>

                <div className="derecha">
                    <span>{fecha}</span>

                    <div className="opciones" ref={opcionesRef}>
                        <div className={opcionesAbiertas ? "menuOpciones" : "hidden"}>

                            <button onClick={abrirEliminar}>
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