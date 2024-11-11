
export default function ModalBloquear({callback, infoAmigo}){
    return(
        <>
        <div className="overlay" onClick={callback}></div>
        <div className="flex justify-center items-center size-full text-[#0C0563]">
            <div className="flex justify-around items-center bg-white flex-col z-10 rounded-2xl w-96 h-60 gap-12">
                    <div className="text-center">
                        <p className="text-xl">¿Seguro que querés bloquear a <span className="">{infoAmigo.nombre}</span>?</p>
                        <p>No será notificado de esta acción</p>
                    </div>
                    <div className="flex flex-row gap-10">    
                        <button type="button" onClick={callback} className="flex justify-center items-center rounded-xl bg-gray-200 h-6 px-6 py-4">Cerrar</button>
                        <button type="button" onClick={callback} className="flex justify-center items-center rounded-xl bg-[#0C0563] text-white h-6 px-6 py-4">Bloquear</button>
                    </div>
            </div>
        </div>

        </>
    )
}