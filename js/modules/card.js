import { getServer } from '../services/services';

function card() {
    //Create Cart

    class Card {
        constructor(src, alt, title, descr, price, classname, ...classes) {
            this.srs = src;
            this.alt = alt;
            this.title = title;
            this.descr = descr;
            this.price = price;
            this.classes = classes;
            this.elements = document.querySelector(classname);
            this.transfer = 27;
            this.changeToUAH();
        }

        changeToUAH() {
            this.price = this.price * this.transfer;
        }

        render() {
            const element = document.createElement('div');

            if (this.classes.length === 0) {
                this.classes = "menu__item";
                element.classList.add(this.classes);
            } else {
                this.classes.forEach(i => element.classList.add(i));
            }
            
            element.innerHTML = `
                <img src=${this.srs} alt=${this.alt}>
                <h3 class="menu__item-subtitle">${this.title}</h3>
                <div class="menu__item-descr">${this.descr}</div>
                <div class="menu__item-divider"></div>
                <div class="menu__item-price">
                    <div class="menu__item-cost">Цена:</div>
                    <div class="menu__item-total"><span>${this.price}</span> грн/день</div>
                </div>
            `;
            this.elements.append(element);
        }
    }

    getServer('http://localhost:3000/menu')
        .then(data => {
            data.forEach(({img, altimg, title, descr, price}) => {
                new Card(img, altimg, title, descr, price, ".menu .container").render();
            });
        });
}

export default card;