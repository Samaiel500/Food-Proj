/******/ (function() { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./js/modules/calc.js":
/*!****************************!*\
  !*** ./js/modules/calc.js ***!
  \****************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
function calc() {
  //Calc
  const res = document.querySelector('.calculating__result span');
  let famal, age, weight, height, forCalc;

  if (localStorage.getItem('sex')) {
    famal = localStorage.getItem('sex');
  } else {
    famal = 'female';
    localStorage.setItem('sex', 'female');
  }

  if (localStorage.getItem('big')) {
    forCalc = localStorage.getItem('big');
  } else {
    forCalc = 1.375;
    localStorage.setItem('big', 1.375);
  }

  function calculatingCalorie() {
    if (!famal || !age || !weight || !height || !forCalc) {
      res.textContent = '____';
      return;
    } else if (famal == 'female') {
      res.textContent = Math.round((447.6 + 9.2 * weight + 3.1 * height - 4.3 * age) * forCalc);
    } else {
      res.textContent = Math.round((88.36 + 13.4 * weight + 4.8 * height - 5.7 * age) * forCalc);
    }
  }

  calculatingCalorie();
  btnSelectFerst();

  function btnSelectFerst() {
    const elem = document.querySelectorAll('#gender div');
    elem.forEach(e => {
      e.classList.remove('calculating__choose-item_active');

      if (e.getAttribute('id') === localStorage.getItem('sex')) {
        e.classList.add('calculating__choose-item_active');
      }
    });
    elem.forEach(e => {
      e.addEventListener('click', i => {
        famal = i.target.getAttribute('id');
        elem.forEach(r => {
          r.classList.remove("calculating__choose-item_active");
        });
        i.target.classList.add('calculating__choose-item_active');
        localStorage.setItem('sex', i.target.getAttribute('id'));
        calculatingCalorie();
      });
    });
  }

  btnInput('#height');
  btnInput('#weight');
  btnInput('#age');

  function btnInput(atribute) {
    const elem = document.querySelector(atribute);
    elem.addEventListener('input', () => {
      if (elem.value.match(/\D/g)) {
        elem.style.border = '1px solid red';
      } else {
        elem.style.border = 'none';
      }

      switch (elem.getAttribute('id')) {
        case "height":
          height = +elem.value;
          break;

        case "weight":
          weight = +elem.value;
          break;

        case "age":
          age = +elem.value;
          break;
      }

      calculatingCalorie();
    });
  }

  bigSection();

  function bigSection() {
    const elem = document.querySelectorAll('.calculating__choose_big div');
    elem.forEach(e => {
      e.classList.remove("calculating__choose-item_active");

      if (localStorage.getItem('big') === e.getAttribute('data-index')) {
        e.classList.add('calculating__choose-item_active');
      }
    });
    elem.forEach(i => {
      i.addEventListener('click', a => {
        elem.forEach(r => {
          r.classList.remove("calculating__choose-item_active");
        });
        a.target.classList.add('calculating__choose-item_active');
        forCalc = a.target.getAttribute('data-index');
        localStorage.setItem('big', a.target.getAttribute('data-index'));
        calculatingCalorie();
      });
    });
  }
}

/* harmony default export */ __webpack_exports__["default"] = (calc);

/***/ }),

/***/ "./js/modules/card.js":
/*!****************************!*\
  !*** ./js/modules/card.js ***!
  \****************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _services_services__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../services/services */ "./js/services/services.js");


function card() {
  //Create Cart
  class Card {
    constructor(src, alt, title, descr, price, classname) {
      this.srs = src;
      this.alt = alt;
      this.title = title;
      this.descr = descr;
      this.price = price;

      for (var _len = arguments.length, classes = new Array(_len > 6 ? _len - 6 : 0), _key = 6; _key < _len; _key++) {
        classes[_key - 6] = arguments[_key];
      }

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

  (0,_services_services__WEBPACK_IMPORTED_MODULE_0__.getServer)('http://localhost:3000/menu').then(data => {
    data.forEach(_ref => {
      let {
        img,
        altimg,
        title,
        descr,
        price
      } = _ref;
      new Card(img, altimg, title, descr, price, ".menu .container").render();
    });
  });
}

/* harmony default export */ __webpack_exports__["default"] = (card);

/***/ }),

