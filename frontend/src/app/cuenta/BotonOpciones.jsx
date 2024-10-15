
export default function BotonOpciones({ abrirOpciones }){
    return(
        <>
        <button type="button" onClick={abrirOpciones} className="pt-8 pr-8">
            <span className="material-symbols-outlined" id="vector">settings</span>
        </button>
        <style>{"#vector{font-size: 3rem !important; font-weight: 600}"}</style>
        </>
    )
}