import {favoritesData} from './favorites.js';
import {showModal} from "./signUp.js";
import {modalTemplate} from "./modalTemplate.js";

// МЕНЮ БУРГЕР
export const BURGER = document.querySelector('.burger');
const BURGER_ITEM = document.querySelectorAll('.burger-line');
export const BODY = document.querySelector('body');
export const MENU = document.querySelector('.header-nav');

export const burgerAction = () => {
    BODY.classList.add("no-scroll");
    MENU.classList.toggle("header-nav_active");

    BURGER_ITEM.forEach(x => {
        x.classList.toggle("burger-line_active");
    });

    if (!(MENU.classList.contains("header-nav_active"))) {
        BODY.classList.remove("no-scroll");
    }
}

BURGER.addEventListener('click', burgerAction);

const LINKS = document.querySelectorAll('.header-nav__item');

LINKS.forEach(link => {
    link.addEventListener('click', () => {
        MENU.classList.remove('header-nav_active');
        BURGER_ITEM.forEach(x => {
            x.classList.remove("burger-line_active");
        });
        BODY.classList.remove('no-scroll');
    });
});

document.addEventListener('click', (event) => {
    const isMenuOpen = MENU.classList.contains('header-nav_active');
    const isClickInsideMenu = MENU.contains(event.target);
    const isClickInsideBurger = BURGER.contains(event.target);

    if (isMenuOpen && !isClickInsideMenu && !isClickInsideBurger) {
        MENU.classList.remove('header-nav_active');
        BURGER_ITEM.forEach(x => {
            x.classList.remove("burger-line_active");
        });
        BODY.classList.remove('no-scroll');
    }
});

// КАРУСЕЛЬ
const circles = document.querySelectorAll('.circle');
const aboutImages = document.querySelector('.about_images');
const image = document.querySelectorAll('.about__image')[0];
const imageOffset = {
    width: image.offsetWidth,
    height: image.offsetHeight,
    gap: window.getComputedStyle(aboutImages).getPropertyValue('gap').slice(0, -2)};

const carouselToRight = (x) => {
    console.log(x);
    const offsetWithGap = imageOffset.width + Number(imageOffset.gap);
    aboutImages.style.right = `${x * offsetWithGap - offsetWithGap}px`;
    console.log(favoritesData);
}

circles.forEach(x =>
    x.addEventListener('click', () => {
        circles.forEach(circle => circle.classList.remove('circle_active'));
        x.classList.add('circle_active');
        carouselToRight(x.id.slice(-1));
}));

const ARROWS = document.querySelectorAll('.arrow');
const CIRCLE_COUNT = 5;

ARROWS.forEach(arrow => arrow.addEventListener('click', () => {
    const currentCircle = Number(document.querySelector('.circle_active').id.slice(-1));
    const direction = arrow.alt === 'left' ? -1 : 1;
    const newCircle = currentCircle + direction;

    if (newCircle < 1 || newCircle > CIRCLE_COUNT) {
        return;
    }

    newCircle === 1 ? ARROWS[0].style.cursor = 'auto' : ARROWS[0].style.cursor = 'pointer';
    newCircle === CIRCLE_COUNT ? ARROWS[1].style.cursor = 'auto' : ARROWS[1].style.cursor = 'pointer';

    document.getElementById(`circle-${currentCircle}`).classList.remove('circle_active');
    document.getElementById(`circle-${newCircle}`).classList.add('circle_active');
    carouselToRight(newCircle.toString());
}));


// Favorites
const favoriteBooks = document.querySelector('.favorites-books');

const generateCards = (season) => {
    const data = favoritesData[season];

    favoriteBooks.innerHTML = '';
    for (let i = 0; i < 4; i++) {
        const bookDiv = document.createElement('div');
        bookDiv.classList.add('book'); bookDiv.id = `book-${i + 1}`
        bookDiv.innerHTML = `
            <h3 class="book-picks">Staff Picks</h3>
            <div class="book-info">
                <div class="book-main">
                    <div class="book__title">${data[i].title}</div>
                    <div class="book__author">By ${data[i].author}</div>
                    <div class="book__description">${data[i].description}</div>
                </div>
                <img src="${data[i].cover}" alt="book cover" class="book__cover">
            </div>
            <button type='submit' class="book__button">Buy</button>
        `;

        favoriteBooks.appendChild(bookDiv);
    }

    const BUY_BTNS = document.querySelectorAll('.book__button');
    BUY_BTNS.forEach(x => x.addEventListener('click', () => {
        console.log('phuh');
        showModal(modalTemplate.login);
    }));
}

document.addEventListener('DOMContentLoaded', function() {
    generateCards('winter');
});


const seasons = document.querySelectorAll('input[name="season"]');
let isAnimating = false;

seasons.forEach(season => {
    season.addEventListener('click', () => {
        if (!isAnimating) {
            isAnimating = true;
            favoriteBooks.classList.add('fade-out');

            setTimeout(() => {
                generateCards(season.id);
                favoriteBooks.classList.remove('fade-out');
                favoriteBooks.classList.add('fade-in');

                setTimeout(() => isAnimating = false, 1000)
            }, 1000);
        }
    });
});

favoriteBooks.addEventListener('animationend', () => {
    favoriteBooks.classList.remove('fade-in');
});
