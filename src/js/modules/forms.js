import checkNumInputs from './checkNumInputs';
import initModalState from './initModalState';

const forms = state => {

  const form = document.querySelectorAll('form'),
        inputs = document.querySelectorAll('input');

  checkNumInputs('input[name="user_phone"]');

  const message = {
    loading: 'Загрузка...',
    failure: 'Что-то пошло не так...',
    success: 'Спасибо! Скоро мы с вами свяжемся'
  };

  const postData = async (url, data) => {

    document.querySelector('.status').textContent = message.loading;

    let res = await fetch(url, {
      body: data,
      method: 'POST'
    });

    return await res.text();
  };

  const clearInputs = () => {
    inputs.forEach(item => {
      item.value = '';
    });
  };

  form.forEach(item => {
    item.addEventListener('submit', event => {
      
      event.preventDefault();

      let statusMessage = document.createElement('div');
      statusMessage.classList.add('status');
      item.append(statusMessage);

      const formData = new FormData(item);

      if (item.hasAttribute('data-calc')) {
        for (let key in state) {
          formData.append(key, state[key]);
        }
      }

      postData('assets/server.php', formData)
        .then(res => {
          console.log(res);
          statusMessage.textContent = message.success;
        })
        .catch(() => {
          statusMessage.textContent = message.failure;
        })
        .finally(() => {
          clearInputs();

          if (item.closest('.popup_calc_end')) {
            item.closest('.popup_calc_end').setAttribute('data-closed', 'open');
            for (let key in state) {
              delete state[key];
            }
            initModalState(state);
          }

          setTimeout(() => {
            statusMessage.remove();
            if (item.closest('.popup_calc_end') && 
                item.closest('.popup_calc_end').getAttribute('data-closed') == 'open') {
              document.querySelector('.popup_calc_end .popup_calc_end_close').click();
            }
          }, 3000);
        });
    });
  });
};

export default forms;