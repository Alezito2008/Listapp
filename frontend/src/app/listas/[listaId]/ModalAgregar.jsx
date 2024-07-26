import Boton from "@/components/Boton/Boton";

export default function ModalAgregar({ cerrarModal, agregarItem, nombreItem, setNombreItem, cantidadItem, setCantidadItem }) {
    return (
        <>
            <div className="overlay !z-[6]" onClick={cerrarModal}></div>
            <div className='modal !z-[7]'>
                <h1 className='mb-4'>Agregar Item</h1>
                <form action={agregarItem}>
                    <label htmlFor="nombre">Nombre<span className='text-red-500'>*</span></label>
                    <input type="text" id="nombre" placeholder='Nombre del item' onChange={e => setNombreItem(e.target.value)} value={nombreItem}/>
                    <label htmlFor="cantidad">Cantidad<span className='text-red-500'>*</span></label>
                    <input type="number" id="cantidad" placeholder='123' onChange={e => setCantidadItem(e.target.value)} value={cantidadItem}/>
                    <div className='flex justify-center mt-4'>
                        <Boton texto={'Hecho'} icono={'check'} disabled={
                            !(nombreItem.trim() !== '' && cantidadItem !== null && cantidadItem > 0)
                        }/>
                    </div>
                </form>
            </div>
        </>
    )
}