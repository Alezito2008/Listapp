import './styles.css'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import Avatar from '@/components/Avatar/Avatar'
import CerrarSesion from './BotonCerrarSesion'


const jwt = require('jsonwebtoken')
require('dotenv').config()

export default function CuentaPage() {

    const cookieStore = cookies()

    let info
    try {
        const token = cookieStore.get('token').value
        info = jwt.verify(token, process.env.JWT_SECRET)
    } catch {
        return redirect('/login')
    }

    const { nombre, tag } = info

    return (
        <div className="cuenta">
            <h1>{info.nombre}</h1>
            <Avatar value={info.tag} style='shape' size={180} />
            <h2>Acerca de ti</h2>
            <div className='w-full text-[1.5] mt-3 contenedor-info'>
            <div>Nombre</div>
            <div className='ml-auto text-gray-600 flex items-center'>
                {nombre}
                {/* <span className='material-symbols-outlined ml-3'>edit</span> */}
                </div>
            </div>
            <div className='w-full text-[1.5] mt-5 contenedor-info'>
                <div>Nombre de usuario</div>
                <div className='ml-auto text-gray-600 flex items-center'>
                    @{tag}
                    {/* <span className='material-symbols-outlined ml-3'>edit</span> */}
                </div>
            </div>
            <CerrarSesion />
        </div>
    )
}
