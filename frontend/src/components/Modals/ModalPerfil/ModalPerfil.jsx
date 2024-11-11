
export default function ModalPerfil({callback, infoAmigo}){
    return(
        <>
            <div className="overlay" onClick={callback}></div>
            <div className="flex justify-center items-center size-full text-[#0C0563]">
                <div className="flex justify-around items-center bg-white flex-col z-10 rounded-2xl w-96 h-72 gap-12">
                    <div className="flex flex-row gap-10 justify-center items-start">
                        <div className="rounded-xl border-solid border-4 border-[#0C0563] size-32 flex justify-center items-center">
                            <span className="material-symbols-outlined material-8rem">person</span>
                        </div>
                        <div className="flex flex-col justify-between gap-4">
                            <div>
                                <p className="text-3xl">{infoAmigo.nombre}</p>
                                <p className="text-xl">@{infoAmigo.tag}</p>
                            </div>
                            <div>
                                <p>Fecha de registro:</p>
                                <p>dd/mm/yy</p>
                            </div>
                        </div>
                    </div>
                <div className="flex flex-row gap-10">
                    <button type="button" onClick={callback} className="flex justify-center items-center rounded-xl bg-gray-200 h-6 px-6 py-4">Cerrar</button>
                </div>
                </div>
            </div>
        </>
    )
}