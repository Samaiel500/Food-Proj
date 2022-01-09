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
            res.textContent = Math.round((447.6 + (9.2 * weight) + (3.1 * height) - (4.3 * age))*forCalc);
        } else {
            res.textContent = Math.round((88.36 + (13.4 * weight) + (4.8 * height) - (5.7 * age))*forCalc);
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

export default calc;