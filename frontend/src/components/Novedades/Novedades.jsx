import "./Novedades.css";

export default function Novedades() {
    const items = [1, 2, 3, 4, 5];
    return(
        <div className="novedades">
            <h1>Novedades</h1>
            <div className="items">
                {items.map(item => (
                    <div key={item}>{item}</div>
                ))}
            </div>
        </div>
    )
}