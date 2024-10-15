
export default function ModalCuenta({ callback, tipoDato } ){

    return(
        <>
            <div className="overlay" onClick={callback}></div>
            <div className="flex justify-center items-center size-full text-[#0C0563]">
                <div className={"flex justify-center items-center bg-white flex-col z-10 rounded-2xl w-1/4 " + (tipoDato == "contraseña" ? "h-2/3 gap-12" : "h-72 gap-20")}>
                    <div className="flex flex-col gap-10 justify-center items-start">
                        <p className="text-2xl">Cambiar {tipoDato}</p>
                        {tipoDato == "contraseña" && 
                            <div className="flex justify-start border-b-2 border-solid border-gray width-full">
                                <input type="password" placeholder="Contraseña actual" className="h-8 outline-none size-2/3" />
                            </div>
                        }
                        <div className="flex justify-start border-b-2 border-solid border-gray width-full">
                            <input type={tipoDato == "contraseña" ? "password" : "text"} placeholder={(tipoDato == "descripción" || tipoDato == "contraseña" ? "Nueva " : "Nuevo ") + tipoDato} className="h-8 outline-none size-2/3"/>
                        </div>
                        {tipoDato == "contraseña" && 
                            <div className="flex justify-start border-b-2 border-solid border-gray width-full">
                                <input type="password" placeholder="Repetir contraseña" className="h-8 outline-none size-2/3" />
                            </div>
                        }
                    </div>
                    <div className="flex flex-row gap-10">
                        <button type="button" onClick={callback} className="flex justify-center items-center rounded-xl bg-gray-200 h-6 px-6 py-4">Atrás</button>
                        <button type="button" onClick={callback} className="flex justify-center items-center rounded-xl bg-[#0C0563] text-white h-6 px-6 py-4">Guardar</button>
                    </div>
                </div>
            </div>
        </>
    )
}