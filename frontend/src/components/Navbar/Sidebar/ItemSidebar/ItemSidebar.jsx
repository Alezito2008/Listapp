import Link from "next/link";

export default function ItemSidebar({icon, text, href}){
    return(
    <Link href={href} className="w-40 item">
        <div className="flex flex-row justify-start"><span className="material-symbols-outlined">{icon}</span></div>
        <div className="flex flex-row justify-start"><p>{text}</p></div>
    </Link>
    )
}