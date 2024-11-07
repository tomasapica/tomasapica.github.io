document.addEventListener('DOMContentLoaded', function() {
    // Evento de click
    const clickBox = document.querySelector('#clickBox');
    clickBox.addEventListener('click', function() {
        clickBox.style.backgroundColor = 'lightgreen';
        clickBox.textContent = 'Clique único detectado!';
    });

    // Evento de double-click
    const doubleClickBox = document.querySelector('#doubleClickBox');
    doubleClickBox.addEventListener('dblclick', function() {
        doubleClickBox.style.backgroundColor = 'orange';
        doubleClickBox.textContent = 'Duplo clique detectado!';
    });

    // Evento de mouseover
    const hoverBox = document.querySelector('#hoverBox');
    hoverBox.addEventListener('mouseover', function() {
        hoverBox.style.backgroundColor = 'lightblue';
        hoverBox.textContent = 'Mouse sobre a área!';
    });

    // Evento de mouseout
    hoverBox.addEventListener('mouseout', function() {
        hoverBox.style.backgroundColor = 'lightgray';
        hoverBox.textContent = 'Passe o mouse aqui';
    });

    // Evento de mousemove
    const moveBox = document.querySelector('#moveBox');
    moveBox.addEventListener('mousemove', function(event) {
        moveBox.textContent = `Posição X: ${event.offsetX}, Y: ${event.offsetY}`;
    });

    // Evento de keydown
    const inputField = document.querySelector('#inputField');
    inputField.addEventListener('keydown', function(event) {
        alert(`Tecla pressionada: ${event.key}`);
    });

    // Evento de keyup
    inputField.addEventListener('keyup', function(event) {
        console.log(`Tecla liberada: ${event.key}`);
    });

    // Evento de change no select
    const colorSelect = document.querySelector('#colorSelect');
    colorSelect.addEventListener('change', function() {
        document.body.style.backgroundColor = colorSelect.value;
        alert(`Cor alterada para: ${colorSelect.value}`);
    });

    // Evento de submit no formulário
    const colorForm = document.querySelector('#colorForm');
    colorForm.addEventListener('submit', function(event) {
        document.body.style.backgroundColor = colorSelect.value;
        alert(`Cor de fundo alterada para: ${colorSelect.value}`);
        return false;
    });
});