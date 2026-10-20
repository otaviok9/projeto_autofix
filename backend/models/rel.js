const Cliente = require('./Cliente')
const Veiculo = require('./Veiculo')
const Agendamento = require('./Agendamento')

Cliente.hasMany(Veiculo, {
    foreignKey: 'idCliente',
    as: 'veiculosCliente',
    onDelete: 'CASCADE' })

Veiculo.belongsTo(Cliente, {
    foreignKey: 'idCliente',
    as: 'clienteVeiculo',
    allowNull: false
})

Veiculo.hasMany(Agendamento, {
    foreignKey: 'idVeiculo',
    as: 'agendamentosVeiculo',
    onDelete: 'CASCADE'
})

Agendamento.belongsTo(Veiculo, {
    foreignKey: 'idVeiculo',
    as: 'veiculoAgendamento',
    allowNull: false
})

Cliente.hasMany(Agendamento, {
    foreignKey: 'idCliente',
    as: 'agendamentosCliente',
    onDelete: 'CASCADE'
})
Agendamento.belongsTo(Cliente, {
    foreignKey: 'idCliente',
    as: 'clienteAgendamento',
    allowNull: false
})

module.exports = { Cliente, Veiculo, Agendamento }
