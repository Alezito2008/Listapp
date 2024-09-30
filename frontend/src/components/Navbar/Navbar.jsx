'use client'
import './Navbar.css';
import Link from 'next/link';
import Logo from '../Logo/Logo';
import SidebarBoton from './Sidebar/SidebarBoton';
// import { useState } from 'react';
// import { useRouter } from 'next/navigation';
// import { useEffect } from 'react';
// import Avatar from '../Avatar/Avatar';
// import Cookies from 'js-cookie';
// import jwt from "jsonwebtoken";
// import Usuario from '../Usuario/Usuario';

export default function Navbar({ children, abrirSide }) {
    // const [info, setInfo] = useState(null);
    // const router = useRouter();

    // useEffect(() => {
    //         const checkAuth = async () => {
    //             try {
    //                 const token = Cookies.get("token");
    //                 if(!token) throw new Error("No token found");
    //                 const decoded = jwt.verify(token, process.env.NEXT_PUBLIC_JWT_SECRET);
    //                 setInfo(decoded);
    //             }
    //             catch(error){
    //                 if(router.pathname != "/login")
    //                     router.push("/login");
    //             }
    //         }

    //         if(typeof window !== "undefined") checkAuth();

    // }, [router]);

    return (
        <div className='navbar'>
            <div className='sidelogo'>
                <div>   
                    <SidebarBoton abrirSide={abrirSide} />
                    { children }
                </div>
                <div>
                    <Logo />
                </div>
            </div>
            <div>
                <Link href="/cuenta">
                    <img src="/perfil.svg" alt="Avatar" />
                </Link>
            </div>
        </div>
    );
}
