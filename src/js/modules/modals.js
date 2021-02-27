const modals = () => {
  let timer;

  let eventClose = new CustomEvent('close', {
    bubbles: true,
    composed: true,
    detail: {
      open: true
    }
  });

  function bindModal(triggerSelector, modalSelector, closeSelector, closeClickOverlay = true) {

    const trigger = document.querySelectorAll(triggerSelector),
          modal = document.querySelector(modalSelector),
          close = document.querySelector(closeSelector),
          windows = document.querySelectorAll('[data-modal]');

    trigger.forEach(item => {
    
      item.addEventListener('click', event => {

        if (event.target) {
          event.preventDefault();
        }

        if (item.closest('.popup_calc')) {
          let width = document.querySelector('#width');
          let height = document.querySelector('#height');

          if (!width.value.trim()) {
            width.focus();
            return;
          }

          if (!height.value.trim()) {
            height.focus();
            return;
          }
        }

        windows.forEach(window => {
          window.style.display = '';
          if (window.classList.contains('popup_calc_end')) {
            window.setAttribute('data-closed', 'close');
          }
        });

        if (item.classList.contains('phone_link')) {
          clearTimeout(timer);
          eventClose = null;
        }

        modal.style.display = 'block';

        document.body.style.overflow = 'hidden';
        // document.body.classList.add('modal-open');
      });
    });

    close.addEventListener('click', () => {

      windows.forEach(window => {
        window.style.display = '';
        if (window.classList.contains('popup_calc_end')) {
          window.setAttribute('data-closed', 'close');
        }
      });

      modal.style.display = '';

      document.body.style.overflow = '';
      // document.body.classList.remove('modal-open');

      setTimeout(() => {
        if (eventClose) {
          document.body.dispatchEvent(eventClose);
        }
      }, 500);
    });

    modal.addEventListener('click', event => {

      if (event.target == event.currentTarget && closeClickOverlay) {

        windows.forEach(window => {
          window.style.display = '';
          if (window.classList.contains('popup_calc_end')) {
            window.setAttribute('data-closed', 'close');
          }
        });

        modal.style.display = '';

        document.body.style.overflow = '';

        setTimeout(() => {
          if (eventClose) {
            document.body.dispatchEvent(eventClose);
          }
        }, 500);
      }

    });
  }

  function showModalByTime(selector, time) {

    timer = setTimeout(function() {
    // setTimeout(function() {
      // if (!document.body.classList.contains('modal-open')) {
      if (document.body.style.overflow == '') {
        document.querySelector(selector).style.display = 'block';

        document.body.style.overflow = 'hidden';
      } else {
        document.body.addEventListener('close', event => {

          if (event.detail.open) {
            let isClosed = Array.from(document.querySelectorAll('[data-modal]')).every(item => item.style.display == '');
            if (isClosed) {
              document.querySelector(selector).style.display = 'block';

              document.body.style.overflow = 'hidden';

              event.detail.open = false;
            }
          }
        });
      }
    }, time);
  }

  showModalByTime('.popup', 5000);

  bindModal('.popup_engineer_btn', '.popup_engineer', '.popup_engineer .popup_close');
  bindModal('.phone_link', '.popup', '.popup .popup_close');
  bindModal('.popup_calc_btn', '.popup_calc', '.popup_calc_close');
  bindModal('.popup_calc_button', '.popup_calc_profile', '.popup_calc_profile_close', false);
  bindModal('.popup_calc_profile_button', '.popup_calc_end', '.popup_calc_end_close', false);
};

export default modals;