import './Boton.css'

export default function Boton({ icono, texto, disabled, color, nosubmit, accion }) {

    return (
        <button className='boton' disabled={disabled} style={{backgroundColor: color}} type={nosubmit && 'button'} onClick={accion}>
            <span className='material-symbols-outlined'>
                {icono}
            </span>
            {texto}
        </button>
    )
}