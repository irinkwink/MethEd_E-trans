const init = () => {
    let mapZoom = 16;
    let markSize = 70;

    if (window.innerWidth <= 940) {
        mapZoom = 15;
        markSize = 40;
    } 
    
    const myMap = new ymaps.Map(
        'map',
        {
            center: [55.7718, 37.6286],
            zoom: mapZoom,
            controls: ['smallMapDefaultSet'],
        },
        {},
        );
        const myPlacemark = new ymaps.Placemark(
        [55.7724, 37.6252], {
            hintContent: 'ул.&nbsp;Трубная&nbsp;104/3 1&nbsp;этаж'
        },
        {   
            iconLayout: 'default#image',
            iconImageHref: 'img/mark.svg',
            iconImageSize: [markSize, markSize],
            iconImageOffset: [-markSize / 2, -markSize],
        },
        );
        myMap.geoObjects.add(myPlacemark);

        window.addEventListener('resize', () => {
            if (window.innerWidth <= 940) {
                myMap.setZoom(15);
                myPlacemark.options.set('iconImageSize', [40, 40]);
                myPlacemark.options.set('iconImageOffset', [-20, -40]);
            } else {
                myMap.setZoom(16);
                myPlacemark.options.set('iconImageSize', [70, 70]);
                myPlacemark.options.set('iconImageOffset', [-35, -70]);
            }
        })
}   

ymaps.ready(init);

const createElem = (tag, attr) => {
    const elem = document.createElement(tag);

    return Object.assign(elem, { ...attr });
}

const disabledScroll = () => {
    document.body.ScrollPosition = window.scrollY;
    document.body.style.cssText = `
        overflow: hidden;
        position: fixed;
        top: -${document.body.ScrollPosition}px;
        left: 0;
        height: 100wh;
        width: 100wv;
        padding-right: ${window.innerWidth - document.body.offsetWidth}px;
    `;
}

const enabledScroll = () => {
    document.body.style.cssText = '';
    window.scroll({
        top: document.body.ScrollPosition,
        behavior: 'auto'
    });
};

const createModal = (title, description) => {
    const overlayElem = createElem('div', {className: 'modal'});
    const modalElem = createElem('div', {className: 'modal__block'});
    const modalContainerElem = createElem ('div', {className: 'modal__container'});

    const titleElem = createElem('h2', {
        className: 'modal__title',
        textContent: `Заказать ${title}`
    });

    const descriptionElem = createElem('p', {
        className: 'modal__description',
        textContent: description
    });

    const formElem = createElem('form', {
        className: 'modal__form',
        method: 'post',
        action: 'https://jsonplaceholder.typicode.com/posts',
        id: 'order'
    });

    const nameLabelElem = createElem('label', {
        className: 'modal__label',
    });
    const nameSpanElem = createElem('span', {
        className: 'modal__text',
        textContent: 'Имя'
    });
    const nameInputElem = createElem('input', {
        className: 'modal__input',
        type: 'text',
        placeholder: 'Введите ваше имя',
        name: 'name',
        required: true
    });

    const phoneLabelElem = createElem('label', {
        className: 'modal__label',
    });
    const phoneSpanElem = createElem('span', {
        className: 'modal__text',
        textContent: 'Телефон'
    });
    const phoneInputElem = createElem('input', {
        className: 'modal__input',
        type: 'text',
        placeholder: 'Введите ваш телефон',
        name: 'phone',
        required: true
    });

    const hideInputElem = createElem('input', {
        type: 'hidden',
        name: 'product',
        value: title
    });

    const btnSubmitElem = createElem('button', {
        className: 'modal__btn',
        textContent: 'Заказать',
        type: 'submit'
    });
    btnSubmitElem.setAttribute('form', 'order');

    const closeModalElem = createElem('button', {
        className: 'modal__close',
        innerHTML: `
            <svg width="30" height="30" viewbox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M23.75 8.0125L21.9875 6.25L15 13.2375L8.0125 6.25L6.25 8.0125L13.2375 15L6.25 21.9875L8.0125 23.75L15 16.7625L21.9875 23.75L23.75 21.9875L16.7625 15L23.75 8.0125Z" fill="#18171A"/>
            </svg>
        `
    });

    overlayElem.addEventListener('click', event => {
        const target = event.target;
        if (target === overlayElem || target.closest('.modal__close')) {
            overlayElem.remove();
            enabledScroll();
        };
    });

    nameLabelElem.append(nameSpanElem, nameInputElem);
    phoneLabelElem.append(phoneSpanElem, phoneInputElem);
    formElem.append(nameLabelElem, phoneLabelElem, hideInputElem);
    modalContainerElem.append(
        titleElem, 
        descriptionElem, 
        formElem, 
        btnSubmitElem, 
        closeModalElem);
    modalElem.append(modalContainerElem);
    overlayElem.append(modalElem);

    disabledScroll();

    document.body.append(overlayElem);
};

const productTtitle = document.querySelectorAll('.product__title');
const productDescription = document.querySelectorAll('.product__description');
const productBtn = document.querySelectorAll('.product__btn');

for (let i = 0; i < productBtn.length; i++) {
    productBtn[i].addEventListener('click', () => {
        const title = productTtitle[i].textContent;
        const description = productDescription[i].textContent;

        createModal(title, description);
    }) ;
}