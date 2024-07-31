const { GoogleGenerativeAI } = require('@google/generative-ai')
const jwt = require('jsonwebtoken')

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY)

const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' })

const prompt = `Proporciona un JSON con los ingredientes para hacer una receta en el formato siguiente:
[{nombre:(nombre del ingrediente),cantidad:{cantidad del ingrediente (int)},medida:(medida del ingrediente)].
SOLO escribir el JSON en TEXTO PLANO. EN MEDIDAS SOLO PONER (un(unidad)/g(gramo)/kg(kilogramo)/ml(mililitro)/l(litro)) Y NADA MAS SIENDO COHERENTE. Comprobar formato del JSON
Receta:[receta]`

const generarReceta = async(req, res) => {
    const { comida } = req.body
    const { token } = req.cookies

    let info
    try {
        info = jwt.verify(token, process.env.JWT_SECRET)
    } catch (error) {
        res.status(401).json({ message: 'Token inválido o expirado' })
    }

    try {
        if (!comida) return res.status(400).json({ message: 'Específicar comida' })
        if (comida.length >= 25) return res.status(400).json({ message: 'La comida debe tener menos de 25 letras' })
        
        const result = await model.generateContent(prompt.replace('[receta]', comida))

        const response = result.response.text().replace(/^\s*\"|\"\s*$/g, '')

        res.json(JSON.parse(response))
    } catch (error) {
        res.status(500).json({ message: 'Error al generar la receta' })
    }
}

module.exports = { generarReceta }