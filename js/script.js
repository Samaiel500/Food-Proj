import tabs from './modules/tabs';
import timer from './modules/timer';
import slider from './modules/slider';
import modal from './modules/modal';
import forms from './modules/forms';
import card from './modules/card';
import calc from './modules/calc';
import { modalOpened } from './modules/modal';

document.addEventListener('DOMContentLoaded', () => {
    const timerSet = setTimeout(() => modalOpened('.modal', timerSet), 50000);
    
    tabs('.tabheader__item', '.tabcontent', '.tabheader__items', 'tabheader__item_active');
    timer('2022-04-30');
    slider({
        nextArr: '.offer__slider-next',
        prevArr: '.offer__slider-prev',
        slid: '.offer__slide',
        container: '.offer__slider',
        currentCount: '#current',
        totalCount: '#total'
    });
    modal('[data-modal]', '.modal', timerSet);
    forms('form', timerSet);
    card();
    calc();
});