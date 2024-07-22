import './Boton.css'

export default function Boton({ icono, texto, disabled }) {

    return (
        <button className="boton" disabled={disabled}>
            <span className='material-symbols-outlined'>
                {icono}
            </span>
            {texto}
        </button>
    )
}