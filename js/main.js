
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







// Проверка на совпадение паролей

const regBtn = document.querySelector('.registration__btn');
const regEmailInp = document.querySelector('.registration__email')
const regPassInp = document.querySelector('.registration__password');
const regRetypePassInp = document.querySelector('.registration__password-retyping');

let inputs = [];
inputs.push(regEmailInp, regPassInp, regRetypePassInp);

regBtn.addEventListener('click', (e) => {
    inputs.forEach(element => {
        if (element.value === '') {
            e.preventDefault();
            element.style.border = '1px solid red';
        }
    });
});

regRetypePassInp.addEventListener('input', () => {
    regRetypePassInp.style.border = '';
    const passwordOrg = regPassInp.value;
    const passwordRetype = regRetypePassInp.value;
    if (IsPasswod(passwordOrg, passwordRetype)) {
        regPassInp.style.border = '1px solid green';
        regRetypePassInp.style.border = '1px solid green';
    } else {
        regPassInp.style.border = '1px solid red';
        regRetypePassInp.style.border = '1px solid red';
    }
});

function IsPasswod(orgPass, enterPass) {
    if (orgPass !== enterPass) {
        return false;
    } else {
        return true;
    }
}


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
const raitingStars = document.querySelectorAll('.raiting__star');


raitingStars.forEach(element => {
    let fillingStars;
    // let click = false;
    let tempArray = [];
    element.addEventListener('mouseover', (e) => {
        fillingStars = [];
        raitingStars.forEach((ellem) => {
            if (ellem.classList.contains('_filling')) {
                ellem.classList.remove('_filling');
            }

            // let temperRemovingStars = IsUserNotRechoice(tempArray, raitingStars);
            // function IsUserNotRechoice(temp, stars) {
            //     for (let i = 0; i < stars.length; i++) {
            //         if (stars[i] !== temp[i]) {
            //             return false;
            //         }
            //     }
            //     return temp;
            // }

            if (ellem.classList.contains('_fill')) {
                ellem.classList.remove('_fill');
            }
        });

        let star = e.target;
        if (star === undefined || star.id === 'Star') {
            star = star.parentElement;
        }
        for (let i = 0; i < raitingStars.length; i++) {
            const elm = raitingStars[i];
            if (elm.dataset.i !== star.dataset.i) {
                fillingStars.push(elm);
            } else {
                fillingStars.push(elm);
                break;
            }
        }
        fillingStars.forEach(el => {
            el.classList.add('_filling');
        });
    });
    element.addEventListener('mouseleave', () => {
        fillingStars = [];
        raitingStars.forEach(e => {
            if (e.classList.contains('_filling')) {
                e.classList.remove('_filling');
            }
        });
        tempArray.forEach(elemment => {
            elemment.classList.add('_fill');
        });
    });
    element.addEventListener('click', (e) => {
        click = true;
        raitingInput.value = element.dataset.i;
        console.log(raitingInput.value);
        fillingStars.forEach(theElem => {
            theElem.classList.add('_fill');
        });
        tempArray = fillingStars;
        for (let i = 0; i < raitingStars.length; i++) {
            const elnt = raitingStars[i];
            if (elnt !== fillingStars[i]) {
                elnt.classList.add('_fiil_when_click');
            }
        }
    });
});


