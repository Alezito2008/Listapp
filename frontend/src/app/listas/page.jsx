import Boton from '@/components/Boton/Boton';
import './styles.css';
import Lista from '@/components/Lista/Lista';
import { cookies } from 'next/headers';
import Link from 'next/link';
import { redirect } from 'next/navigation';

export default async function ListasPage() {

    const cookieStore = cookies()
    const allCookies = cookieStore.getAll()
    const cookieHeader = allCookies.map(cookie => `${cookie.name}=${cookie.value}`).join('; ');

    const response = await fetch('http://localhost:5000/listas', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Cookie': cookieHeader
        },
    })
    const data = await response.json()
    if (response.status === 401) {
        redirect('/login')
    }

    return (
        <div className="listas">
            <div className='flex justify-between items-center'>
                <h1>Listas</h1>
                <Link href='/listas/crear'>
                    <Boton icono='add' texto='Nueva' />
                </Link>
            </div>
            <div className='contenedor-listas'>
                {!data.message && data.map(lista => (
                    <Lista key={lista.id} nombre={lista.nombre} descripcion={lista.descripcion} idLista={lista.id} />
                ))}
                {data.message && <p>{data.message}</p>}
            </div>
        </div>
    )
}