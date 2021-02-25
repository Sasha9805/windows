import checkNumInputs from './checkNumInputs';

const changeModalState = state => {

  const windowForm = document.querySelectorAll('.balcon_icons_img'),
        windowWidth = document.querySelectorAll('#width'),
        windowHeight = document.querySelectorAll('#height'),
        windowType = document.querySelectorAll('#view_type'),
        windowProfile = document.querySelectorAll('.checkbox');

  checkNumInputs('#width');
  checkNumInputs('#height');

  function bindActionToElems(event, elem, prop) {
    elem.forEach((item, ind) => {
      item.addEventListener(event, () => {
        switch (item.nodeName) {
          case 'SPAN':
            state[prop] = ind;
            break;
          case 'SELECT':
            state[prop] = item.value;
            break;
          case 'INPUT':
            if (item.getAttribute('type') == 'checkbox') {
              state[prop] = (ind == 0) ? 'Холодное' : 'Теплое';
              elem.forEach((box, i) => {
                box.checked = false;
                if (i == ind) {
                  box.checked = true;
                }
              });
            } else {
              state[prop] = item.value;
            }
            break;
        }
        
        console.log(state);
      });
    });
  }
  
  bindActionToElems('click', windowForm, 'form');
  bindActionToElems('input', windowWidth, 'width');
  bindActionToElems('input', windowHeight, 'height');
  bindActionToElems('change', windowType, 'type');
  bindActionToElems('change', windowProfile, 'profile');
        
};

export default changeModalState;