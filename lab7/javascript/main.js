document.addEventListener('DOMContentLoaded', function() {
    // frase muda com mouse
    const frase = document.querySelector('#passar');

    frase.onmouseover = function() {
        frase.innerHTML = 'Obrigado por passares!';
    };

    frase.onmouseout = function() {
        frase.innerHTML = 'Passa por aqui!';
    };

    // muda cor frase butoes
    const cor_texto = document.querySelector('#pintar');
    const butao_red = document.querySelector('#red'); // botao red
    const butao_green = document.querySelector('#green'); // botao green
    const butao_blue = document.querySelector('#blue'); // botao blue

    function mudar_cor(color) {
        cor_texto.style.color = color;
    }

    butao_red.onclick = function() {
        mudar_cor('red');
    };

    butao_green.onclick = function() {
        mudar_cor('green');
    };

    butao_blue.onclick = function() {
        mudar_cor('blue');
    };

    // muda cor ao escrever
    const inputTexto = document.querySelector('#escrever');
    const colors = ['red', 'green', 'blue', 'yellow'];
    let indexCores = 0;

    function changeColor() {
        inputTexto.style.backgroundColor = colors[indexCores];
        indexCores = (indexCores + 1) % colors.length;
    }

    inputTexto.addEventListener('input', changeColor);

    // muda cor background submeter form
    const corInput = document.querySelector('#cor_ingles');
    const butaoSubmit = document.querySelector('input[type="submit"]');

    function changeBackgroundColor() {
        const color = corInput.value;
        document.body.style.backgroundColor = color;
    }

    butaoSubmit.addEventListener('click', function() {;
        changeBackgroundColor();
        corInput.value = "";
        return false;
    });

    // contador com butao
    let counter = 0;

    function count() {
        counter++;
        document.querySelector('#contador').innerHTML = counter;
    }

    document.querySelector('#butao_contar').onclick = count;
});