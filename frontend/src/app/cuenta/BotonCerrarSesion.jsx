'use client'

import Cookies from "js-cookie"

const cerrarSesion = () => {
    Cookies.remove('token')
    window.location.href = "/login";
}

export default function CerrarSesion() {
    return <>
        <div className='cerrarSesion text-2xl' onClick={cerrarSesion}>
            <span className='material-symbols-outlined'>logout</span>
            Cerrar sesión
        </div>
    </>
}