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

    modal.addEventListener('click', (e) => {
        if (e.target === modal || e.target.getAttribute('data-close') == '') {
            modalClosed(modslSelect);
        }
    });

    document.addEventListener('keydown', (e) => {
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

export default modal;
export { modalClosed, modalOpened };