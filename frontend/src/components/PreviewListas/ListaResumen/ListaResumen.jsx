import "./ListaResumen.css";
import { useState } from "react";
import ModalCompartir from "@/components/Modals/ModalCompartir/ModalCompartir";
import ModalQR from "@/components/Modals/ModalQR/ModalQR";
import Link from "next/link";
import { useRef } from "react";
import useClickOutside from "@/hooks/useClickOutside/useClickOutside";
import ModalEliminar from "@/components/Modals/ModalEliminar/ModalEliminar";
import Opciones from "@/components/Opciones/Opciones";

export default function ListaResumen({ grupal = false, nombreLista, fecha = "11/11/1111", id}){
    const [opcionesAbiertas, setOpcionesAbiertas] = useState(false);
    const [compartirAbierto, setCompartirAbierto] = useState(false);
    const [listaBorrada, setListaBorrada] = useState(false);
    const [QrAbierto, setQrAbierto] = useState(false);
    const [eliminarAbierto, setEliminarAbierto] = useState(false);

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

    let x = fecha.substring(8) + fecha.substring(4, 8) + fecha.substring(0, 4)

    fecha = x;

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
                    <Opciones 
                        opcionesAbiertas={opcionesAbiertas} opcionesRef={opcionesRef}
                        abrirOpciones={() => setOpcionesAbiertas(!opcionesAbiertas)}
                        callback1={abrirEliminar} text1="Eliminar" icon1="delete"
                        callback2={compartirLista} text2="Compartir" icon2="person_add"
                    />
                </div>
        </div>
    )
}