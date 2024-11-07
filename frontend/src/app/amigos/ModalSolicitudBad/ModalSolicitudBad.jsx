

export default function ModalSolicitudBad({callback, error}){
    return(
        <>
        <div className="overlay" onClick={callback}></div>
        <div className="flex justify-center items-center size-full text-[#0C0563]">
            <div className="flex justify-around items-center bg-white flex-col z-10 rounded-2xl w-80 h-60 gap-12">
                    <div className="text-center">
                        <p className="text-xl">¡Error!</p>
                        <p>{error}</p>
                    </div>
                    <div className="flex flex-row gap-10">    
                        <button type="button" onClick={callback} className="flex justify-center items-center rounded-xl bg-gray-200 h-6 px-6 py-4">Aceptar</button>
                    </div>
            </div>
        </div>
        </>
    )
}