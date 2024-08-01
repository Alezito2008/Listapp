import { useQRCode } from "next-qrcode"
import { useParams } from "next/navigation"
import { useEffect, useState } from "react"

export default function ModalQR({ cerrarModal }) {

    const { Canvas } = useQRCode()

    const { listaId } = useParams()

    const [qrUrl, setQrUrl] = useState('')

    const crearInvitacion = async () => {
        const response = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/crearinvitacion`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: 'include',
            body: JSON.stringify({ id: listaId })
        })
        const data = await response.json()
        if (response.status === 200) return setQrUrl(data.invitacion)
        return alert(data.message)
    }

    useEffect(() => {
        return crearInvitacion
    }, [])

    return (
        <>
        <div className="overlay" onClick={cerrarModal}></div>
        <div className="modal-qr">
            <h1>Código QR</h1>
            <Canvas
                text={`${process.env.NEXT_PUBLIC_SERVER_URL}/invitacion/${qrUrl}`}
                options={{
                    errorCorrectionLevel: 'L',
                    width: 256,
                    color: {
                        dark: '#373f4a',
                    }
                }}
            />
        </div>
        </>
    )
}