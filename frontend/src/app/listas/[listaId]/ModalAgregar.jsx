import Boton from "@/components/Boton/Boton";
import { useState } from "react";

export default function ModalAgregar({ cerrarModal, agregarItem, itemInfo, setItemInfo }) {

    const { nombre, cantidad, medida } = itemInfo

    return (
        <>
            <div className="overlay !z-[6]" onClick={cerrarModal}></div>
            <div className='modal !z-[7]'>
                <h1 className='mb-4'>Agregar Item</h1>
                <form action={e => agregarItem(nombre, cantidad, medida)}>
                    <label htmlFor="nombre">Nombre<span className='text-red-500'>*</span></label>
                    <input type="text" id="nombre" placeholder='Nombre del item' onChange={e => setItemInfo({ ...itemInfo, nombre: e.target.value})} value={nombre} required/>
                    <div className="flex gap-4 mt-2">
                        <div className="flex flex-col">
                            <label htmlFor="cantidad">Cantidad<span className='text-red-500'>*</span></label>
                            <input type="number" id="cantidad" placeholder='123' onChange={e => setItemInfo({...itemInfo, cantidad: e.target.value})} value={cantidad} required/>
                        </div>
                        <div className="flex flex-col">
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
                    <div className='flex justify-center mt-4'>
                        <Boton texto={'Hecho'} icono={'check'} disabled={
                            !(nombre.trim() !== '' && cantidad && cantidad > 0)
                        }/>
                    </div>
                </form>
            </div>
        </>
    )
}