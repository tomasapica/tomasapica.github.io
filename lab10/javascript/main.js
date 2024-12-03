document.addEventListener('DOMContentLoaded', function() {
    fetch('https://deisishop.pythonanywhere.com/products/')
    .then(response => response.json())
    .then(data => {
        console.log(data);
        const produtos = data;

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
        console.log(data);
        const categorias = data;
        const sectionFiltros = document.querySelector('#filtros');
        const select = document.createElement('select');
        const label = document.createElement('label');
        const optionDefault = document.createElement('option');
        
        label.innerHTML = `Filtrar `;
        sectionFiltros.append(label);
        sectionFiltros.append(select);
        select.append(optionDefault);
        optionDefault.innerHTML = `Todas as categorias`;

        categorias.forEach(categoria => {
            const option = document.createElement('option');
            select.append(option);
            option.innerHTML = categoria;
        });
    });
});

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
    const newButton = document.createElement('button');

    newH3.textContent = `${produto.title}`;
    newImg.setAttribute('src', produto.image);
    newImg.setAttribute('alt', produto.title);
    newH4.textContent = `Preço: ${produto.price}€`;
    newParagraph.textContent = `${produto.description}`;
    newButton.textContent = `+ Adicionar ao Cesto`;

    newArticle.append(newH3);
    newArticle.append(newImg);
    newArticle.append(newH4);
    newArticle.append(newParagraph);
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
    const newButton = document.createElement('button');

    newH3.textContent = `${produto.title}`;
    newImg.setAttribute('src', produto.image);
    newH4.textContent = `Preço: ${produto.price}€`;
    newButton.textContent = `- Remover do Cesto`;

    newButton.addEventListener('click', () => {
        removerProdutoDoLocalStorage(produto.id);
        atualizaCesto();
    });

    newArticle.append(newH3);
    newArticle.append(newImg);
    newArticle.append(newH4);
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
    precoTotalElement.textContent = `Preço Total: ${precoTotal}€`;
}