"use client"
import Link from "next/link";
import { useState, useEffect } from "react"
import { usePathname } from "next/navigation";

export default function ModalExpirado(){
    const [modalAbierto, setModalAbierto] = useState(false)
    const path = usePathname()

    const obtenerInfo = async (signal) => {
        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/account`, {
                method: "GET",
                headers: { "Content-Type": "application/json" },
                credentials: "include",
                signal,
            });
            const data = await response.json();
            if (data.message) {
                if(path == "/login" || path == "/register") return;
                setModalAbierto(true)
                return
            }
        } catch (error) {
            if (error.name !== "AbortError") {
                console.error("Fetch error:", error);
            }
        }
    };

    useEffect(() => {
        const controller = new AbortController();
        obtenerInfo(controller.signal);

        return () => {
            controller.abort();
        };
    }, []); 

    return(
        <>
        {   modalAbierto && 
            <>
            <div className="overlay"></div>
            <div className="flex justify-center items-center size-full text-[#0C0563]">
                <div className="flex justify-between p-10 items-center bg-white flex-col z-10 rounded-2xl w-96 h-96">
                        <div className="text-center">
                            <p className="text-xl">Necesitás estar logueado para usar Listapp. Creá una cuenta o volvé a loguearte!</p>
                            <p>Tu sesión puede haber expirado.</p>
                        </div>
                        <div className="flex flex-row gap-10">    
                            <Link href="/login">
                                <button type="button" 
                                    onClick={() => setModalAbierto(false)} 
                                    className="flex justify-center items-center rounded-3xl bg-[#0C0563] text-white text-2xl h-10 px-24 py-8">
                                        Ir a Log-in
                                    </button>
                            </Link>
                        </div>
                </div>
            </div>
            </>
        }
        </>
    )
}