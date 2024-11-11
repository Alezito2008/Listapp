"use client"
import "@/styles/iconSize.css"

export default function Solicitud({nombre, tag, abrirAceptado, setNombre, cerrarMenu}){

    const aceptarSolicitud = async () => {
        const response = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/aceptarSolicitud`,{
            method: "POST",
            headers: {"Content-Type": "application/json"},
            credentials: "include",
            body: JSON.stringify({
                "tagAmigo": tag
            })
        })
        const data = await response.json()
        console.log(data)
        if(data.message == "Solicitud aceptada"){
            setNombre(nombre)
            cerrarMenu()
            abrirAceptado()
        }
    }


    return(
        <div className="grid grid-cols-[auto_1fr_auto] gap-4 p-2 items-center text-[#0C0563]">
            <span className="material-symbols-outlined material-2rem">account_circle</span>
            <div className="grid grid-cols-2 items-center gap-2">
                <p>{nombre}</p>
                <p className="italic text-gray">@{tag}</p>
            </div>
            <div className="flex gap-2">
                <button type="button" onClick={aceptarSolicitud}>
                    <span className="material-symbols-outlined material-2rem">check</span>
                </button>
                <button type="button">
                    <span className="material-symbols-outlined material-2rem">close</span>
                </button>
            </div>
        </div>
    )
}