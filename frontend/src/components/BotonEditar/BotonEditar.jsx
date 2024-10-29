
export default function BotonEditar({callback}){
    return(
            <button type="button" onClick={callback}>
                <span className="material-symbols-outlined editar">edit</span>
            </button>
    )
}