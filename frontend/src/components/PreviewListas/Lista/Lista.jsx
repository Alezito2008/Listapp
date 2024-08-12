import "./Lista.css";

export default function Lista({ grupal, nombreLista, fecha}){
    return(
        <div className="lista">
            <img src={grupal ? "/personas.svg" : "/persona.svg"} alt="Ícono personas" />
            <span>{nombreLista}</span>
            <span>{fecha}</span>
            <span className="material-icons-outlined">more horizontal</span>
        </div>
    )
}