'use client'

import Cookies from "js-cookie";

const cerrarSesion = () => {
    Cookies.remove('token')
    window.location.reload()
}

export default function CerrarSesion() {
    return <button onClick={cerrarSesion}>
            <span className='material-symbols-outlined'>logout</span>
            Cerrar sesión
    </button>
}