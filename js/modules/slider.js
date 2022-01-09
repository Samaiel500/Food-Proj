function slider({container, slid, nextArr, prevArr, currentCount, totalCount}) {
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

    next.addEventListener('click', (e) => {
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

    prev.addEventListener('click', (e) => {
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
    function opacityDot(num = 0) {
        const dotOp = document.querySelectorAll('.dot');
        dotOp.forEach(e => {
            e.style.opacity = '0.5';
        });
        dotOp[num].style.opacity = '1';
    }

    const dotClick = document.querySelectorAll('.dot');
    dotClick.forEach(e => {
        e.addEventListener('click', (i) => {
            const lot = i.target.getAttribute('data-slide-to');
            showSlide(lot - 1);
            opacityDot(lot - 1);
        });
        
    });
}

export default slider;