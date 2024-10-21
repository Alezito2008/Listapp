import './Logo.css'

import Link from "next/link"

export default function Logo() {
    return(
        <Link href="/inicio" className="logo">
            <img src="/logoCuentas.svg" alt="Logo" />
            <h1>Listapp</h1>
        </Link>
    )
} 