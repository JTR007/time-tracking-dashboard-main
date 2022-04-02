let timeframe = 'weekly';
const container = document.querySelector('.grid__container');
let regularCards;

//1. Initialize Menu
const menu = document.querySelectorAll('.menu_link');

menu.forEach( e => {
    e.addEventListener('click', menuOnClick);
})

//2. Get JSON data

let data = {};

fetch('./data.json')
    .then((resp) => resp.json())
    .then((jsonData) => {
        //Create Cards
        jsonData.forEach(e => {
            container.insertAdjacentHTML('beforeend', createRegularCard(e, timeframe))
        });

        jsonData.forEach(e => {
            data[e.title] = e.timeframes;
        });

        regularCards = document.querySelectorAll('.regular__card')
        // console.log(regularCards)
    });

// Functions

function menuOnClick(ev) {
    // console.log('click', e.target.innerText.toLowerCase());
    menu.forEach(e => {
        e.classList.remove('menu__active');
    });
    ev.target.classList.add('menu__active');
    timeframe = ev.target.innerText.toLowerCase();

    updateCards(timeframe);
}

function updateCards(timeframe) {
    regularCards.forEach(card => {
        updateCard(card, timeframe)
    });
}

function updateCard(card, timeframe) {
    const title = card.querySelector('.title').innerText;
    const current = data[title][timeframe]['current'];
    const previous = data[title][timeframe]['previous'];

    const timeframeMsg = {
        'daily': 'Yesterday',
        'weekly': 'Last Week',
        'monthly': 'Last Month' 
    }

    const hoursElement = card.querySelector('.hour');
    hoursElement.innerText = `${current}hrs`;

    const msgElement = card.querySelector('.description')
    msgElement.innerText = `${timeframeMsg[timeframe]} - ${previous}hrs`;
}

function createRegularCard(e, timeframe) {
    let title = e['title'];
    let current = e['timeframes'][timeframe]['current'];
    let previous = e['timeframes'][timeframe]['previous'];
    let icono = e['icono'];
    let alt = e['alt'];

    const timeframeMsg = {
        'daily': 'Yesterday',
        'weekly': 'Last Week',
        'monthly': 'Last Month' 
    }

    // console.log(title, current, previous, icono, alt)
    return `
    <section class="${title.toLowerCase()} regular__card">
        <div class="img__top">
          <img src="${icono}" alt="${alt}">
        </div>
        <div class="grid__item">
          <div class="grid__item--row1">
            <p class="title">${title}</p>
            <img src="images/icon-ellipsis.svg" alt="ellipsis">
          </div>
          <div class="grid__item--row2">
            <p><span class="hour">${current} hrs</span><span class="description">${timeframeMsg[timeframe]} - ${previous} hrs</span></p>
          </div>
        </div>
      </section>
    `
}