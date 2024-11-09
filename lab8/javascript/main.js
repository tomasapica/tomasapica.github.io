document.addEventListener('DOMContentLoaded', () => { 

    // => Arrow Functions

    // 1. texto muda com mouse
    const texto = document.querySelector('#passar');

    texto.onmouseover = () => {
        texto.innerHTML = 'Obrigado por passares!';
    };

    texto.onmouseout = () => {
        texto.innerHTML = 'Passa por aqui!';
    };


    // 2. muda cor frase butoes
    const textColor = document.querySelector('#colorButtons');

    document.querySelectorAll('.pintar').forEach(button => {
        button.addEventListener('click', () => {
            const color = button.dataset.color;
            textColor.style.color = color;
        });
    });


    // 3. muda cor ao escrever
    const inputTexto = document.querySelector('#escrever');
    const colors = ['red', 'green', 'blue', 'yellow'];
    let indexCores = 0;

    changeColor = () => {
        inputTexto.style.backgroundColor = colors[indexCores];
        indexCores = (indexCores + 1) % colors.length;
    }

    inputTexto.addEventListener('input', changeColor);


    // 4. seleciona cor - background
    const colorSelect = document.querySelector('#colorSelect');
    
    colorSelect.onchange = function() { // this.value precisa de 'contexto'
        document.body.style.backgroundColor = this.value;
    }


    // 5. contador com butao
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


    // 6. contruir uma frase
    const nome = document.querySelector('#nome');
    const idade = document.querySelector('#idade');
    const form = document.querySelector('#phraseForm');
    const frase = document.querySelector('#buildPhrase');

    form.onsubmit = () => {
        frase.textContent = `Olá, o(a) ${nome.value} tem ${idade.value}!`;
        return false;
    };


    // 7. contador automatico
    let counterAuto = 0;

    automaticCount = () => {
        counterAuto++;
        document.querySelector('#contadorSegundos').innerHTML = counterAuto;
    }

    setInterval(automaticCount, 1000)
});