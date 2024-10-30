import { useState } from 'react'
import './Item.css'
import Cookies from 'js-cookie'

export default function Item(props) {

    const token = Cookies.get('token')

    const { id, nombre, cantidadNecesitada, socket, listaId, setItemInfo, abrirEditar, medida, listaInfo } = props
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

    const editar = () => {
        setItemInfo(prev => {
            return {
                ...prev,
                seleccionado: id,
                nombre,
                cantidad: cantidadNecesitada,
                medida
            }
        })
        abrirEditar()
    }

    return (
        <div className='flex items-center'>
            <div className='item'>
                <div className={`checkbox ${props.marcado && 'checked'}`} onClick={marcarItem}></div>
                <div className={`nombre ${props.marcado && 'checked'} text-2xl`} onClick={marcarItem}>{nombre}</div>
                <div className='cantidad'>
                    { listaInfo.tipo === 'c' &&
                        <span className='text-xl'>
                            {cantidadNecesitada}
                            <span className='text-gray-500 text-base'>{props.medida}</span>
                        </span>
                    }
                </div>
                <div className="editar">
                    <span className="material-symbols-outlined" onClick={editar}>edit</span>
                </div>
            </div>
        </div>
    )
}