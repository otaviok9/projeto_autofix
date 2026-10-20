const { DataTypes } = require('sequelize')
const db = require('../db/conn')

const Agendamento = db.define('agendamento', {
    codAgendamento: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    data: {
        type: DataTypes.DATEONLY,
        allowNull: false
    },
    hora: {
        type: DataTypes.TIME,
        allowNull: false
    },
    tipoServico: {
        type: DataTypes.ENUM('revisão', 'manutenção', 'instalação'),
        allowNull: false
    },
    idVeiculo: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'veiculos',
            key: 'codVeiculo'
        }
    },
    idCliente: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'clientes',
            key: 'codCliente'
        }
    }
}, {
    timestamps: false,
    tableName: 'agendamentos'
})

module.exports = Agendamento
