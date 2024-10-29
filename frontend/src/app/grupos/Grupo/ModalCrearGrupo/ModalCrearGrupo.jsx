import "@/styles/iconSize.css"
import UsuarioCompartido from "../../UsuarioCompartido/UsuarioCompartido"

export default function ModalCrearGrupo({callback}){
    return(
        <>
        <div className="overlay" onClick={callback}></div>
        <div className="flex justify-center items-center size-full text-[#0C0563]">
            <div className="flex items-center bg-white flex-col z-10 rounded-2xl w-80 h-96 gap-6 p-4">
                    <div className="w-full flex flex-row justify-between items-center">
                        <div className="w-3/4 flex flex-col gap-4 text-center">
                            <p className="text-3xl">Crear un grupo</p>
                            <p>Añadí los miembros del grupo y ponele un nombre</p>
                        </div>
                        <div className="flex justify-center text-center items-center">
                            <span className="material-symbols-outlined material-3rem">group</span>
                        </div>
                    </div>
                    <div className="flex flex-col w-full pl-2 gap-4">
                        <div className="flex justify-start border-b-2 border-solid border-gray w-full px-2">
                            <input type="text" placeholder="Nombre del grupo" className="h-8 outline-none w-2/3"/>
                        </div>
                        <div className="flex justify-start border-4 border-solid border-blue-300 rounded-lg px-2 py-1 w-full">
                            <input type="text" placeholder="@usuario" className="h-8 outline-none w-2/3"/>
                        </div>
                    </div>

                    <div className="flex flex-col w-full items-center">
                        <UsuarioCompartido tag="usuario123" />
                    </div>

                    <div className="flex flex-row justify-center w-full gap-6">
                        <button type="button" 
                            onClick={callback} 
                            className="flex justify-center items-center rounded-2xl bg-gray-200 h-10 px-6 py-4">
                                Atrás
                        </button>
                        <button type="button" 
                            onClick={callback} 
                            className="flex justify-center items-center rounded-2xl bg-[#0C0563] text-white h-10 px-6 py-4">
                                Crear
                        </button>
                    </div>
            </div>
        </div>
        </>
    )
}