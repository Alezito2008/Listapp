
export default function Opciones({opcionesAbiertas, abrirOpciones, opcionesRef, callback1, callback2, text1, text2, icon1, icon2}) {
    return(
        <div ref={opcionesRef}>
            <button type="button" onClick={abrirOpciones}><img src="/options.svg" alt="opciones" /></button>
            { opcionesAbiertas && 
                <div className="menuOpciones">

                <button type="button" onClick={callback1}>
                    <span className="material-symbols-outlined">{icon1}</span>
                    <span>{text1}</span>
                </button>

                <button type="button" onClick={callback2}>
                    <span className="material-symbols-outlined">{icon2}</span>
                    <span>{text2}</span>
                </button>
            </div>
            }
        </div>
    )
}