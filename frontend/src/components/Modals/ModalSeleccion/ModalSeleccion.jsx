import '@/styles/forms.css'
import "./ModalSeleccion.css"

export default function ModalSeleccion({ cerrarModal, abrirCrear, setTipoLista }) {
    return (
        <>
        <div className="overlay" onClick={cerrarModal}></div>
        <div className="modal">
            <form>
                <h1>Tipo de lista</h1>
                <div className="opciones">
                        <button className='opcion' onClick={() => {abrirCrear(); setTipoLista("compras"); cerrarModal()}}>
                            <span className="material-symbols-outlined">shopping_cart</span>
                            <p>Compras</p>
                        </button>
                        <button className='opcion' onClick={() => {abrirCrear(); setTipoLista("objetivos"); cerrarModal()}}>
                            <span className="material-symbols-outlined">checklist</span>
                            <p>Objetivos</p>
                        </button>
                </div>
            </form>
        </div>
        </>
    )
}