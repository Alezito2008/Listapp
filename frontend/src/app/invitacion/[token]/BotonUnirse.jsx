'use client'

import Boton from "@/components/Boton/Boton"

export default function BotonUnirse({ token }) {

    const unirseALista = async () => {
        const response = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/listas/unirse`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: 'include',
            body: JSON.stringify({ token })
        })
        const data = response.json()
        if (response.status !== 200) alert('Error al unirse a la lista')
        window.location.href = '/'
    }

    return (
        <form action={unirseALista}>
            <Boton texto='Unirse' icono='check'/>
        </form>
    )
}