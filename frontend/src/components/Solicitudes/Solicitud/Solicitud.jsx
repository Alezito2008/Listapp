"use client"
import "@/styles/iconSize.css"

export default function Solicitud({nombre, tag}){

    const enviarSolicitud = async () => {
        setCargando(true)
        const response = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/enviarsolicitud`,{
            method: "POST",
            headers: {"Content-Type": "application/json"},
            credentials: "include",
            body: JSON.stringify({
                "tagAmigo": añadirAmigo
            })
        })
        const data = await response.json()
        if(!data.error){
            setSolicitudOkAbierto(true)
        }
        else {
            setError(data.error)
            setSolicitudBadAbierto(true)
        }
        setCargando(false)
    }


    return(
        <div className="grid grid-cols-[auto_1fr_auto] gap-4 p-2 items-center text-[#0C0563]">
            <span className="material-symbols-outlined material-2rem">account_circle</span>
            <div className="grid grid-cols-2 items-center gap-2">
                <p>{nombre}</p>
                <p className="italic text-gray">@{tag}</p>
            </div>
            <div className="flex gap-2">
                <button type="button">
                    <span className="material-symbols-outlined material-2rem">check</span>
                </button>
                <button type="button">
                    <span className="material-symbols-outlined material-2rem">close</span>
                </button>
            </div>
        </div>
    )
}