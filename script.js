function kosikalert(nazevProduktu) {
    alert(nazevProduktu + ' přidán do košíku!');
}

function pridatDoKosiku(divElement) {
    var nazevProduktu = divElement.getAttribute('data-nazev');

    if (nazevProduktu) {
        kosikalert(nazevProduktu);
    } else {
        console.error('Název produktu nenalezen.');
    }
}
