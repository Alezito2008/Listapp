
export default function ModalAceptado({nombre, callback}){

    return(
        <>
        <div className="overlay" onClick={callback}></div>
        <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex justify-center items-center z-20">
            <div className="flex justify-around items-center bg-white flex-col z-10 rounded-2xl w-80 h-60 gap-12 text-[#0C0563]">
                    <div className="text-center">
                        <p className="text-xl">Solicitud Aceptada!</p>
                        <p>Ahora sos amigo con {nombre}.</p>
                    </div>
                    <div className="flex flex-row gap-10">    
                        <button type="button" onClick={callback} className="flex justify-center items-center rounded-xl bg-gray-200 h-6 px-6 py-4">Aceptar</button>
                    </div>
            </div>
        </div>
        </>
    )
}