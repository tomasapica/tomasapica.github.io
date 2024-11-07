document.addEventListener('DOMContentLoaded', function() {
    // evento de click
    const clickBox = document.querySelector('#clickBox');
    clickBox.addEventListener('click', function() {
        clickBox.style.backgroundColor = 'lightgreen';
        clickBox.textContent = 'Clique único detectado!';
    });

    // evento de duplo click
    const doubleClickBox = document.querySelector('#doubleClickBox');
    doubleClickBox.addEventListener('dblclick', function() {
        doubleClickBox.style.backgroundColor = 'orange';
        doubleClickBox.textContent = 'Duplo clique detectado!';
    });

    // evento de mouseover
    const hoverBox = document.querySelector('#hoverBox');
    hoverBox.addEventListener('mouseover', function() {
        hoverBox.style.backgroundColor = 'lightblue';
        hoverBox.textContent = 'Mouse sobre a área!';
    });

    // evento de mouseout
    hoverBox.addEventListener('mouseout', function() {
        hoverBox.style.backgroundColor = 'lightgray';
        hoverBox.textContent = 'Passe o mouse aqui';
    });

    // evento de mousemove
    const moveBox = document.querySelector('#moveBox');
    moveBox.addEventListener('mousemove', function(event) {
        moveBox.textContent = `Posição X: ${event.offsetX}, Y: ${event.offsetY}`;
    });

    // Seleciona o campo de entrada
    const inputField = document.querySelector('#inputField');

    // Evento de keydown: altera o estilo quando uma tecla é pressionada
    inputField.addEventListener('keydown', function() {
        inputField.style.backgroundColor = 'red';
    });

    // Evento de keyup: retorna ao estilo original quando a tecla é liberada
    inputField.addEventListener('keyup', function() {
        inputField.style.backgroundColor = 'white';
    });

    // Evento de change no select
    const colorSelect = document.querySelector('#colorSelect');
    colorSelect.addEventListener('change', function() {
        document.body.style.backgroundColor = colorSelect.value;
    });

    // Evento de submit no formulário
    const colorForm = document.querySelector('#colorForm');
    colorForm.addEventListener('submit', function(event) {
        document.body.style.backgroundColor = colorSelect.value;
        return false;
    });
});