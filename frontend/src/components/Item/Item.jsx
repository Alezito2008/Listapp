import { useEffect, useState } from 'react'
import './Item.css'
import Cookies from 'js-cookie'

export default function Item(props) {

    const token = Cookies.get('token')

    const { id, nombre, cantidadNecesitada, socket, listaId } = props
    const [marcado, setMarcado] = useState(props.marcado)


    const marcarItem = () => {
        socket.emit('actualizar-item',
        {
            listaId,
            token,
            id,
            marcado: !marcado
        })
        setMarcado(!marcado)
    }

    const eliminarItem = () => {
        socket.emit('eliminar-item', 
            {
                listaId,
                token,
                id
            }
        )
    }

    return (
        <div className='flex items-center'>
            <div className='item' onClick={marcarItem}>
                <div className={`checkbox ${props.marcado && 'checked'}`}></div>
                <div className={`nombre ${props.marcado && 'checked'}`}>{nombre}</div>
                <div className='cantidad'>
                    <span>
                        {cantidadNecesitada}
                        <span className='text-gray-500 text-sm'>{props.medida}</span>
                    </span>
                </div>
            </div>
            <span className='material-symbols-outlined text-red-400 ml-2' onClick={eliminarItem}>delete</span>
        </div>
    )
}