/***/ "./js/modules/forms.js":
/*!*****************************!*\
  !*** ./js/modules/forms.js ***!
  \*****************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _modal__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./modal */ "./js/modules/modal.js");
/* harmony import */ var _services_services__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../services/services */ "./js/services/services.js");



function forms(formSelector, timerSet) {
  //Forms
  const forms = document.querySelectorAll(formSelector);
  forms.forEach(item => {
    postData(item);
  });

  function postData(form) {
    form.addEventListener('submit', e => {
      e.preventDefault();
      const formData = new FormData(form);
      const json = JSON.stringify(Object.fromEntries(formData.entries()));
      (0,_services_services__WEBPACK_IMPORTED_MODULE_1__.postServer)('http://localhost:3000/requests', json).then(data => {
        console.log(data);
        showThanks();
      }).finally(() => {
        form.reset();
      });
    });
  }

  function showThanks() {
    const modalDialog = document.querySelector('.modal__dialog');
    modalDialog.style.display = 'none';
    (0,_modal__WEBPACK_IMPORTED_MODULE_0__.modalOpened)('.modal', timerSet);
    const thanksModal = document.createElement('div');
    thanksModal.classList.add('modal__dialog');
    thanksModal.innerHTML = `
            <div class = "modal__content">
                <div data-close="" class="modal__close">×</div>
                <div class="modal__title">Спасибо! Мы скоро с вами свяжемся!</div>
            </div>
        `;
    document.querySelector('.modal').append(thanksModal);
    setTimeout(() => {
      thanksModal.remove();
      modalDialog.style.display = 'block';
      (0,_modal__WEBPACK_IMPORTED_MODULE_0__.modalClosed)('.modal');
    }, 4000);
  }
}

/* harmony default export */ __webpack_exports__["default"] = (forms);

/***/ }),

/***/ "./js/modules/modal.js":
/*!*****************************!*\
  !*** ./js/modules/modal.js ***!
  \*****************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "modalClosed": function() { return /* binding */ modalClosed; },
/* harmony export */   "modalOpened": function() { return /* binding */ modalOpened; }
/* harmony export */ });
function modalOpened(modslSelect, timerSet) {
  const modal = document.querySelector(modslSelect);
  modal.style.display = 'block';
  document.body.style.overflow = 'hidden';

  if (timerSet) {
    clearInterval(timerSet);
  }
}

function modalClosed(modslSelect) {
  const modal = document.querySelector(modslSelect);
  modal.style.display = 'none';
  document.body.style.overflow = '';
}

function modal(selector, modslSelect, timerSet) {
  //Modal
  const modalOpen = document.querySelectorAll(selector),
        modal = document.querySelector(modslSelect);
  modalOpen.forEach(btn => {
    btn.addEventListener('click', () => modalOpened(modslSelect, timerSet));
  });
  modal.addEventListener('click', e => {
    if (e.target === modal || e.target.getAttribute('data-close') == '') {
      modalClosed(modslSelect);
    }
  });
  document.addEventListener('keydown', e => {
    if (e.code === 'Escape') {
      modalClosed(modslSelect);
    }
  });

  function showModalScrol() {
    if (window.pageYOffset + document.documentElement.clientHeight >= document.documentElement.scrollHeight) {
      modalOpened(modslSelect, timerSet);
      window.removeEventListener('scroll', showModalScrol);
    }
  }

  window.addEventListener('scroll', showModalScrol);
}

/* harmony default export */ __webpack_exports__["default"] = (modal);


/***/ }),

