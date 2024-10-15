document.addEventListener('DOMContentLoaded', () => {
    // Função para buscar dados da API e atualizar o site
    async function fetchSensorData() {
        try {
            

            const response = await fetch('API');
            const data = await response.json();
            
            // Verifique se os dados retornam as chaves esperadas

            if (data.temperature !== undefined && data.co_level !== undefined) {

                // Atualiza os valores de temperatura e CO no HTML
                document.getElementById('Temperatura').textContent = data.temperature;
                document.getElementById('co-nivel').textContent = data.co_level;
            } else {
                console.error('Dados da API estão incompletos ou incorretos.');
            }
        } catch (error) {
            // Em caso de erro, exibe um valor padrão
            console.error('Erro ao buscar dados da API:', error);
            document.getElementById('Temperatura').textContent = '--';
            document.getElementById('co-nivel').textContent = '--';
        }
    }

    // Busca os dados da API a cada 10 segundos
    fetchSensorData(); 
    setInterval(fetchSensorData, 10000); // Atualiza os dados a cada 10 segundos
});
