import Avvvatars from 'avvvatars-react'
import './Usuario.css'

export default function Usuario({ nombre, tag, eliminar, listaId, eliminarUsuario }) {

    return (
        <div className='usuario'>
            <Avvvatars style='shape' value={tag} size={40} />
            <div>
                <div>{nombre}</div>
                <div className='tag'>@{tag}</div>
            </div>
            {eliminar && <div>
                <span className="material-symbols-outlined eliminar" onClick={e => eliminarUsuario(tag)}>delete</span>
            </div>}
        </div>
    )
}