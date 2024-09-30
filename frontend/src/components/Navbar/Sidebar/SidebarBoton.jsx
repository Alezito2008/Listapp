import "./Sidebar.css";

export default function SidebarBoton({abrirSide}){
    return(
            <button className="menu-logo" onClick={abrirSide}>
            <span className="material-symbols-outlined">menu</span>
            </button>
    )
}