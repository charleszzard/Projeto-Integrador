document.addEventListener('DOMContentLoaded', () => {
    // Função para buscar dados da API e atualizar o site
    async function fetchSensorData() {
        try {
            const response = await fetch('http://3.17.149.6:5000/fetch_data');
            const data = await response.json();

            // Filtra os dados para pegar apenas os do setor "ads"
            const adsData = data.filter(item => item.setor === 'cdl');

            if (adsData.length > 0) {
                const lastData = adsData[adsData.length - 1]; // Pega o último objeto do array filtrado

                // Atualiza os valores de temperatura e CO no HTML
                const s_termico = lastData.s_termico !== null ? lastData.s_termico : null;
                const s_monoxido = lastData.s_monoxido !== null ? lastData.s_monoxido : null;
                
                document.getElementById('s_temperatura').textContent = s_termico !== null ? s_termico.toFixed(1) : '--';
                document.getElementById('s_monoxido').textContent = s_monoxido !== null ? s_monoxido.toFixed(1) : '--';

                // Atualiza data e hora
                const [date, time] = lastData.data_hora.split(' ');
                document.getElementById('current-data').textContent = date;
                document.getElementById('current-hora').textContent = time;

                // Atualiza o status com os dados de temperatura e monóxido
                updateStatus(s_termico, s_monoxido);
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

    // Função para atualizar o status
    function updateStatus(s_termico, s_monoxido) {
        const placaNotificacao = document.querySelector('.placa-notificacao');
        const placaExtintor = document.querySelector('.placa-extintor');

        if (typeof s_termico === 'number' && typeof s_monoxido === 'number') {
            if (s_termico > 100 || s_monoxido > 80) {
                placaNotificacao.innerText = 'STATUS CRÍTICO: Verifique o local imediantamente. Os níveis dos sensores estão elevados. Leve consigo o extintor!';
                placaExtintor.innerText = 'Extintor tipo A';
            } else if ((s_termico >= 50 && s_termico <= 60) || (s_monoxido >= 40 && s_monoxido <= 50)) {
                placaNotificacao.innerText = 'AVISO: Os níveis dos sensores elevadando. Verifique o setor!';
                placaExtintor.innerText = '--';
            } else {
                placaNotificacao.innerText = 'Os níveis dos sensores estão OK. Não há nenhum risco aparente de incêndio';
                placaExtintor.innerText = '--';
                clearBlink(placaNotificacao);
            }
        } else {
            placaNotificacao.innerText = 'Dados dos sensores indisponíveis';
            placaNotificacao.style.color = 'gray';
        }
    }

    // Funções de piscar e limpar, se necessário
    function blink(element) {
        element.style.visibility = element.style.visibility === 'hidden' ? 'visible' : 'hidden';
        setTimeout(() => blink(element), 500); // Altera a visibilidade a cada 500ms
    }

    function clearBlink(element) {
        element.style.visibility = 'visible'; // Garante que o elemento está visível
    }

    // Busca os dados da API a cada 10 segundos
    fetchSensorData(); 
    setInterval(fetchSensorData, 10000); // Atualiza os dados a cada 10 segundos
});
