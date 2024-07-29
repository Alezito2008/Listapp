'use server'

// TODO: Pedir iniciar sesión en caso de no estarlo

import Lista from '@/components/Lista/Lista'
import './styles.css'
import BotonUnirse from './BotonUnirse'

export default async function InvitacionPage({ params }) {

    const { token } = params

    const response = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/invitacion/${token}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    })
    const data = await response.json()
    if (response.status !== 200) return <h1>Invitación no válida</h1>

    const { creador, lista, descripcion } = data

    return (
        <div className="invitacion-page">
        <h1> <span className='text-[#3BC7DA]'>{creador}</span> te invitó a una lista </h1>
        <Lista nombre={lista} descripcion={descripcion} deshabilitado={true}/>
        <div className="flex justify-center mt-5">
            <BotonUnirse token={token} />
        </div>
        </div>
    )
}