document.addEventListener('DOMContentLoaded', () => {
    async function fetchSensorData() {
        try {
            const response = await fetch('http://3.17.149.6:5000/fetch_data');
            const data = await response.json();

            // Filtra os dados para pegar apenas os do setor "ads" e "cdl"
            const adsData = data.filter(item => item.setor === 'ads');
            const cdlData = data.filter(item => item.setor === 'cdl');

            // Atualiza status do setor "ads"
            if (adsData.length > 0) {
                const lastAdsData = adsData[adsData.length - 1];
                updateStatus(lastAdsData.s_termico, lastAdsData.s_monoxido, 'statusSetor1');
            } else {
                console.error('Nenhum dado encontrado para o setor "ads".');
                resetStatus('statusSetor1');
            }

            // Atualiza status do setor "cdl"
            if (cdlData.length > 0) {
                const lastCdlData = cdlData[cdlData.length - 1];
                updateStatus(lastCdlData.s_termico, lastCdlData.s_monoxido, 'statusSetor2');
            } else {
                console.error('Nenhum dado encontrado para o setor "cdl".');
                resetStatus('statusSetor2');
            }

            // Atualiza data e hora
            const now = new Date();
            document.getElementById('dataAtual').innerText = now.toLocaleString();

        } catch (error) {
            console.error('Erro ao buscar dados da API:', error);
            resetStatus('statusSetor1');
            resetStatus('statusSetor2');
        }
    }

    function updateStatus(s_termico, s_monoxido, statusId) {
        const statusText = document.getElementById(statusId).querySelector('.status-text');

        // Verifica e aplica status com base nos valores
        if (typeof s_termico === 'number' && typeof s_monoxido === 'number') {
            if (s_termico > 100 || s_monoxido > 80) {
                statusText.innerText = 'WARNING';
                statusText.style.color = 'red';
                blink(statusText);
            } else {
                statusText.innerText = 'OK';
                statusText.style.color = 'green';
                clearBlink(statusText);
            }
        } else {
            statusText.innerText = '--';
            statusText.style.color = 'black';
            clearBlink(statusText);
        }
    }

    function resetStatus(statusId) {
        const statusText = document.getElementById(statusId).querySelector('.status-text');
        statusText.innerText = '--';
        statusText.style.color = 'black';
        clearBlink(statusText);
    }

    function blink(element) {
        clearInterval(element.blinkInterval);
        element.blinkInterval = setInterval(() => {
            element.style.visibility = (element.style.visibility === 'hidden' ? '' : 'hidden');
        }, 500);
    }

    function clearBlink(element) {
        clearInterval(element.blinkInterval);
        element.style.visibility = '';
    }

    fetchSensorData();
    setInterval(fetchSensorData, 10000);
});
