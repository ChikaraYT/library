import {BODY, MENU, BURGER, burgerAction} from './script.js';
import {dropTemplate} from "./dropTemplate.js";


const dropMenu = document.createElement('div');
export const defaultIcon = document.querySelector('.header__icon').cloneNode(true);

export const accountIcon = {
    'isAuth': false,
    'selector': document.querySelector('.header__icon'),
};

export const createDropMenu = (isAuth) => {
    const dropData = isAuth ? dropTemplate['login'] : dropTemplate['signUp']

    // console.log(isAuth);
    // console.log(dropData[0]);
    // console.log(dropData[1]);

        dropMenu.className = 'drop';
    dropMenu.innerHTML =
        `<div class="drop-content">
        <div class="drop-title">Profile</div>
        <span class="drop-separator"></span>
        <ul class="drop-options">
            <li class="drop-items" id="login">${dropData[0]}</li>
            <li class="drop-items" id="sign-up">${dropData[1]}</li>        
        </ul>
    </div>`



    return dropMenu;
}

const createdDropMenu = createDropMenu(accountIcon.isAuth);
document.querySelector('header').insertAdjacentElement('beforeend', createdDropMenu);


export function toggleDrop() {
    if (MENU.classList.contains("header-nav_active")) {
        burgerAction();
    }

    console.log(dropItems.signUp);
    console.log(dropItems.login);

    // console.log('dropped');
    dropMenu.classList.toggle("drop_active");
    BODY.classList.toggle("no-scroll");
}

export const dropItems = {
    signUp: document.querySelector('.drop-items#sign-up'),
    login: document.querySelector('.drop-items#login')
};

// export const signUp = document.querySelector('.drop-items#sign-up');
// export const login = document.querySelector('.drop-items#login');

function closeDrop(event) {
    console.log('closedrop')
    const isClickInsideDrop = dropMenu.contains(event.target);
    const isLoginClicked = dropItems.login.contains(event.target);
    const isRegisterClicked = dropItems.signUp.contains(event.target);
    const isClickInsideBurger = BURGER.contains(event.target);

    // console.log(dropItems.login);
    // console.log(dropItems.signUp);
    // console.log(isClickInsideDrop);
    // console.log(isLoginClicked);
    // console.log(isRegisterClicked);
    // console.log(isClickInsideBurger);


    if (!isClickInsideDrop || isRegisterClicked || isLoginClicked) {
        toggleDrop();
    }

    if (isClickInsideBurger) {
        burgerAction();
    }
}


export function accountIconListener() {
    accountIcon.selector.addEventListener('click', (event) => {
        event.stopPropagation();
        toggleDrop();
    });
}

accountIconListener();

document.addEventListener('click', (event) => {
    if (dropMenu.classList.contains('drop_active')) {
        closeDrop(event)
    }
});

