"use client"
import Solicitud from "../Solicitud/Solicitud"


export default function MenuSolicitudes({solicitudes, abrirAceptado, setNombre, cerrarMenu}){

    return(
        <div className="absolute right-0 top-full w-80 bg-white rounded-lg z-10">
            <div className="flex flex-col justify-center items-center gap-4">
                {solicitudes.length > 0 ? solicitudes.map(solicitud => {
                    return <Solicitud
                        nombre={solicitud.nombre} tag={solicitud.tag}
                        abrirAceptado={abrirAceptado} setNombre={setNombre}
                        cerrarMenu={cerrarMenu}
                    /> 
                }):
                <p className="w-46 p-4 text-center">No tenés ninguna solicitud pendiente.</p>
            }
            </div>
        </div>
    )
}