import Link from 'next/link'
import "./Lista.css"

export default function Lista({ nombre, descripcion, idLista, tipo }) {
    return (
        <Link href={'/listas/' + idLista} className='w-full bg-white h-16 rounded-2xl p-8'>
            <div className='flex flex-row gap-8 items-center'>
                <div>
                    <span className='material-symbols-outlined icon'>
                        {tipo === 'c' ? 'shopping_cart' : 'checklist'}
                    </span>
                </div>
                <div>
                    <p className='text-3xl'>{nombre}</p>
                </div>
            </div>
            <div className=''>
                <p>{descripcion}</p>
            </div>
        </Link>
    )
}