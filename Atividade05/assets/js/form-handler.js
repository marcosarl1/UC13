document.addEventListener('DOMContentLoaded', function () {
        const form = document.querySelector('form');
        form.addEventListener('submit', async function (event) {
            event.preventDefault();

            const formData = {
                nome: document.getElementById('nome').value,
                email: document.getElementById('email').value,
                dataEntrada: document.getElementById('entrada').value,
                dataSaida: document.getElementById('saida').value,
                adultos: parseInt(document.getElementById('adultos').value),
                criancas: parseInt(document.getElementById('criancas').value),
                obs: document.getElementById('observacoes').value
            };

            if (new Date(formData.dataEntrada) > new Date(formData.dataSaida)) {
                alert('A data de saída não pode ser anterior à data de entrada.');
                return;
            }

            try {
                const response = await fetch('http://localhost:3000/reservations',{
                    method: 'POST',
                    headers: {
                        'Content-type': 'application/json'
                    },
                    body: JSON.stringify(formData)
                });

                if (response.ok) {
                    alert('Reserva enviada com sucesso!');
                    form.reset();
                } else {
                    throw new Error('Erro ao enviar reserva');
                }
            } catch (error) {
                alert('Erro ao enviar reserva: ' + error.message);
            }
        });
    }
)