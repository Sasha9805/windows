const initModalState = state => {

  const windowForm = document.querySelectorAll('.balcon_icons_img'),
        windowType = document.querySelector('#view_type'),
        windowProfile = document.querySelectorAll('.checkbox');

  state.type = windowType.value;
  
  windowProfile.forEach((item, i) => {
    if (item.checked) {
      state.profile = (i == 0) ? 'Холодное' : 'Теплое';
    }
  });

  windowForm.forEach((item, i) => {
    if (item.classList.contains('do_image_more')) {
      state.form = i;
    }
  });

};

export default initModalState;