import Link from "next/link";
import Cookies from "js-cookie";

export default function CerrarSesion({cerrarSide}){
    return(
        <Link href="/login" onClick={() => {Cookies.remove('token'); cerrarSide()}} className="w-72 item-menu pt-4 text-red-500">
            <span className="material-symbols-outlined">logout</span>
            <p>Cerrar Sesión</p>
        </Link>
    )
}