document.addEventListener('DOMContentLoaded', () => { 

    // => Arrow Functions

    // texto muda com mouse
    const texto = document.querySelector('#passar');

    texto.onmouseover = () => {
        texto.innerHTML = 'Obrigado por passares!';
    };

    texto.onmouseout = () => {
        texto.innerHTML = 'Passa por aqui!';
    };


    // muda cor frase butoes
    const cor_texto = document.querySelector('#pintar');
    const butao_red = document.querySelector('#red'); // botao red
    const butao_green = document.querySelector('#green'); // botao green
    const butao_blue = document.querySelector('#blue'); // botao blue

    mudar_cor = (color) => {
        cor_texto.style.color = color;
    }

    butao_red.onclick = () => {
        mudar_cor('red');
    };

    butao_green.onclick = () => {
        mudar_cor('green');
    };

    butao_blue.onclick = () => {
        mudar_cor('blue');
    };


    // muda cor ao escrever
    const inputTexto = document.querySelector('#escrever');
    const colors = ['red', 'green', 'blue', 'yellow'];
    let indexCores = 0;

    changeColor = () => {
        inputTexto.style.backgroundColor = colors[indexCores];
        indexCores = (indexCores + 1) % colors.length;
    }

    inputTexto.addEventListener('input', changeColor);


    // seleciona cor - background
    const colorSelect = document.querySelector('#colorSelect');
    
    colorSelect.addEventListener('change', () => {
        document.body.style.backgroundColor = this.value;
    });


    // contador com butao
    const numero = document.querySelector('#contador');
    const butaoContar = document.querySelector('#butaoContar');

    if(!localStorage.getItem('counter')) {
        localStorage.setItem('counter', 0);
    }

    numero.textContent = localStorage.getItem('counter');

    count = () => {
        let counter = localStorage.getItem('counter');
        counter++;
        numero.textContent = counter;
        localStorage.setItem('counter', counter);
    }

    butaoContar.onclick = count;


    // contruir uma frase
    const nome = document.querySelector('#nome');
    const idade = document.querySelector('#idade');
    const form = document.querySelector('#phraseForm');
    const frase = document.querySelector('#buildPhrase');

    form.onsubmit = () => {
        frase.textContent = `Olá, o/a ${nome.value} tem ${idade.value}!`;
        return false;
    };


    // contador com butao
    let counterAuto = 0;

    automaticCount = () => {
        counterAuto++;
        document.querySelector('#contadorSegundos').innerHTML = counterAuto;
    }

    setInterval(automaticCount, 1000)
});