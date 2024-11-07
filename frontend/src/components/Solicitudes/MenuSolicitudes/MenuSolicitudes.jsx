"use client"
import Solicitud from "../Solicitud/Solicitud"


export default function MenuSolicitudes({solicitudes}){

    return(
        <div className="absolute right-0 top-full w-80 bg-white rounded-lg z-10">
            <div className="flex flex-col justify-center gap-4">
                {solicitudes.map(solicitud => {
                    return <Solicitud
                        nombre={solicitud.nombre} tag={solicitud.tag}
                    /> 
                })}
            </div>
        </div>
    )
}