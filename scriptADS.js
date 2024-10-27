document.addEventListener('DOMContentLoaded', () => {
    // Função para buscar dados da API e atualizar o site
    async function fetchSensorData() {
        try {
            const response = await fetch('http://3.17.149.6:5000/fetch_data');
            const data = await response.json();

            // Filtra os dados para pegar apenas os do setor "ads"
            const adsData = data.filter(item => item.setor === 'ads');

            if (adsData.length > 0) {
                const lastData = adsData[adsData.length - 1]; // Pega o último objeto do array filtrado

                // Atualiza os valores de temperatura e CO no HTML
                document.getElementById('s_temperatura').textContent = lastData.s_termico !== null ? lastData.s_termico.toFixed(1) : '--';
                document.getElementById('s_monoxido').textContent = lastData.s_monoxido !== null ? lastData.s_monoxido.toFixed(1) : '--';
                
                // Atualiza data e hora
                const [date, time] = lastData.data_hora.split(' ');
                document.getElementById('current-data').textContent = date;
                document.getElementById('current-hora').textContent = time;
            } else {
                console.error('Nenhum dado encontrado para o setor "ads".');
                document.getElementById('s_temperatura').textContent = '--';
                document.getElementById('s_monoxido').textContent = '--';
            }
        } catch (error) {
            // Em caso de erro, exibe um valor padrão
            console.error('Erro ao buscar dados da API:', error);
            document.getElementById('s_temperatura').textContent = '--';
            document.getElementById('s_monoxido').textContent = '--';
        }
    }

    // Busca os dados da API a cada 10 segundos
    fetchSensorData(); 
    setInterval(fetchSensorData, 10000); // Atualiza os dados a cada 10 segundos
});