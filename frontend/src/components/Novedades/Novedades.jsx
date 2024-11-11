import "./Novedades.css";

export default function Novedades() {
    return(
        <div className="novedades">
            <h1>Novedades</h1>
            <div className="items">
                <div className="square">
                    <p className="text-xl font-medium">Se termina Proyecto!</p>
                    <p>It's finally over.</p>
                </div>
                <div className="square">
                    <p className="text-xl font-medium">Se avecina el modelo interno!</p>
                    <p className="text-sm">Nos encontramos todos los alumnos de tercer año investigando y preparándonos para ONU!</p>
                </div>
                <div className="square">
                    <p className="text-xl font-medium">Feliz Halloween!</p>
                    <p>Desde Listapp les deseamos a todos un muy feliz y tenebroso 31 de octubre.</p>
                </div>
            </div>
        </div>
    )
}