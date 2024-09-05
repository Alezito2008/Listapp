import "./ListaResumen.css";

export default function Lista({ grupal, nombreLista, fecha}){
    return(
        <div className="lista">
                <div className="izquierda">
                    <img src={grupal ? "/personas.svg" : "/persona.svg"} alt="Ícono personas" />
                    <span>{nombreLista}</span>
                </div>
                <div className="derecha">
                    <span>{fecha}</span>
                    <button type="button" className="opciones">
                    <img src="options.svg" alt="opciones" />
                    </button>
                </div>
        </div>
    )
}