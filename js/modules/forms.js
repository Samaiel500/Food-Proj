import { modalClosed, modalOpened } from './modal';
import { postServer } from '../services/services';

function forms(formSelector, timerSet) {
    //Forms
    const forms = document.querySelectorAll(formSelector);

    forms.forEach(item => {
        postData(item);
    });

    function postData(form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();

            const formData = new FormData(form);

            const json = JSON.stringify(Object.fromEntries(formData.entries()));

            postServer('http://localhost:3000/requests', json)
            .then(data => {
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
        modalOpened('.modal', timerSet);

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
            modalClosed('.modal');
        }, 4000);
    }
}

export default forms;