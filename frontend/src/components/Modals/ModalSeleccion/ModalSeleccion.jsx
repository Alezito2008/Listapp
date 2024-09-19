import '@/styles/forms.css'
import Link from 'next/link'

export default function ModalSeleccion({ cerrarModal }) {
    return (
        <>
        <div className="overlay" onClick={cerrarModal}></div>
        <div className="modal">
            <form action="">
                <h1>Tipo de lista</h1>
                <div className="opciones">
                    <Link href='/listas/crear/?tipo=compras'>
                        <div className='opcion'>
                            <span className="material-symbols-outlined">shopping_cart</span>
                            <p>Compras</p>
                        </div>
                    </Link>
                    <Link href='/listas/crear/?tipo=objetivos'>
                        <div className='opcion'>
                            <span className="material-symbols-outlined">checklist</span>
                            <p>Objetivos</p>
                        </div>
                    </Link>
                </div>
            </form>
        </div>
        </>
    )
}