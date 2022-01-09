function timer(deadline) {
    //Timer

    function calcTime(timer) {
        const t = Date.parse(timer) - new Date(),
            days = Math.floor(t / (1000 * 60 * 60 * 24)),
            hours = Math.floor((t / (1000 * 60 * 60)) % 24),
            minutes = Math.floor((t / (1000 * 60)) % 60),
            seconds = Math.floor((t / 1000) % 60);
        
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

export default timer;