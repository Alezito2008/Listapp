import './Logo.css'

import Link from "next/link"

export default function Logo() {
    return(
        <Link href="/inicio" className="logo">
            <img src="/logoCuentas.svg" alt="Logo" />
            <div className='flex flex-col'>
                <h1>Listapp</h1>
                <p>Tus listas de confianza.</p>
            </div>
        </Link>
    )
} 