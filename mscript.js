// Função que redireciona para uma página HTML específica com base no setor clicado
document.addEventListener("DOMContentLoaded", function() {
    // Captura todos os setores
    const setores = document.querySelectorAll(".setor");

    // Adiciona evento de clique a cada setor
    setores.forEach(function(setor) {
        setor.addEventListener("click", function() {
            // Obtém o ID do setor clicado
            const setorId = setor.id;

            // Define o redirecionamento para a página HTML correspondente
            if (setorId === "setor1") {
                window.location.href = "index.html";
            } else if (setorId === "setor2") {
                window.location.href = "index.html";
            } else if (setorId === "setor3") {
                window.location.href = "index.html";
            } else if (setorId === "setor4") {
                window.location.href = "index.html";
            }
        });
    });
});
// Seleciona todos os elementos de setor
const setores = document.querySelectorAll('.setor');

// Itera sobre cada setor para adicionar eventos de mouseover e mouseout
setores.forEach(setor => {
    // Evento para quando o mouse passa por cima do setor
    setor.addEventListener('mouseover', () => {
        const setorName = setor.getAttribute('data-setor');
        const setorDescription = setor.getAttribute('data-description');
        
        document.getElementById('infoTitle').textContent = setorName;
        document.getElementById('infoDescription').textContent = setorDescription;

        // Altera a cor do setor temporariamente
        setor.style.backgroundColor = '#11055f';
    });

    // Evento para quando o mouse sai do setor
    setor.addEventListener('mouseout', () => {
        // Restaura o título e a descrição padrão do painel de informações
        document.getElementById('infoTitle').textContent = 'Passe o mouse sobre um Setor';
        document.getElementById('infoDescription').textContent = 'Informações detalhadas sobre o setor aparecerão aqui.';

        // Restaura a cor original do setor
        setor.style.backgroundColor = '#000000';
    });
});