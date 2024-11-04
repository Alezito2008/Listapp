import "@/styles/forms.css";
import Boton from "@/components/Boton/Boton";
import Sugerencia from "@/components/Sugerencia/Sugerencia";
import { useState } from "react";

export default function ModalAI({ cerrarModal, setAgregarAbierto, receta, setReceta, setItemInfo }) {

    const [comida, setComida] = useState('')
    const [cargandoRecetas, setCargandoRecetas] = useState(false)

    const buscarReceta = async (e) => {
        e.preventDefault()
        setCargandoRecetas(true)
        const response = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/ai/receta`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ comida }),
            credentials: 'include'
        })
        const data = await response.json()

        if (response.status === 200)  { 
            setReceta(data)
            setCargandoRecetas(false)
            return
        }
        alert(data.message)
    }

    return (
        <>
            <div className="overlay" onClick={cerrarModal}></div>
            <div className="modal max-w-96 pt-20">
                <h1 className="flex items-center mb-4">
                    IA <span className="material-symbols-outlined bolt ">bolt</span>
                </h1>
                <form onSubmit={buscarReceta}>
                    <label htmlFor="comida">Comida<span className="text-red-500">*</span></label>
                    <input type="text" id="comida" placeholder="Nombre de la comida" required maxLength={20} onChange={e => setComida(e.target.value)} value={comida}/>
                    <div className="sugerencias">
                        { cargandoRecetas && 
                            Array.from({length: 5}).map((_, index) => <Sugerencia key={index} nombre='&nbsp;' skeleton={true} />)
                        }
                        { !cargandoRecetas && receta && receta.map(({ nombre, cantidad, medida }, index) =>
                            <Sugerencia key={index}
                                nombre={nombre.charAt(0).toUpperCase() + nombre.slice(1)}
                                cantidad={cantidad}
                                medida={medida}
                                cerrarModal={cerrarModal}
                                onClick={() => {
                                    setItemInfo({ nombre, cantidad, medida })
                                    setAgregarAbierto(true)
                                    cerrarModal()
                                }}
                            />
                        ) }
                    </div>
                    <div className="flex justify-center mt-4">
                        <Boton texto="Generar" icono="bolt" disabled={comida.trim() === ''} />
                    </div>
                </form>
            </div>
        </>
    )
}