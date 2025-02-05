document.getElementById('formulario').addEventListener('submit', cadastrarVeiculo);

function cadastrarVeiculo(e) {
    e.preventDefault();

    const modeloVeiculo = document.getElementById('modeloVeiculo').value.trim();
    const placaVeiculo = document.getElementById('placaVeiculo').value.trim();
    const horaEntrada = new Date();

    if (!modeloVeiculo || !placaVeiculo) {
        alert("Preencha todos os campos!");
        return;
    }

    const modeloValido = /^[a-zA-Z0-9-]+$/.test(modeloVeiculo);
    const placaValida = /^[a-zA-Z0-9-]+$/.test(placaVeiculo);

    if (!modeloValido) {
        alert("Modelo do veículo contém caracteres inválidos!");
        return;
    }

    if (!placaValida) {
        alert("Placa do veículo contém caracteres inválidos!");
        return;
    }

    const veiculo = {
        modelo: modeloVeiculo,
        placa: placaVeiculo,
        hora: horaEntrada.getHours(),
        minutos: horaEntrada.getMinutes()
    };

    let veiculos = JSON.parse(localStorage.getItem('patio')) || [];
    if (veiculos.some(v => v.placa === placaVeiculo)) {
        alert("Veículo já registrado!");
        return;
    }

    veiculos.push(veiculo);
    localStorage.setItem('patio', JSON.stringify(veiculos));

    document.getElementById('formulario').reset();
    mostraPatio();
}

function removeVeiculo(placa) {
    let veiculos = JSON.parse(localStorage.getItem('patio')) || [];
    veiculos = veiculos.filter(v => v.placa !== placa);
    localStorage.setItem('patio', JSON.stringify(veiculos));
    mostraPatio();
}

function mostraPatio() {
    const veiculos = JSON.parse(localStorage.getItem('patio')) || [];
    const patioResultado = document.getElementById('resultados');
    patioResultado.innerHTML = '';

    veiculos.forEach(veiculo => {
        const { modelo, placa, hora, minutos } = veiculo;
        patioResultado.innerHTML += `
            <tr>
                <td>${modelo}</td>
                <td>${placa}</td>
                <td>${hora}:${minutos}</td>
                <td><button onclick="removeVeiculo('${placa}')" class="btn btn-danger">Remover</button></td>
            </tr>
        `;
    });
}