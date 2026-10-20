const token = localStorage.getItem('token')

if (!token) {
    location.href = '../index.html'
}

let resposta = document.getElementById('resposta')
let btn_listar = document.getElementById('btn_listar')

btn_listar.addEventListener('click', (e) => {
    e.preventDefault()

    fetch('http://localhost:3000/agendamentos', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': token
        }
    })
        .then(res => {
            if (!res.ok) {
                localStorage.clear()
                alert('Faça login novamente, tempo expirado!')
                location.href = '../index.html'
                throw new Error('Sessão expirada')
            }
            return res.json()
        })
        .then(dados => {
            resposta.innerHTML = ''
            resposta.innerHTML += `
            <table>
                ${criarThead()}
                ${criarTbody(dados)}
            </table>
        `
        })
        .catch((err) => {
            console.error('Erro ao listar os dados', err)
            resposta.innerHTML = '<p>Erro ao conectar com o servidor.</p>'
        })
})

function criarTbody(dados) {
    let corpo = '<tbody>'
    dados.forEach(el => {
        const nomeCliente = el.clienteAgendamento ? el.clienteAgendamento.nome : 'N/A'
        const veiculo = el.veiculoAgendamento ? `${el.veiculoAgendamento.modelo} - ${el.veiculoAgendamento.placa}` : 'N/A'

        corpo += `<tr>`
        corpo += `<td>${el.codAgendamento || el.id}</td>`
        corpo += `<td>${el.data}</td>`
        corpo += `<td>${el.hora}</td>`
        corpo += `<td>${el.tipoServico}</td>`
        corpo += `<td>${nomeCliente}</td>`
        corpo += `<td>${veiculo}</td>`
        corpo += `</tr>`
    })
    corpo += `</tbody>`
    return corpo
}

function criarThead() {
    return `
        <thead>
            <tr>
                <th>Código</th>
                <th>Data</th>
                <th>Hora</th>
                <th>Serviço</th>
                <th>Cliente</th>
                <th>Veículo</th>
            </tr>
        </thead>
    `
}
