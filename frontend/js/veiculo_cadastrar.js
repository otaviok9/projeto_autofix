const token = localStorage.getItem('token')

if (!token) {
    location.href = '../index.html'
}

const btn_cadastrar = document.getElementById('btn_cadastrar')
const resposta = document.getElementById('resposta')

btn_cadastrar.addEventListener('click', (e) => {
    e.preventDefault()

    const valores = {
        modelo: document.getElementById('modelo').value,
        marca: document.getElementById('marca').value,
        placa: document.getElementById('placa').value,
        rastreador: document.getElementById('rastreador').value,
        idCliente: Number(document.getElementById('idCliente').value)
    }

    fetch('http://localhost:3000/veiculo', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': token
        },
        body: JSON.stringify(valores)
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
            resposta.innerHTML = `<p>${dados.message}</p>`
            document.querySelector('form').reset()
        })
        .catch(err => {
            console.error('Erro ao cadastrar veículo:', err)
            resposta.innerHTML = '<p>Erro ao tentar conectar com o servidor.</p>'
        })
})
