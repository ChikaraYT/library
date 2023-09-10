import {accountIcon, accountIconListener, createDropMenu, defaultIcon, dropItems} from "./dropMenu.js";
import {showModal, toggleModal} from "./signUp.js";
import {BODY} from "./script.js";

const changeProfile = (accountData, bool) => {
    console.log('changeProfile');
    const authIcon = document.createElement('div');
    authIcon.className = 'header__icon icon_auth';
    accountIcon.isAuth = bool;

    if (bool) {
        accountIcon.selector.replaceWith(authIcon);
        accountIcon.selector = authIcon;

        authIcon.title = `${accountData.first} ${accountData.last}`
        authIcon.innerText = `${accountData.short}`;
    } else {
        authIcon.classList.remove('icon_auth');
        accountIcon.selector.replaceWith(defaultIcon);
        accountIcon.selector = defaultIcon;
    }

    accountIconListener();
}

export var accountData = {
    first: '',
    last: '',
    short: '',
    email: '',
    password: '',
    card: '',
    statistics: {
        visits: 0,
        bonuses: 0,
        books: 0
    }
}

const checkBtn = document.querySelector('.find-check');

const showStatistics = (inputFirst, inputCard) => {
    const tempCheckBtn = checkBtn.cloneNode(true);

    const libraryCard = document.createElement('div');
    libraryCard.innerHTML = `<div class="statistics-list">
                        <div class="statistics-item">
                            <span class="statistics-text">Visits</span>
                            <img src="../assets/icon/Union.svg" alt="statistics-icon" class="statistics-icon">
                            <span class="statistics-text">23</span>
                        </div>
                        <div class="statistics-item">
                            <span class="statistics-text">bonuses</span>
                            <img src="../assets/icon/Star 1.svg" alt="statistics-icon" class="statistics-icon">
                            <span class="statistics-text">1240</span>
                        </div>
                        <div class="statistics-item">
                            <span class="statistics-text">Books</span>
                            <img src="../assets/icon/book.svg" alt="statistics-icon" class="statistics-icon">
                            <span class="statistics-text">2</span>
                        </div>
                    </div>`;

    // console.log(tempCheckBtn);
    checkBtn.replaceWith(libraryCard);
    setTimeout(function () {
        libraryCard.replaceWith(tempCheckBtn);
        inputFirst.value = '';
        inputCard.value = '';
    }, 10000);
}

const libraryCard = () => {
    const getStorage = JSON.parse(localStorage.getItem('data'));

    const inputFirst = document.querySelector('#find-name');
    const inputCard = document.querySelector('#find-card');
    if ((inputFirst.value === getStorage.first) && (inputCard.value === getStorage.card)) {
        showStatistics(inputFirst, inputCard);
    }
}

checkBtn.addEventListener('click', libraryCard)

const randomCardNumber = () => {
    const min = 0x10000000
    const max = 0xFFFFFFFF;

    const random = Math.floor(Math.random() * (max - min)) + min;
    return random.toString(16).toUpperCase();
}

const changeDrop = (accountData) => {
    if (accountIcon.isAuth) {
        createDropMenu(accountIcon.isAuth);

        const dropMenuTitle = document.querySelector('.drop-title');
        dropMenuTitle.classList.add('drop-card');

        dropItems.signUp = document.querySelector('.drop-items#sign-up');
        dropItems.login = document.querySelector('.drop-items#login');

        dropItems.signUp.classList.add('auth');
        dropItems.login.classList.add('auth')

        dropMenuTitle.innerHTML = `${accountData.card}`;

        for (const [key, element] of Object.entries(dropItems)) {
            element.addEventListener('click', () => {
                if (key === 'login') {
                    showModal();
                } else {
                    console.log('false');
                    BODY.classList.toggle("no-scroll");
                    changeProfile(accountData, false);
                    createDropMenu(accountIcon.isAuth);

                    dropItems.signUp = document.querySelector('.drop-items#sign-up');
                    dropItems.login = document.querySelector('.drop-items#login');

                    console.log(dropItems);
                }
            });
        }

    }
}

export const saveData = (event, allInputs) => {
    event.preventDefault();

    accountData = {
        first: allInputs[0].value,
        last: allInputs[1].value,
        short: `${allInputs[0].value[0].toUpperCase()}${allInputs[1].value[0].toUpperCase()}`,
        email: allInputs[2].value,
        password: allInputs[3].value,
        statistics: {
            visits: 23,
            bonuses: 1240,
            books: 2
        },
        rented: ['The Last Queen, Clive Irving', 'Dominicana, Angie Cruz'],
        card: randomCardNumber(),
    }

    localStorage.setItem('data', JSON.stringify(accountData));

    changeProfile(accountData, true);
    changeDrop(accountData);
};


