document.addEventListener('DOMContentLoaded', async function () {
    const tableBody = document.getElementById('tableReservations');

    try {
        const response = await fetch('http://localhost:3000/reservations');
        const reservations = await response.json();

        reservations.forEach(reservations => {
            const row = document.createElement('tr');

            row.innerHTML = `
                <td>${reservations.nome}</td>
                <td>${reservations.email}</td>
                <td>${new Date(reservations.dataEntrada).toLocaleDateString()}</td>
                <td>${new Date(reservations.dataSaida).toLocaleDateString()}</td>
                <td>${reservations.adultos}</td>
                <td>${reservations.criancas || 0}</td>
                <td>${reservations.obs}</td>
           `;
            tableBody.appendChild(row);
        });
    } catch (error) {
        console.error('Erro ao carregar reservas: ' + error)
    }
});