
export default function ModalOpciones({callback}){
    return(
        <>
        <div className="overlay" onClick={callback}></div>
        <div className="flex justify-center items-center size-full text-[#0C0563]">
            <div className="flex justify-start items-start bg-white flex-col z-10 rounded-2xl w-1/4 h-80 gap-8 p-2">
                <p className="text-3xl text-center w-full">Configuración</p>
                <div className="flex flex-col gap-6 justify-start items-start">
                    <div className="flex flex-row gap-4">
                        <input type="checkbox" name="modo-oscuro" id="oscuro" /> <label htmlFor="oscuro">Modo Oscuro</label>
                    </div>
                    <div className="flex flex-row gap-4">
                        <input type="checkbox" name="Modo Accesible" id="accesible" /> <label htmlFor="accesible">Modo de Accesibilidad</label>
                    </div>
                    <div>
                        <select name="idioma" id="idioma" className="border-solid border-2 border-gray-600 rounded-lg p-2">
                            <option value="0" selected disabled>Idioma</option>
                            <option value="es-ar">Español (Argentina)</option>
                            <option value="es-es">Español (España)</option>
                            <option value="en-us">(US) English</option>
                            <option value="en-br">(British) English</option>
                        </select>
                    </div>
                </div>
                <div className="flex w-full justify-end flex-row gap-4 pt-4">
                    <button type="button" onClick={callback} className="flex justify-center items-center rounded-xl bg-gray-200 h-6 px-6 py-4">Atrás</button>
                    <button type="button" onClick={callback} className="flex justify-center items-center rounded-xl bg-[#0C0563] text-white h-6 px-6 py-4">Guardar</button>
                </div>
            </div>
        </div>
        </>
    )
}