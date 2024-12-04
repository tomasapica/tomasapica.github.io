document.addEventListener('DOMContentLoaded', function() {
    let produtos = [];

    fetch('https://deisishop.pythonanywhere.com/products/')
    .then(response => response.json())
    .then(data => {
        console.log(data);
        produtos = data;

        if (!localStorage.getItem('produtos-selecionados')) {
            const lista = [];
            localStorage.setItem('produtos-selecionados', JSON.stringify(lista));
        }

        carregarProdutos(produtos);
        atualizaCesto();
    });

    fetch('https://deisishop.pythonanywhere.com/categories/')
    .then(response => response.json())
    .then(data => {
        const categorias = data;

        // Filtro 1 - Categorias
        const sectionFiltros = document.querySelector('#filtros');
        const selectFiltrar = document.createElement('select');
        const labelFiltrar = document.createElement('label');
        const optionFiltrarDefault = document.createElement('option');

        labelFiltrar.innerHTML = `Filtrar `;
        sectionFiltros.append(labelFiltrar);
        labelFiltrar.append(selectFiltrar);
        selectFiltrar.append(optionFiltrarDefault);
        optionFiltrarDefault.innerHTML = `Todas as categorias`;
        optionFiltrarDefault.value = "";

        categorias.forEach(categoria => {
            const option = document.createElement('option');
            selectFiltrar.append(option);
            option.innerHTML = categoria;
            option.value = categoria;
        });

        selectFiltrar.addEventListener('change', () => {
            const categoriaSelecionada = selectFiltrar.value;
            filtrarProdutosPorCategoria(categoriaSelecionada, produtos);
        });

        // Filtro 2 - Ordenar
        const selectOrdenar = document.createElement('select');
        const labelOrdenar = document.createElement('label');
        const optionOrdenarDefault = document.createElement('option');
        const optionOrdenar1 = document.createElement('option');
        const optionOrdenar2 = document.createElement('option');

        labelOrdenar.innerHTML = `Ordenar `;
        sectionFiltros.append(labelOrdenar);
        labelOrdenar.append(selectOrdenar);
        selectOrdenar.append(optionOrdenarDefault);
        optionOrdenarDefault.innerHTML = `Ordenar pelo preço`;
        optionOrdenarDefault.value = "";
        
        selectOrdenar.append(optionOrdenar1);
        optionOrdenar1.innerHTML = `Preço Decrescente`;
        selectOrdenar.append(optionOrdenar2);
        optionOrdenar2.innerHTML = `Preço Crescente`;

        selectOrdenar.addEventListener('change', () => {
            const ordenacaoSelecionada = selectOrdenar.value;
            ordenarProdutosPorPreco(ordenacaoSelecionada, produtos);
        });

        // Filtro 3 - Procurar
        const inputProcurar = document.createElement('input');
        const labelProcurar = document.createElement('label');

        labelProcurar.textContent = 'Procurar ';
        inputProcurar.setAttribute('type', 'text');
        inputProcurar.setAttribute('placeholder', 'pesquise por produto');

        sectionFiltros.append(labelProcurar);
        labelProcurar.append(inputProcurar);

        inputProcurar.addEventListener('input', () => {
            const textoIntroduzido = inputProcurar.value.toLowerCase();
            procurarProdutosPorTitulo(textoIntroduzido, produtos);
        });
    });
});

function realizarCompra() {
    const produtosSelecionados = JSON.parse(localStorage.getItem('produtos-selecionados'));

    if (produtosSelecionados.length === 0) {
        alert('Erro: cesto vazio');
        return;
    }

    const checkboxEstudante = document.querySelector('#checkbox-estudante');
    const inputCupao = document.querySelector('#desconto');
    let totalCost = produtosSelecionados.reduce((soma, produto) => soma + produto.price, 0);

    if (checkboxEstudante.checked) {
        totalCost *= 0.75; // 25% desconto
    }

    if (inputCupao.value.toLowerCase() === 'black-friday') {
        totalCost *= 0.90; // 10% desconto adicional - sobre o valor final a pagar
    }

    const dadosCompra = {
        products: produtosSelecionados.map(produto => produto.id),
        student: checkboxEstudante.checked,
        coupon: inputCupao.value,
    };

    // buy - evnviar dados via POST
    fetch('https://deisishop.pythonanywhere.com/buy/', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(dadosCompra)
    })
    .then(response => response.json())
    .then(data => {
        if (data.error) {
            alert(`Erro: ${data.error}`);
        } else {
            resumoCompra(totalCost, data.reference);
        }
    });
}

function resumoCompra(totalCost, reference) {
    const sectionCheckout = document.querySelector('#checkout');

    let valorAPagar = document.querySelector('#valor-a-pagar');
    let referenciaCheckout = document.querySelector('#referencia-checkout');

    if (!valorAPagar) {
        valorAPagar = document.createElement('h3');
        valorAPagar.id = 'valor-a-pagar';
        sectionCheckout.append(valorAPagar);
    }

    if (!referenciaCheckout) {
        referenciaCheckout = document.createElement('p');
        referenciaCheckout.id = 'referencia-checkout';
        sectionCheckout.append(referenciaCheckout);
    }

    valorAPagar.innerHTML = `Valor final a pagar (com eventuais descontos): ${totalCost} €`;
    referenciaCheckout.innerHTML = `Referência de pagamento: ${reference}`;
}

