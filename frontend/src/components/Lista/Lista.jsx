import Link from 'next/link'
import './Lista.css'

export default function Lista({ nombre, descripcion, idLista, deshabilitado }) {
    return (
        <Link href={!deshabilitado ?  '/listas/' + idLista : '#'} className='lista'>
            <div>
                <span className='material-symbols-outlined'>
                    shopping_cart
                </span>
            </div>
            <div className='w-full pl-2'>
                <h2>{nombre}</h2>
                <p>{descripcion}</p>
            </div>
        </Link>
    )
}