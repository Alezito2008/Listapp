import "./ModalEliminar.css";
import "@/styles/forms.css";
import Cargando from "@/components/Cargando/Cargando";
import { useState } from "react";


export default function ModalEliminar({ cerrarModal, borrarLista, listaId }){
        const [cargando, setCargando] = useState(false);
        
        const eliminarLista = async () => {
            setCargando(true);
            const response = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/listas/${listaId}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json'
                },
                credentials: 'include'
            })
            setCargando(false);
            if (response.status === 200) borrarLista();
        }

    return(
        <>
            { cargando && <Cargando /> }
            <div className="overlay" onClick={cerrarModal}></div>
            <div className="fondo">

                <div className="flex items-center flex-col">
                    <h2>¿Seguro que querés borrar esta lista?</h2>
                    <p>Esta acción no se podrá deshacer luego.</p>
                </div>

                <div className="flex flex-row justify-end gap-5">
                    <button onClick={cerrarModal} className="rounded-3xl bg-[#E3E2E2] h-10 w-24">Atrás</button>
                    <button onClick={() => {eliminarLista(); cerrarModal()}} className="rounded-3xl bg-[#0C0563] text-[#E3E2E2] h-10 w-24">Borrar</button>
                </div>
            </div>
        </>
    )
}