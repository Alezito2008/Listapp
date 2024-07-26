import './Sugerencia.css'

export default function Sugerencia({ nombre, cerrarModal, cantidad, setNombreItem, setCantidadItem, setAgregarAbierto, skeleton }) {

    const abrirAgregar = () => {
        setNombreItem(nombre)
        setCantidadItem(1)
        cerrarModal()
        setAgregarAbierto(true)
    }

    return (
        <div className={`sugerencia ${skeleton && 'skeleton'}`}>
            <p> {nombre} </p>
            { !skeleton && <span className='material-symbols-outlined' onClick={abrirAgregar}>add</span> }
        </div>
    )
}