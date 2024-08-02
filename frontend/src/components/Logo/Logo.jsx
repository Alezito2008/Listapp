import './Logo.css'

import Link from "next/link"

export default function Logo() {
    return(
        <Link href="/inicio" className="logo">
            <img src="/logo.svg" alt="Logo" />
            <h1>Listapp</h1>
        </Link>
    )
} 