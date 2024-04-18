function kosikalert(nazevProduktu) {
    alert(nazevProduktu + ' přidán do košíku!');
}

function pridatDoKosiku(divElement) {
    var nazevProduktu = divElement.getAttribute('data-nazev');

    if (nazevProduktu) {
        kosikalert(nazevProduktu);
    } 
    
    else {
        
    }
}

function nedostupne(divElement) {
    alert('Produkt je dočasně nedostupný.');
}