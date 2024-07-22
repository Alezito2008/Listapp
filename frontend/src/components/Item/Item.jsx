import { useState } from 'react'
import './Item.css'

export default function Item(props) {

    const { nombre, cantidadNecesitada } = props
    const [cantidadConseguida, setCantidadConseguida] = useState(props.cantidadConseguida)
    const [checked, setChecked] = useState(false)

    const aumentarCantidad = () => {
        if (cantidadConseguida + 1 === cantidadNecesitada) setChecked(true)
        if (cantidadConseguida === cantidadNecesitada) return
        setCantidadConseguida(cantidadConseguida + 1)
    }

    const disminuirCantidad = () => {
        if (cantidadConseguida === 0) return
        setChecked(false)
        setCantidadConseguida(cantidadConseguida - 1)
    }

    return (
        <div className='flex items-center'>
            <div className='item'>
                <div className={`checkbox ${checked && 'checked'}`}></div>
                <div className={`nombre ${checked && 'checked'}`}>{nombre}</div>
                <div className='cantidad'>
                    <span className='material-symbols-outlined' onClick={aumentarCantidad}>keyboard_arrow_up</span>
                    <span className='material-symbols-outlined' onClick={disminuirCantidad}>keyboard_arrow_down</span>
                    <span>{cantidadConseguida}/{cantidadNecesitada}</span>
                </div>
            </div>
            <span className='material-symbols-outlined text-red-400 ml-2'>delete</span>
        </div>
    )
}