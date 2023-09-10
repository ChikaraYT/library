import {BODY} from './script.js';
import {accountIcon, dropItems} from "./dropMenu.js";
import {accountData, saveData} from "./localStorage.js";
import {modalTemplate} from "./modalTemplate.js";

// Кнопки в дроп меню и в блоке Digital Library Cards
const DLC_BUTTONS = {
    SIGN_UP: {
        menu: dropItems.signUp,
        button: document.querySelector('.get-button#sign-up')
    },
    LOG_IN: {
        menu: dropItems.login,
        button: document.querySelector('.get-button#log-in')
    }
};

const modal = document.createElement('div');
modal.className = 'modal';
BODY.insertBefore(modal, document.querySelector('header'));

const authModal = (modalText) => {
    const modalContent = document.createElement('div');
    modalContent.className = 'modal-content';
    modal.appendChild(modalContent);
    modalContent.innerHTML = `<img src="../assets/icon/close_btn.svg" alt="close btn" class="modal-close">
        <div class="modal-title sign-up">${modalText.title}</div>`;

    const modalForm = document.createElement('form');
    modalForm.className = 'sign-up_form';
    // modalForm.method = 'POST';

    for (let input in modalText.inputs) {
        const inputName = modalText.inputs[input];
        const inputId = inputName.toLowerCase().replace(/\s+/g, '-');
        const inputPattern = inputName === 'Password' ? 'pattern=".{8,}"' : '';

        const inputHtml = `
        <div class="sign-up_item">
            <label for="${inputId}" class="sign-up_label">${inputName}</label>
            <input class='sign-up_input' type="text" ${inputPattern} id="${inputId}" required/>
        </div>`;

        modalForm.innerHTML += inputHtml;
    }

    const modalButton = `<button type="submit" class="sign-up_submit get-button">${modalText.button}</button>`;
    modalForm.innerHTML += modalButton;
    modalContent.appendChild(modalForm);

    modalContent.innerHTML += `<div class="sign-up_note">
        <span class="sign-up_question">${modalText.questionBelow}</span>
        <a href='/' class="sign-up_link">${modalText.clickLink}</a>
    </div>`

    // console.log(modal);
    return modal;
}

const profileModal = (userData) => {
    const modalContent = document.createElement('div');
    modalContent.className = 'profile-content';
    modalContent.innerHTML = `<div class="profile-left">
        <div class="profile-pic">${userData.short}</div>
        <div class="profile-name">${userData.first} ${userData.last}</div>
    </div>
    <div class="profile-right">
        <img src="../assets/icon/close_btn.svg" alt="close_btn" class="modal-close profile-close">
            <div class="profile-title">My profile</div>
            <div class="statistics-list profile-list">
                <div class="statistics-item profile-item">
                    <span class="statistics-text profile-text">Visits</span>
                    <img src="../assets/icon/Union.svg" alt="statistics-icon" class="statistics-icon">
                        <span class="statistics-text">${userData.statistics.visits}</span>
                </div>
                <div class="statistics-item profile-item">
                    <span class="statistics-text profile-text">bonuses</span>
                    <img src="../assets/icon/Star 1.svg" alt="statistics-icon" class="statistics-icon">
                        <span class="statistics-text">${userData.statistics.bonuses}</span>
                </div>
                <div class="statistics-item profile-item">
                    <span class="statistics-text profile-text">Books</span>
                    <img src="../assets/icon/book.svg" alt="statistics-icon" class="statistics-icon">
                        <span class="statistics-text">${userData.statistics.books}</span>
                </div>
            </div>
            <div class="profile-rented">
                <div class="rented-title">Rented books</div>
                <ul class="rented-list">
                    <li class="rented-item">${userData.rented[0]}</li>
                    <li class="rented-item">${userData.rented[1]}</li>
                </ul>
            </div>
            <div class="profile-card">
                <div class="profile-card-title">Card number</div>
                <div class="profile-card-number">${userData.card}</div>
                <img src="../assets/icon/copy.svg" alt="copy" class="profile-card-copy">
            </div>
    </div>`;
    modal.appendChild(modalContent);


    // console.log(profile);
    return modal;
}

const generateModal = (modalText) => {
    modal.innerHTML = '';
    accountIcon.isAuth ? profileModal(accountData) : authModal(modalText);
}

export function toggleModal() {
    // console.log('toggleModal');
    modal.classList.toggle("modal_active");
    BODY.classList.toggle("no-scroll");
}

export const showModal = (data) => {
    // console.log('showModal');
    generateModal(data);
    toggleModal();
}

// export const authButtonsListener = () => {
//     for (const [key, element] of Object.entries(DLC_BUTTONS['LOG_IN'])) {
//         element.removeEventListener('click', loginButtonClick);
//         element.addEventListener('click', loginButtonClick);
//     }

//     for (const [key, element] of Object.entries(DLC_BUTTONS['SIGN_UP'])) {
//         element.removeEventListener('click', signUpButtonClick);
//         element.addEventListener('click', signUpButtonClick);
//     }
// }

function loginButtonClick(event) {
    console.log('loginButtonClick');
    if (!accountIcon.isAuth) {
        showModal(modalTemplate.login);
    }
}

function signUpButtonClick(event) {
    console.log('signUpButtonClick');
    if (!accountIcon.isAuth) {
        showModal(modalTemplate.signUp);
    }
}

function iHateThis() {
    console.log('blya');
    for (const [key, element] of Object.entries(DLC_BUTTONS['LOG_IN'])) {
        element.addEventListener('click', loginButtonClick);
    }
    for (const [key, element] of Object.entries(DLC_BUTTONS['SIGN_UP'])) {
        element.addEventListener('click', signUpButtonClick);
    }
}

// Инициализация открытия модульного окна
iHateThis();

// Действия с уже открытым модулем
modal.addEventListener('click', (event) => {
    // console.log(event.target);
    if (event.target.classList.contains('modal') || event.target.classList.contains('modal-close')) {
        toggleModal();
    }

    if (event.target.classList.contains('sign-up_submit')) {
        const allInputs = document.querySelectorAll('.sign-up_input');
        toggleModal();
        saveData(event, allInputs);
    }
});