/***/ "./js/modules/slider.js":
/*!******************************!*\
  !*** ./js/modules/slider.js ***!
  \******************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
function slider(_ref) {
  let {
    container,
    slid,
    nextArr,
    prevArr,
    currentCount,
    totalCount
  } = _ref;
  //Slider
  const next = document.querySelector(nextArr),
        prev = document.querySelector(prevArr),
        slide = document.querySelectorAll(slid),
        wraperSlide = document.querySelector(container),
        current = document.querySelector(currentCount),
        total = document.querySelector(totalCount);
  let count = 1;

  function coutnZero(num) {
    if (num < 10) {
      return `0${num}`;
    } else {
      return num;
    }
  }

  current.innerHTML = coutnZero(count);
  total.innerHTML = coutnZero(slide.length);
  next.addEventListener('click', e => {
    e.preventDefault();

    if (count < slide.length) {
      count++;
    } else {
      count = 1;
    }

    showSlide(count - 1);
    opacityDot(count - 1);
    current.innerHTML = coutnZero(count);
  });
  prev.addEventListener('click', e => {
    e.preventDefault();

    if (count <= 1) {
      count = slide.length;
    } else {
      count--;
    }

    showSlide(count - 1);
    opacityDot(count - 1);
    current.innerHTML = coutnZero(count);
  });

  function showSlide(num) {
    slide.forEach(i => {
      i.classList.remove('active');
    });
    slide[num].classList.add('active');
  }

  const indicators = document.createElement('ol');
  indicators.classList.add('carousel-indicators');
  wraperSlide.append(indicators);

  for (let i = 0; i < slide.length; i++) {
    const dot = document.createElement('li');
    dot.setAttribute('data-slide-to', i + 1);
    dot.classList.add('dot');
    indicators.append(dot);
  }

  opacityDot();

  function opacityDot() {
    let num = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
    const dotOp = document.querySelectorAll('.dot');
    dotOp.forEach(e => {
      e.style.opacity = '0.5';
    });
    dotOp[num].style.opacity = '1';
  }

  const dotClick = document.querySelectorAll('.dot');
  dotClick.forEach(e => {
    e.addEventListener('click', i => {
      const lot = i.target.getAttribute('data-slide-to');
      showSlide(lot - 1);
      opacityDot(lot - 1);
    });
  });
}

/* harmony default export */ __webpack_exports__["default"] = (slider);

/***/ }),

/***/ "./js/modules/tabs.js":
/*!****************************!*\
  !*** ./js/modules/tabs.js ***!
  \****************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
function tabs(tabsSelector, tabsContent, perrant, activeClass) {
  //Tabs
  const tabs = document.querySelectorAll(tabsSelector),
        contantTabs = document.querySelectorAll(tabsContent),
        parrant = document.querySelector(perrant);

  function hidenTabs() {
    contantTabs.forEach(item => {
      item.style.display = 'none';
    });
    tabs.forEach(item => {
      item.classList.remove(activeClass);
    });
  }

  function showTabs() {
    let i = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
    contantTabs[i].style.display = 'block';
    tabs[i].classList.add(activeClass);
  }

  hidenTabs();
  showTabs();
  parrant.addEventListener('click', event => {
    const target = event.target;

    if (target && target.classList.contains(tabsSelector.slice(1))) {
      tabs.forEach((item, i) => {
        if (target == item) {
          hidenTabs();
          showTabs(i);
        }
      });
    }
  });
}

/* harmony default export */ __webpack_exports__["default"] = (tabs);

/***/ }),

