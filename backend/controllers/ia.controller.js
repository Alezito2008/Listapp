const { GoogleGenerativeAI } = require('@google/generative-ai')
const jwt = require('jsonwebtoken')

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY)

const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' })

const prompt = `
Proporciona un JSON con los ingredientes de la receta en el formato siguiente:
{"items": {"ingrediente": cantidad}}.Ejemplo para sushi: {"items": {"arroz": 500,"salmon": 2,"alga": 3,"salsa de soja": 1}}.SOLO responder con el JSON. Receta: [receta].
`

const generarReceta = async(req, res) => {
    const { comida } = req.body
    const { token } = req.cookies

    let info
    try {
        info = jwt.verify(token, process.env.JWT_SECRET)
    } catch (error) {
        res.status(401).json({ message: 'Token inválido o expirado' })
    }

    if (!comida) return res.status(400).json({ message: 'Específicar comida' })
    if (comida.length >= 25) return res.status(400).json({ message: 'La comida debe tener menos de 25 letras' })
    
    
    const result = await model.generateContent(prompt.replace('[receta]', comida))

    const response = result.response.text().replace(/^\s*\"|\"\s*$/g, '')

    // const response = {
    //     "items": {
    //         "carne picada": 500,
    //         "pan de hamburguesa": 4,
    //         "lechuga": 1,
    //         "tomate": 2,
    //         "cebolla": 1,
    //         "queso": 2,
    //         "salsa de tomate": 1,
    //         "mostaza": 1,
    //         "mayonesa": 1
    //     }
    // }


    try {
        res.json(JSON.parse(response))
        // res.json(response)
    } catch (error) {
        res.status(500).json({ message: 'Error al generar la receta' })
    }
}

module.exports = { generarReceta }