const modals = () => {
  // let timer;

  function bindModal(triggerSelector, modalSelector, closeSelector) {

    const trigger = document.querySelectorAll(triggerSelector),
          modal = document.querySelector(modalSelector),
          close = document.querySelector(closeSelector);

    trigger.forEach(item => {
    
      item.addEventListener('click', event => {

        if (event.target) {
          event.preventDefault();
        }

        // if (item.classList.contains('phone_link')) {
        //   clearTimeout(timer);
        // }

        modal.style.display = 'block';

        // document.body.style.overflow = 'hidden';
        document.body.classList.add('modal-open');
      });
    });

    close.addEventListener('click', () => {
      modal.style.display = '';

      // document.body.style.overflow = '';
      document.body.classList.remove('modal-open');
    });

    modal.addEventListener('click', event => {

      if (event.target == event.currentTarget) {

        modal.style.display = '';

        // document.body.style.overflow = '';
        document.body.classList.remove('modal-open');
      }

    });
  }

  function showModalByTime(selector, time) {
    // timer = setTimeout(function() {
    setTimeout(function() {
      document.querySelector(selector).style.display = 'block';

      // document.body.style.overflow = 'hidden';
      document.body.classList.add('modal-open');
    }, time);
  }

  showModalByTime('.popup', 7000);

  bindModal('.popup_engineer_btn', '.popup_engineer', '.popup_engineer .popup_close');
  bindModal('.phone_link', '.popup', '.popup .popup_close');
};

export default modals;