
// при наведении на тариф - кнопка становится розовой
// const tariffEls = document.querySelectorAll('.tariff');


// tariffEls.forEach(element => {
//     element.addEventListener('mouseover', (e) => {
//         const target = e.target;
//         const tariffBtn = target.querySelector('.button');
//         tariffBtn.classList.remove('tariff__btn');
//         tariffBtn.style.width = '200px';
//     });
//     element.addEventListener('mouseleave', (e) => {
//         const target = e.target;
//         const tariffBtn = target.querySelector('.button');
//         tariffBtn.classList.add('tariff__btn');
//     });
// });



// Свайпер

window.addEventListener('load', () => {
    let viewport = window.innerWidth;
    const swiperEl = document.querySelector('.tariffs__slider');
    const swiperWrapperEl = document.querySelector('.tariffs');
    const slidesSwiperEls = document.querySelectorAll('.tariff');
    if (viewport < 951) {
        swiperEl.classList.add('swiper');
        swiperWrapperEl.classList.add('swiper-wrapper');
        slidesSwiperEls.forEach(element => {
            element.classList.add('swiper-slide');
        });

        const swiper = new Swiper('.swiper', {
            scrollbar: {
                el: '.swiper-scrollbar',
                draggable: true
            },
            touchRatio: 1,
            slideToClickedSlide: true,
            hashNavigation: {
                watchState: true
            },
            spaceBetween: 20,
            autoHeight: true,
            slidesPerView: 'auto',
            centeredSlides: true,
            initialSlide: 1,
        });
    }
});




// Меню бургер
const iconMenu = document.querySelector('.menu__icon');
const menuBody = document.querySelector('.menu__body');
if (iconMenu) {
    iconMenu.addEventListener('click', (e) => {
        document.body.classList.toggle('_lock');
        iconMenu.classList.toggle('_active');
        menuBody.classList.toggle('_active');
    });
}



// Рейтинг
const raitingInput = document.querySelector('.raiting_input');
const raitingStarsEls = document.querySelectorAll('.raiting__star');
const raitingStarsBoxEl = document.querySelector('.raiting__stars');



raitingStarsBoxEl.addEventListener('click', (e) => {
    // Поиск звезды, которую выбрали
    let target = e.target;
    if (target.id === 'Star') {
        target = target.parentElement;
    } else if (target === raitingStarsBoxEl) {
        return;
    }

    // Вписываем её значение в инпут
    raitingInput.value = target.dataset.i;

    // Заполнение звёзд, до выбранной звезды
    fillingStars(target.dataset.i);
});

raitingStarsBoxEl.addEventListener('mousemove', (e) => {
    // Поиск звезды на которую смотрит мышь
    let target = e.target;
    if (target.id === 'Star') {
        target = target.parentElement;
    } else if (target === raitingStarsBoxEl) {
        return;
    }

    // Заполнение звёзд, до той звезды на которую смотрит мышь
    fillingStars(target.dataset.i);
});

raitingStarsBoxEl.addEventListener('mouseleave', () => {
    // Заполнение звёзд, до значения выбранного рейтинга
    fillingStars(raitingInput.value);
});

function fillingStars(heroStar) {
    raitingStarsEls.forEach(element => {
        // Очистка звёзд от заполнения и незаполнения
        element.classList.remove('_fill');
        element.classList.remove('_no-fill');

        // Если рейтинг не выбран, то цвет стандартный 
        // Фактически это в том случае если heroStar === raitingInput
        if (heroStar !== '') {
            if (element.dataset.i <= heroStar) {
                element.classList.add('_fill');
            }
            if (element.dataset.i > heroStar) {
                element.classList.add('_no-fill');
            }
        }
    });
}


// ОТПРАВКА ФОРМЫ

const form = document.querySelector('.registration');

// Ошибка ввода email

const EMAIL_REGEXP = /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/iu;

const inputEmail = document.querySelector('.registration__email');


inputEmail.addEventListener('input', () => {
    if (!isEmailValid(inputEmail.value)) {
        addError(inputEmail);
    } else {
        addNormal(inputEmail);
    }
    if (inputEmail.value === '') {
        removeErrorAndNormal(inputEmail);
    }
});

function isEmailValid(value) {
    return EMAIL_REGEXP.test(value);
}



// Пароль

const passwordEl = document.querySelector('.registration__password');
const confirmPasswordEl = document.querySelector('.registration__password-retyping');



confirmPasswordEl.addEventListener('input', () => {
    if (!ThesePassMatch(passwordEl.value, confirmPasswordEl.value)) {
        addError(passwordEl);
        addError(confirmPasswordEl);
    } else {
        addNormal(passwordEl);
        addNormal(confirmPasswordEl);
    }
    if (confirmPasswordEl.value === '') {
        removeErrorAndNormal(passwordEl);
        removeErrorAndNormal(confirmPasswordEl);
    }
});

passwordEl.addEventListener('input', () => {
    if (confirmPasswordEl.value !== '') {
        if (!ThesePassMatch(passwordEl.value, confirmPasswordEl.value)) {
            addError(passwordEl);
            addError(confirmPasswordEl);
        } else {
            addNormal(passwordEl);
            addNormal(confirmPasswordEl);
        }
    }
});

function ThesePassMatch(pass1, pass2) {
    if (pass1 !== pass2) {
        return false;
    } else {
        return true;
    }
}



function addError(element) {
    element.classList.add('error');
    element.classList.remove('normal');
}
function addNormal(element) {
    element.classList.remove('error');
    element.classList.add('normal');
}

function removeErrorAndNormal(element) {
    element.classList.remove('error');
    element.classList.remove('normal');
}


// Проверка при отправке формы



// let inputs = [];
// inputs.push(inputEmail, passwordEl, confirmPasswordEl);

form.addEventListener('submit', (e) => {
    e.preventDefault();



    // Получаем значения полей формы
    const email = inputEmail.value;
    const password = passwordEl.value;
    const confirmPassword = confirmPasswordEl.value;

    // Проверяем, что поля заполнены
    if (!email || !password || !confirmPassword) {
        alert('Пожалуйста, заполните все поля');
        return;
    }

    if (!isEmailValid(email)) {
        alert('Введите реальную почту');
        return;
    }

    // Проверяем, что пароли совпадают
    if (password !== confirmPassword) {
        alert('Пароли не совпадают');
        return;
    }

    // Если всё в порядке, отправляем форму
    form.submit();
});