/***/ "./js/modules/timer.js":
/*!*****************************!*\
  !*** ./js/modules/timer.js ***!
  \*****************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
function timer(deadline) {
  //Timer
  function calcTime(timer) {
    const t = Date.parse(timer) - new Date(),
          days = Math.floor(t / (1000 * 60 * 60 * 24)),
          hours = Math.floor(t / (1000 * 60 * 60) % 24),
          minutes = Math.floor(t / (1000 * 60) % 60),
          seconds = Math.floor(t / 1000 % 60);
    return {
      'Timer': t,
      'Days': days,
      'Hours': hours,
      'Minutes': minutes,
      'Seconds': seconds
    };
  }

  function zero(num) {
    if (num >= 0 && num < 10) {
      return `0${num}`;
    } else if (num < 0) {
      return '00';
    } else {
      return num;
    }
  }

  function showTime(deadline) {
    const days = document.querySelector('#days'),
          hours = document.querySelector('#hours'),
          minutes = document.querySelector('#minutes'),
          seconds = document.querySelector('#seconds'),
          timeout = setInterval(uppDate, 1000);
    uppDate();

    function uppDate() {
      const t = calcTime(deadline);
      days.innerHTML = zero(t.Days);
      hours.innerHTML = zero(t.Hours);
      minutes.innerHTML = zero(t.Minutes);
      seconds.innerHTML = zero(t.Seconds);

      if (t.Timer <= 0) {
        clearInterval(timeout);
      }
    }
  }

  showTime(deadline);
}

/* harmony default export */ __webpack_exports__["default"] = (timer);

/***/ }),

/***/ "./js/services/services.js":
/*!*********************************!*\
  !*** ./js/services/services.js ***!
  \*********************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "postServer": function() { return /* binding */ postServer; },
/* harmony export */   "getServer": function() { return /* binding */ getServer; }
/* harmony export */ });
const postServer = async (url, data) => {
  const res = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: data
  });
  return await res.json();
};

async function getServer(url) {
  const res = await fetch(url);

  if (!res.ok) {
    throw new Error(`Error ${url} status ${res.status}`);
  }

  return await res.json();
}



/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	!function() {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = function(exports, definition) {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	!function() {
/******/ 		__webpack_require__.o = function(obj, prop) { return Object.prototype.hasOwnProperty.call(obj, prop); }
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	!function() {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = function(exports) {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	}();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
!function() {
/*!**********************!*\
  !*** ./js/script.js ***!
  \**********************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _modules_tabs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./modules/tabs */ "./js/modules/tabs.js");
/* harmony import */ var _modules_timer__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./modules/timer */ "./js/modules/timer.js");
/* harmony import */ var _modules_slider__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./modules/slider */ "./js/modules/slider.js");
/* harmony import */ var _modules_modal__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./modules/modal */ "./js/modules/modal.js");
/* harmony import */ var _modules_forms__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./modules/forms */ "./js/modules/forms.js");
/* harmony import */ var _modules_card__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./modules/card */ "./js/modules/card.js");
/* harmony import */ var _modules_calc__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./modules/calc */ "./js/modules/calc.js");








document.addEventListener('DOMContentLoaded', () => {
  const timerSet = setTimeout(() => (0,_modules_modal__WEBPACK_IMPORTED_MODULE_3__.modalOpened)('.modal', timerSet), 50000);
  (0,_modules_tabs__WEBPACK_IMPORTED_MODULE_0__["default"])('.tabheader__item', '.tabcontent', '.tabheader__items', 'tabheader__item_active');
  (0,_modules_timer__WEBPACK_IMPORTED_MODULE_1__["default"])('2022-04-30');
  (0,_modules_slider__WEBPACK_IMPORTED_MODULE_2__["default"])({
    nextArr: '.offer__slider-next',
    prevArr: '.offer__slider-prev',
    slid: '.offer__slide',
    container: '.offer__slider',
    currentCount: '#current',
    totalCount: '#total'
  });
  (0,_modules_modal__WEBPACK_IMPORTED_MODULE_3__["default"])('[data-modal]', '.modal', timerSet);
  (0,_modules_forms__WEBPACK_IMPORTED_MODULE_4__["default"])('form', timerSet);
  (0,_modules_card__WEBPACK_IMPORTED_MODULE_5__["default"])();
  (0,_modules_calc__WEBPACK_IMPORTED_MODULE_6__["default"])();
});
}();
/******/ })()
;
//# sourceMappingURL=bundle.js.map