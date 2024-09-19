import Boton from "@/components/Boton/Boton";
import Cookies from "js-cookie";
import { useParams } from "next/navigation";

export default function ModalAgregar({ cerrarModal, itemInfo, setItemInfo, editando, socket, listaInfo }) {

    const { seleccionado, nombre, cantidad, medida } = itemInfo

    const { listaId } = useParams()
    const token = Cookies.get('token')

    const agregarItem = async (nombre, cantidadNecesitada, medida) => {
        socket.emit('agregar-item', { nombre, cantidadNecesitada, medida, listaId, token, tipo: listaInfo.tipo })
        cerrarModal()
    }

    const editarItem = (nombre, cantidadNecesitada, medida) => {
        const id = seleccionado

        socket.emit('actualizar-item', {
            listaId,
            token,
            id,
            nombre,
            cantidadNecesitada,
            medida
        })
        cerrarModal()
    }

    const eliminarItem = (id) => {
        socket.emit('eliminar-item', {
            listaId,
            token,
            id
        })
        cerrarModal()
    }

    return (
        <>
            <div className="overlay !z-[6]" onClick={cerrarModal}></div>
            <div className='modal !z-[7]'>
                <h1 className='mb-4'>
                    { editando ? 'Editar' : 'Agregar' } item
                </h1>
                <form action={e => {
                    if (editando) editarItem(nombre, cantidad, medida) 
                        else agregarItem(nombre, cantidad, medida)
                }}>
                    <label htmlFor="nombre">Nombre<span className='text-red-500'>*</span></label>
                    <input type="text" id="nombre" placeholder='Nombre del item' onChange={e => setItemInfo({ ...itemInfo, nombre: e.target.value})} value={nombre} required/>
                    { listaInfo.tipo === 'c' &&
                    <div className="segunda-fila">
                        <div className="flex flex-col">
                            <label htmlFor="cantidad">Cantidad<span className='text-red-500'>*</span></label>
                            <input type="number" id="cantidad" placeholder='123' onChange={e => setItemInfo({...itemInfo, cantidad: e.target.value})} value={cantidad} required/>
                        </div>
                        <div className="flex flex-col w-full">
                            <label htmlFor="medida">Medida<span className='text-red-500'>*</span></label>
                            <div className="select">
                                <select value={medida} onChange={e => setItemInfo({...itemInfo, medida: e.target.value})}>
                                    <option value="un">un</option>
                                    <option value="g">g</option>
                                    <option value="kg">kg</option>
                                    <option value="ml">ml</option>
                                    <option value="l">l</option>
                                </select>
                            </div>
                        </div>
                    </div>
                    }
                    <div className='flex justify-center mt-4 gap-3'>
                        <Boton texto={'Hecho'} icono={'check'} disabled={
                            !(nombre.trim() !== '' && cantidad && cantidad > 0 || nombre.trim() !== '' && listaInfo.tipo === 'o')
                        }/>
                        { editando && <Boton
                            nosubmit={true}
                            texto={'Eliminar'}
                            icono={'delete'}
                            color='var(--red)'
                            accion={e => {eliminarItem(seleccionado)}
                        }/> }
                    </div>
                </form>
            </div>
        </>
    )
}