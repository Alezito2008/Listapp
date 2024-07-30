import './Sugerencia.css'

export default function Sugerencia({ nombre, skeleton, onClick }) {

    return (
        <div className={`sugerencia ${skeleton && 'skeleton'}`}>
            <p> {nombre} </p>
            { !skeleton && <span className='material-symbols-outlined' onClick={onClick}>add</span> }
        </div>
    )
}