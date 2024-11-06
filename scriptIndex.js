document.addEventListener('DOMContentLoaded', () => {
    async function fetchSensorData() {
        try {
            const response = await fetch('http://3.17.149.6:5000/fetch_data');
            const data = await response.json();

            const adsData = data.filter(item => item.setor === 'ads');
            const cdlData = data.filter(item => item.setor === 'cdl');

            if (adsData.length > 0) {
                const lastAdsData = adsData[adsData.length - 1];
                updateStatus(lastAdsData.s_termico, lastAdsData.s_monoxido, 'statusSetor1');
            } else {
                resetStatus('statusSetor1');
            }

            if (cdlData.length > 0) {
                const lastCdlData = cdlData[cdlData.length - 1];
                updateStatus(lastCdlData.s_termico, lastCdlData.s_monoxido, 'statusSetor2');
            } else {
                resetStatus('statusSetor2');
            }

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

        if (typeof s_termico === 'number' && typeof s_monoxido === 'number') {
            if (s_termico > 50 || s_monoxido > 80) {
                statusText.innerText = 'CRITICAL';
                statusText.style.color = 'red';
                blink(statusText);
            }else if(s_termico >= 40 && s_termico <= 50  || s_monoxido >= 65 && s_monoxido <= 80){
                statusText.innerText = 'WARNING';
                statusText.style.color = 'yellow';
                blink(statusText);
            }else{
                statusText.innerText = 'OK';
                statusText.style.color = 'green';
                clearBlink(statusText);
            }
        } else {
            resetStatus(statusId);
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

    // Seleciona todos os elementos de cards
    const cards = document.querySelectorAll('.card');

    // Itera sobre cada card para adicionar eventos de mouseover e mouseout
    cards.forEach(card => {
        // Evento para quando o mouse passa por cima do card
        card.addEventListener('mouseover', () => {
            const setorDescription = card.querySelector('.setor').getAttribute('data-description');
            document.getElementById('infoTitle').textContent = setorDescription;
            document.getElementById('infoDescription').textContent = card.querySelector('.setor').getAttribute('data-setor');

            // Altera a cor do card temporariamente
            card.style.backgroundColor = '#494747';
        });

        // Evento para quando o mouse sai do card
        card.addEventListener('mouseout', () => {
            // Restaura o título e a descrição padrão do painel de informações
            document.getElementById('infoTitle').textContent = 'Passe o mouse sobre um Setor';
            document.getElementById('infoDescription').textContent = 'Informações detalhadas sobre o setor aparecerão aqui.';

            // Restaura a cor original do card
            card.style.backgroundColor = '#000000';
        });
    });
});
