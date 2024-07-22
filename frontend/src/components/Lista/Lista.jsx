import Link from 'next/link'
import './Lista.css'

export default function Lista({ nombre, descripcion, idLista }) {
    return (
        <Link href={'/lista/' + idLista} className='lista'>
            <div>
                <span className='material-symbols-outlined'>
                    shopping_cart
                </span>
            </div>
            <div>
                <h2>{nombre}</h2>
                <p>{descripcion}</p>
            </div>
        </Link>
    )
}