import Image from 'next/image'
import './styles.css'

export default function CuentaPage() {
    return (
        <div className="cuenta">
            <h1>John Doe</h1>
            <Image src="/placeholder.png" alt="John Doe" width={200} height={200} />
            <h2 className='text-gray-500 font-medium w-full mt-10 mb-7'>Acerca de ti</h2>
            <div className='flex w-full text-[1.5] mt-3'>
                <div>Nombre</div>
                <div className='ml-auto text-gray-600 flex items-center'>John Doe
                    <span className='material-symbols-outlined ml-3'>edit</span>
                </div>
            </div>
            <div className='flex w-full text-[1.5] mt-5'>
                <div>Nombre de usuario</div>
                <div className='ml-auto text-gray-600 flex items-center'>@johndoe
                    <span className='material-symbols-outlined ml-3'>edit</span>
                </div>
            </div>
            <div className='cerrar-sesion'>
                <span className='material-symbols-outlined'>logout</span>
                Cerrar sesión
            </div>
        </div>
    )
}