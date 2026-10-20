const Veiculo = require('../models/Veiculo')
const Cliente = require('../models/Cliente')
const CryptoJS = require('crypto-js')
const CHAVE_SECRETA = 'segredo'

const cadastrar = async (req, res) => {
    const valores = req.body

    if (!valores.modelo || !valores.marca || !valores.placa || !valores.rastreador || !valores.idCliente) {
        return res.status(400).json({ message: 'Todos os campos são obrigatórios!' })
    }

    try {
        const cliente = await Cliente.findByPk(valores.idCliente)
        if (!cliente) {
            return res.status(404).json({ message: 'Cliente informado não existe!' })
        }

        const rastreadorCriptografado = CryptoJS.AES.encrypt(valores.rastreador, CHAVE_SECRETA).toString()

        const novoVeiculo = await Veiculo.create({
            modelo: valores.modelo,
            marca: valores.marca,
            placa: valores.placa,
            rastreador: rastreadorCriptografado,
            idCliente: valores.idCliente
        })
        return res.status(201).json({ message: 'Veículo cadastrado com sucesso!', veiculo: novoVeiculo })
    } catch (err) {
        console.error('Erro ao cadastrar veículo:', err)
        return res.status(500).json({ message: 'Erro ao cadastrar veículo!' })
    }
}

module.exports = { cadastrar }
