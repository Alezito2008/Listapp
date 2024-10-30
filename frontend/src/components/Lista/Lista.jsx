import Link from 'next/link'
import Opciones from '../Opciones/Opciones'
import "@/styles/iconSize.css"
import { useState } from 'react'
import { useRef } from 'react'
import useClickOutside from '@/hooks/useClickOutside/useClickOutside'
import ModalEliminar from '../Modals/ModalEliminar/ModalEliminar'
import ModalCompartir from '../Modals/ModalCompartir/ModalCompartir'
import ModalQR from '../Modals/ModalQR/ModalQR'

export default function Lista({ nombre, idLista, tipo, grupal=false, fecha }) {
    const [opcionesAbiertas, setOpcionesAbiertas] = useState(false)
    const [eliminarAbierto, setEliminarAbierto] = useState(false)
    const [compartirAbierto, setCompartirAbierto] = useState(false)
    const [QrAbierto, setQrAbierto] = useState(false)
    const [listaBorrada, setListaBorrada] = useState(false)
    const opcionesRef = useRef(null)

    useClickOutside(opcionesRef, () => setOpcionesAbiertas(false))

    let x = fecha.substring(8) + fecha.substring(4, 8) + fecha.substring(0, 4)

    fecha = x;
    return (
        <>
        {   eliminarAbierto && <ModalEliminar
                cerrarModal={() => setEliminarAbierto(false)}
                borrarLista={() => setListaBorrada(true)}
                listaId={idLista}
        /> }

        {   compartirAbierto && <ModalCompartir
                cerrarModal={() => setCompartirAbierto(false)}
                listaId={idLista}
                abrirQR={() => setQrAbierto(true)}

        /> }

        {   QrAbierto && <ModalQR
                cerrarModal={() => setQrAbierto(false)}
        /> }

        <div className={listaBorrada ? "hidden" : 'flex flex-row items-center justify-between w-full bg-white min-h-16 rounded-2xl p-2'}>
            <div className='flex flex-row justify-between w-1/2 h-full'>   
                <Link href={'/listas/' + idLista} className='w-40 pt-2'>
                    <div className='pr-4'>
                        <span className={'material-symbols-outlined material-3rem ' + (tipo == "c" ? "text-[#862FCB]" : "text-[#088FF0]")}>
                            {tipo === 'c' ? 'shopping_cart' : 'checklist'}
                        </span>
                    </div>
                    <div className='w-24 flex justify-center items-center'>
                        <p className='text-xl text-center break-all'>{nombre}</p>
                    </div>
                </Link>
                <div className='flex justify-center items-center h-full pl-4'>
                    <span className='material-symbols-outlined material-3rem'>{grupal ? "group" : "person"}</span>
                </div>
            </div>
            <div className='w-1/3'>

            </div>
            <div className='flex flex-row justify-between w-1/2'>
                <div>
                    <p>{fecha}</p>
                </div>
                <Opciones opcionesAbiertas={opcionesAbiertas} abrirOpciones={() => setOpcionesAbiertas(!opcionesAbiertas)} opcionesRef={opcionesRef}
                    callback1={() => setEliminarAbierto(true)} text1="Eliminar" icon1="delete"
                    callback2={() => setCompartirAbierto(true)} text2="Compartir" icon2="person_add"
                />
            </div>
        </div>
        </>
    )
}