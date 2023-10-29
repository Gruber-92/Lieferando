let menus = [
    {
        'name': 'Pizza Margherita',
        'description': 'mit Käse',
        'price': 6.50,
        'amounts': []
    },
    {
        'name': 'Pizza Salami',
        'description': 'mit Salami',
        'price': 7.50,
        'amounts': []
    },
    {
        'name': 'Pizza Prosciutto',
        'description': 'mit Schinken',
        'price': 8.00,
        'amounts': []
    },
    {
        'name': 'Pizza Cipolla',
        'description': 'mit Zwiebelringen',
        'price': 7.00,
        'amounts': []
    },
    {
        'name': 'Pizza Paprika',
        'description': 'mit Paprika',
        'price': 7.50,
        'amounts': []
    },
    {
        'name': 'Pizza Funghi',
        'description': 'mit frischen Champignons',
        'price': 7.50,
        'amounts': []
    },
    {
        'name': 'Gemischter Salat',
        'description': 'grüner Salat mit Tomaten und Gurken',
        'price': 7.50,
        'amounts': []
    },
    {
        'name': 'Italienischer Salat',
        'description': 'gemischter Salat mit Thunfisch, Oliven, Ei, Zwiebeln, Mais und Käse',
        'price': 11.50,
        'amounts': []
    },
];

let shoppingBasket = [];
let prices = [];
let amount = [];

function render() {
    document.getElementById('order-section').innerHTML = '';
    for (let i = 0; i < menus.length; i++) {
        const menu = menus[i];

        document.getElementById('order-section').innerHTML += `
        <div class="order-container">
            <div id="mymenu${i}"><b>${menu['name']}</b></div>
            <div class="description-container">${menu['description']}</div>
            <div class="order-container-child">
                <b>${menu['price'].toFixed(2)} €</b>
                <button onclick="addToBasket(${i})"><b>+</b></button>
            </div>
        </div>
        `;
    }
    load();
}

function addToBasket(i) {
    let addname = menus[i]['name'];
    let index = getMenuIndex(addname);
    if (index == -1) {
        let addprice = menus[i]['price'];
        amount.push(1);
        shoppingBasket.push(addname);
        prices.push(addprice);
    } else {
        amount[index] = amount[index] + 1;
    }
    addToShoppingBasket();
}

function getMenuIndex(menu) {
    return shoppingBasket.indexOf(menu);
}

function save() {
    let shoppingBasketAsText = JSON.stringify(shoppingBasket);
    let pricesAsText = JSON.stringify(prices);
    let amountAsText = JSON.stringify(amount);

    localStorage.setItem('menus', shoppingBasketAsText);
    localStorage.setItem('prices', pricesAsText);
    localStorage.setItem('amount', amountAsText);
}

function load() {
    let shoppingBasketAsText = localStorage.getItem('menus');
    let pricesAsText = localStorage.getItem('prices');
    let amountAsText = localStorage.getItem('amount');
    if (shoppingBasketAsText && pricesAsText && amountAsText) {
        shoppingBasket = JSON.parse(shoppingBasketAsText);
        prices = JSON.parse(pricesAsText);
        amount = JSON.parse(amountAsText);
        addToShoppingBasket();
    }
}

function addToShoppingBasket() {
    document.getElementById('shopping-basket-container').innerHTML = '';
    document.getElementById('price-container').innerHTML = '';
    let sum = 0;
    for (let j = 0; j < shoppingBasket.length; j++) {
        const addName = shoppingBasket[j];
        const addPrice = prices[j] * amount[j];
        const addAmount = amount[j];
        sum += (prices[j] * amount[j]);
        document.getElementById('shopping-basket-container').innerHTML += `
        <div class="basket-container">
            <div><b>${addAmount} ${addName}</b></div>
                <div class="basket-container-child">${addPrice.toFixed(2)} €
                    <img src="img/delete.ico" onclick="deleteFromBasket(${j})">
                </div>
            </div>
        </div>
        `;
    }
    if (shoppingBasket.length > 0) {
        let finalsum = sum + 1
        document.getElementById('price-container').innerHTML = `
        <div class="price-container">
            <span>Zwischensumme</span>
            <span>${sum.toFixed(2)} €</span>
        </div>
        <div class="price-container">
            <span>Lieferkosten</span>
            <span>1.00 €</span>
        </div>
        <div class="price-container">
            <span><b>Gesamt</b></span>
            <span><b>${finalsum.toFixed(2)} €</b></span>
        </div>
        `;
    }
    save();
}

function deleteFromBasket(j) {
    shoppingBasket.splice(j, 1);
    prices.splice(j, 1);
    amount.splice(j, 1);
    addToShoppingBasket();
    save();
}

function toggleMenu() {
    if (document.getElementById('shopping-basket-section').classList.contains('not-hidden')) {
        document.getElementById('shopping-basket-section').classList.remove('not-hidden');
        document.getElementById('menu-section').classList.add('not-hidden');
    } else {
        document.getElementById('shopping-basket-section').classList.add('not-hidden');
        document.getElementById('menu-section').classList.remove('not-hidden');
    }
}