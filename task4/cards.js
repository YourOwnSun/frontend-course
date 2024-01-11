class Card {
    constructor(code, name, imageLink, description, provider) {
        this.code = code;
        this.name = name;
        this.imageLink = imageLink;
        this.description = description;
        this.provider = provider;
    }
}

function renderAllCards() {
    let cardsArray = JSON.parse(window.localStorage.getItem("cards"));

    if (cardsArray === null) return;

    for (let card of cardsArray) renderCard(card)
}

function editClick(event) {
    let id = event.target.getAttribute("cardId");
    let cardsArray = JSON.parse(window.localStorage.getItem("cards"));
    let card = cardsArray.find(x => Number(x.code) === Number(id));

    document.getElementsByName('code')[0].value = card.code;
    document.getElementsByName('code')[0].disabled = true;
    document.getElementsByName('name')[0].value = card.name;
    document.getElementsByName('imgLink')[0].value = card.imageLink;
    document.getElementsByName('description')[0].value = card.description;
    document.getElementsByName('provider')[0].value = card.provider;
    document.getElementById("approveBtn").cardIndex = cardsArray.findIndex(x => Number(x.code) === Number(id));
    document.getElementById("deleteBtn").cardIndex = cardsArray.findIndex(x => Number(x.code) === Number(id));
}

function confirmClick(cardIndex) {
    let cardsArray = JSON.parse(window.localStorage.getItem("cards"));

    if (cardsArray === null) cardsArray = [];

    let isCreate = document.getElementById("approveBtn").cardIndex === undefined;

    if (cardsArray.some(x => Number(x.code) === Number(document.getElementsByName('code')[0].value)) && isCreate) {
        alert("Код должен быть уникальным!");
        return;
    }

    if (isCreate) {
        cardsArray[cardsArray.length] = getCardFromForm();
    } else {
        cardsArray[cardIndex] = getCardFromForm();
    }

    updateLocalStorage(cardsArray);
}

function getCardFromForm() {
    return new Card(
        document.getElementsByName('code')[0].value,
        document.getElementsByName('name')[0].value,
        document.getElementsByName('imgLink')[0].value,
        document.getElementsByName('description')[0].value,
        document.getElementsByName('provider')[0].value
    );
}

function deleteCard(event) {
    if (document.getElementById("deleteBtn").cardIndex === undefined)
        return;

    let cardsArray = JSON.parse(window.localStorage.getItem("cards"));
    cardsArray.splice(event.target.cardIndex, 1);

    updateLocalStorage(cardsArray);
}

function updateLocalStorage(cards) {
    window.localStorage.clear();
    window.localStorage.setItem('cards', JSON.stringify(cards));
    location.reload();
}

function clearForm() {
    document.getElementsByName('code')[0].value = "";
    document.getElementsByName('code')[0].disabled = false;
    document.getElementsByName('name')[0].value = "";
    document.getElementsByName('imgLink')[0].value = "";
    document.getElementsByName('description')[0].value = "";
    document.getElementsByName('provider')[0].value = "";
    document.getElementById("approveBtn").cardIndex = undefined;
    document.getElementById("deleteBtn").cardIndex = undefined;
}

function renderCard(card) {
    const cardDiv = document.createElement("div");
    cardDiv.id = card.code;
    cardDiv.setAttribute('class', "card");

    const code = document.createElement("span");
    code.setAttribute('cardId', card.code);
    code.textContent = `code: ${card.code}`;
    code.setAttribute('class', "text");
    cardDiv.appendChild(code);

    const cardContentDiv = document.createElement("div");
    cardContentDiv.setAttribute('cardId', card.code);
    cardContentDiv.setAttribute('class', "card__content");
    cardDiv.appendChild(cardContentDiv);

    const img = document.createElement("img");
    img.setAttribute('cardId', card.code);
    img.setAttribute('class', "card__img");
    img.src = `${card.imageLink}`;
    cardContentDiv.appendChild(img);

    const cardSubContentDiv = document.createElement("div");
    cardSubContentDiv.setAttribute('cardId', card.code);
    cardSubContentDiv.setAttribute('class', "card__content__sub");
    cardContentDiv.appendChild(cardSubContentDiv);

    const cardName = document.createElement("span");
    cardName.setAttribute('cardId', card.code);
    cardName.textContent = card.name;
    cardName.setAttribute('class', "text card__title");
    cardSubContentDiv.appendChild(cardName);

    const cardProvider = document.createElement("span");
    cardProvider.setAttribute('cardId', card.code);
    cardProvider.textContent = card.provider;
    cardProvider.setAttribute('class', "text card__provider");
    cardSubContentDiv.appendChild(cardProvider);

    const cardDescription = document.createElement("span");
    cardDescription.setAttribute('cardId', card.code);
    cardDescription.textContent = card.description;
    cardDescription.setAttribute('class', "text card__description");
    cardDiv.appendChild(cardDescription);

    const editButton = document.createElement("button");
    editButton.setAttribute('cardId', card.code);
    editButton.textContent = "Изменить";
    editButton.addEventListener('click', editClick);
    editButton.setAttribute('class', "yellow-button");
    cardDiv.appendChild(editButton);

    document.getElementsByClassName("cards-list")[0].appendChild(cardDiv);
}

function defaultCards() {
    updateLocalStorage(
        [new Card(1, "1", "https://media.baamboozle.com/uploads/images/104242/1599054197_26253", "first", "prov1"),
            new Card(2, "2", "https://img.freepik.com/premium-photo/two-3d-illustration-golden-number-2-on-white-background-and-copy-space-on-right-hand-side-for-text-best-for-anniversary-birthday-new-year-celebration_131956-92.jpg", "second", "prov2"),
            new Card(3, "3", "https://png.pngtree.com/png-vector/20210313/ourmid/pngtree-vector-font-alphabet-number-3-png-image_3053672.png", "third", "prov3"),
            new Card(4, "4", "https://cdn-icons-png.flaticon.com/512/3570/3570104.png", "fourth?", "prov4")
        ]
    );
}


const defaultBtn = document.getElementById('defaultBtn');
defaultBtn.addEventListener('click', defaultCards);

window.onload = renderAllCards;