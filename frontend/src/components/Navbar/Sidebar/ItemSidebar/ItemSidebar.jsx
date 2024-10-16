import Link from "next/link";

export default function ItemSidebar({icon, text, href}){
    return(
    <Link href={href}>
        <div className="flex flex-row justify-start w-full"><span className="material-symbols-outlined">{icon}</span></div>
        <div className="flex flex-row justify-start w-full"><p>{text}</p></div>
    </Link>
    )
}