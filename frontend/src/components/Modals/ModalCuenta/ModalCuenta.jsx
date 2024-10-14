import "@/styles/forms.css"
import Cargando from "@/components/Cargando/Cargando"
import { useState } from "react"

export default function ModalCuenta({ callback }){

    const [cargando, setCargando] = useState(false)
    return(
        <>
            {cargando && <Cargando />}
            <div className="overlay" onClick={callback}></div>
            <div className="fondo flex justify-center align-center">
                <div className="flex justify-center align-center bg-white size-20"></div>
            </div>
        </>
    )
}