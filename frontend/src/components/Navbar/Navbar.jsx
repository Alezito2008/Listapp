'use client'
import { usePathname } from 'next/navigation';
import './Navbar.css';
import Link from 'next/link';
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] })

export default function Navbar() {
    const pathname = usePathname()
    const path = pathname.split('/')[1]

    if (path === 'login') return null;

    return (
        <div className={'navbar ' + inter.className}>
            <div className={path === 'inicio' ? 'activo' : ''}>
                <Link href="/inicio">
                <span className="material-symbols-outlined">home</span>
                Inicio
                </Link>
            </div>
            <div className={path === 'listas' ? 'activo' : ''}>
                <Link href="/listas">
                <span className="material-symbols-outlined">format_list_bulleted</span>
                Listas
             </Link>
            </div>
            <div className={path === 'ajustes' ? 'activo' : ''}>
                <Link href="/ajustes">
                <span className="material-symbols-outlined">settings</span>
                Ajustes
                </Link>
            </div>
            <div className={path === 'cuenta' ? 'activo' : ''}>
                <Link href="/cuenta">
                <span className="material-symbols-outlined">person</span>
                Cuenta
                </Link>
            </div>
        </div>
    );
}
