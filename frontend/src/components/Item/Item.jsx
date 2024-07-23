import { useEffect, useState } from 'react'
import './Item.css'
import Cookies from 'js-cookie'

export default function Item(props) {

    const token = Cookies.get('token')

    const { id, nombre, cantidadNecesitada, socket, listaId } = props
    const [cantidadConseguida, setCantidadConseguida] = useState(props.cantidadConseguida)
    const [checked, setChecked] = useState(false)

    useEffect(() => {
        setCantidadConseguida(props.cantidadConseguida)
        if (props.cantidadConseguida === props.cantidadNecesitada) setChecked(true)
            else setChecked(false)
    }, [props])

    const aumentarCantidad = () => {
        if (cantidadConseguida + 1 === cantidadNecesitada) setChecked(true)
        if (cantidadConseguida === cantidadNecesitada) return
        socket.emit('actualizar-item', 
            {
                listaId,
                token,
                id,
                cantidadConseguida: cantidadConseguida + 1
            })
        setCantidadConseguida(cantidadConseguida + 1)
    }

    const disminuirCantidad = () => {
        if (cantidadConseguida === 0) return
        setChecked(false)
        setCantidadConseguida(cantidadConseguida - 1)
        socket.emit('actualizar-item', 
            {
                listaId,
                token,
                id,
                cantidadConseguida: cantidadConseguida - 1
            })
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
            <div className='item'>
                <div className='absolute w-1/2 h-full left-0' onClick={disminuirCantidad}></div>
                <div className='absolute w-1/2 h-full right-0' onClick={aumentarCantidad}></div>
                <div className={`checkbox ${checked && 'checked'}`}></div>
                <div className={`nombre ${checked && 'checked'}`}>{nombre}</div>
                <div className='cantidad'>
                    {/* <span className='material-symbols-outlined' onClick={aumentarCantidad}>keyboard_arrow_up</span> */}
                    {/* <span className='material-symbols-outlined' onClick={disminuirCantidad}>keyboard_arrow_down</span> */}
                    <span>{cantidadConseguida}/{cantidadNecesitada}</span>
                </div>
            </div>
            <span className='material-symbols-outlined text-red-400 ml-2' onClick={eliminarItem}>delete</span>
        </div>
    )
}