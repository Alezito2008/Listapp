import './Boton.css'

export default function Boton({ icono, texto }) {

    return (
        <button className="boton">
            <span className='material-symbols-outlined'>
                {icono}
            </span>
            {texto}
        </button>
    )
}