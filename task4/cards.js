class Card {
    constructor(code, name, imageLink, description, provider, id) {
        this.code = code;
        this.name = name;
        this.imageLink = imageLink;
        this.description = description;
        this.provider = provider;
        this.id = id;
    }
}

function fetchAllData() {
    fetchDevProfile();
    fetchCards();
}

async function fetchDevProfile() {
    try {
        await fetch('http://localhost:3000/devProfile').then(res => res.json()).then(
            data => {
                document.getElementById('devProfileSpan').textContent = `${data.name} ${data.group}`;
            }
        );
    } catch (err) {
        alert("Не удалось загрузить информацию об авторе");
    }
}

async function fetchCards() {
    try {
        let cardsArray = await fetch('http://localhost:3000/cards').then(res => res.json());
        document.getElementById('skeleton-card').classList.add('hidden');

        if (cardsArray.length === 0) return;

        for (let card of cardsArray) {
            renderCard(card);
        }

    } catch (err) {
        alert("Не удалось загрузить карточки");
    }
}

async function editClick(event) {
    let id = event.target.getAttribute("cardId");

    try{
        let card = await fetch(`http://localhost:3000/cards/${id}`).then(res => res.json());
        document.getElementsByName('code')[0].value = card.code;
        document.getElementsByName('code')[0].disabled = true;
        document.getElementsByName('name')[0].value = card.name;
        document.getElementsByName('imgLink')[0].value = card.imageLink;
        document.getElementsByName('description')[0].value = card.description;
        document.getElementsByName('provider')[0].value = card.provider;
        document.getElementById("approveBtn").cardIndex = card.code;
        document.getElementById("deleteBtn").cardIndex = card.code;
    }catch (err) {
        alert("Произошла ошибка при получении карточки!");
    }
}

async function confirmClick(cardIndex) {
    document.getElementById('preloader').classList.remove('hidden');

    let cardsArray;

    try {
        cardsArray = await fetch('http://localhost:3000/cards').then(res => res.json());
    } catch (err) {
        alert("При получении массива данных что-то пошло не так");
    }

    if (cardsArray === null) cardsArray = [];

    let isCreate = document.getElementById("approveBtn").cardIndex === undefined;

    if (cardsArray.some(x => Number(x.code) === Number(document.getElementsByName('code')[0].value)) && isCreate) {
        alert("Код должен быть уникальным!");
        document.getElementById('preloader').classList.add('hidden');
        return;
    }


    let card = getCardFromForm();
    if (isCreate) {
        try {
            await fetch('http://localhost:3000/cards', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json;charset=utf-8'
                },
                body: JSON.stringify(card)
            });
            renderCard(card);
        } catch (err) {
            alert("Что-то пошло не так");
        }
    } else {
        await fetch(`http://localhost:3000/cards/${cardIndex}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify(card)
        });
        location.reload();
    }

    clearForm();
    document.getElementById('preloader').classList.add('hidden');
}

function getCardFromForm() {
    return new Card(
        document.getElementsByName('code')[0].value,
        document.getElementsByName('name')[0].value,
        document.getElementsByName('imgLink')[0].value,
        document.getElementsByName('description')[0].value,
        document.getElementsByName('provider')[0].value,
        `${document.getElementsByName('code')[0].value}`
    );
}

async function deleteCard(event) {
    if (document.getElementById("deleteBtn").cardIndex === undefined)
        return;

    try {
        await fetch(`http://localhost:3000/cards/${event.target.cardIndex}`, {
            method: 'DELETE'
        });
        document.getElementById(`${event.target.cardIndex}`).remove();
        clearForm();
    } catch (err) {
        alert("Не удалось удалить карточку");
    }
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

fetchAllData();