// butao comprar
document.querySelector('#comprar').addEventListener('click', realizarCompra);

function procurarProdutosPorTitulo(texto, produtos) {
    const produtosFiltrados = produtos.filter(produto => 
        produto.title.toLowerCase().includes(texto)
    );

    const sectionArtigos = document.querySelector('#artigos');
    sectionArtigos.innerHTML = "";
    carregarProdutos(produtosFiltrados);
}

function ordenarProdutosPorPreco(ordenacao, produtos) {
    let produtosOrdenados;

    if (ordenacao === "Preço Crescente") {
        produtosOrdenados = produtos.sort((a, b) => a.price - b.price);
    } else if (ordenacao === "Preço Decrescente") {
        produtosOrdenados = produtos.sort((a, b) => b.price - a.price);
    } else {
        produtosOrdenados = produtos;
    }

    const sectionArtigos = document.querySelector('#artigos');
    sectionArtigos.innerHTML = "";
    carregarProdutos(produtosOrdenados);
}

function filtrarProdutosPorCategoria(categoria, produtos) {
    const produtosFiltrados = categoria 
        ? produtos.filter(produto => produto.category === categoria)
        : produtos;

    const sectionArtigos = document.querySelector('#artigos');
    sectionArtigos.innerHTML = "";
    carregarProdutos(produtosFiltrados);
}

function carregarProdutos(produtos) {
    const sectionArtigos = document.querySelector('#artigos');
    produtos.forEach(produto => {
        console.log(`id: ${produto.id}, título: ${produto.title}`);
        const artigo = criarProduto(produto);
        sectionArtigos.append(artigo);
    });
}

function criarProduto(produto) {
    const newArticle = document.createElement('article');
    const newH3 = document.createElement('h3');
    const newImg = document.createElement('img');
    const newH4 = document.createElement('h4');
    const newParagraph = document.createElement('p');
    const newH5 = document.createElement('h5');
    const newButton = document.createElement('button');
    const estrelasInteiras = parseInt(produto.rating.rate);
    const estrelas = '⭐'.repeat(estrelasInteiras);

    newH3.textContent = `${produto.title}`;
    newImg.setAttribute('src', produto.image);
    newImg.setAttribute('alt', produto.title);
    newH4.textContent = `Preço: ${produto.price}€`;
    newParagraph.textContent = `${produto.description}`;
    newH5.textContent = `${produto.rating.rate} ${estrelas} (${produto.rating.count} avaliações)`;
    newButton.textContent = `+ Adicionar ao Cesto`;

    newArticle.append(newH3);
    newArticle.append(newImg);
    newArticle.append(newH4);
    newArticle.append(newParagraph);
    newArticle.append(newH5);
    newArticle.append(newButton);

    newButton.addEventListener('click', () => {
        adicionarAoCesto(produto);
        atualizaCesto();
    });

    return newArticle;
}

function adicionarAoCesto(produto) {
    const cestoAtual = JSON.parse(localStorage.getItem('produtos-selecionados'));
    cestoAtual.push(produto);
    localStorage.setItem('produtos-selecionados', JSON.stringify(cestoAtual));
}

function atualizaCesto() {
    const cestoSelecionados = JSON.parse(localStorage.getItem('produtos-selecionados'));
    const sectionCesto = document.querySelector('#artigos-cesto');
    sectionCesto.innerHTML = '';

    cestoSelecionados.forEach(produto => {
        const artigoCesto = criaProdutoCesto(produto);
        sectionCesto.append(artigoCesto);
    });

    atualizarPrecoTotal(cestoSelecionados);
}

function criaProdutoCesto(produto) {
    const newArticle = document.createElement('article');
    const newH3 = document.createElement('h3');
    const newImg = document.createElement('img');
    const newH4 = document.createElement('h4');
    const newH5 = document.createElement('h5');
    const newButton = document.createElement('button');

    newH3.textContent = `${produto.title}`;
    newImg.setAttribute('src', produto.image);
    newH4.textContent = `Preço: ${produto.price} €`;
    newButton.textContent = `- Remover do Cesto`;

    newButton.addEventListener('click', () => {
        removerProdutoDoLocalStorage(produto.id);
        atualizaCesto();
    });

    newArticle.append(newH3);
    newArticle.append(newImg);
    newArticle.append(newH4);
    newArticle.append(newH5);
    newArticle.append(newButton);

    return newArticle;
}

function removerProdutoDoLocalStorage(produtoId) {
    const cestoAtual = JSON.parse(localStorage.getItem('produtos-selecionados'));
    const ids = cestoAtual.map(produto => produto.id);
    const index = ids.indexOf(produtoId);

    if (index !== -1) {
        cestoAtual.splice(index, 1);
    }

    localStorage.setItem('produtos-selecionados', JSON.stringify(cestoAtual));
}

function atualizarPrecoTotal(produtosSelecionados) {
    const precoTotalElement = document.querySelector('#preco-total');
    const precoTotal = produtosSelecionados.reduce((soma, produto) => soma + produto.price, 0);
    precoTotalElement.textContent = `Preço Total: ${precoTotal} €`;
}