const images = () => {

  const imgPopup = document.createElement('div'),
        workSection = document.querySelector('.works'),
        bigImage = document.createElement('img'),
        images = workSection.querySelectorAll('img');

  imgPopup.classList.add('popup_calc');
  imgPopup.setAttribute('data-popup', '');
  imgPopup.append(bigImage);
  workSection.append(imgPopup);

  imgPopup.style.display = 'none';
  imgPopup.style.justifyContent = 'center';
  imgPopup.style.alignItems = 'center';
  bigImage.classList.add('img_width');
  
  workSection.addEventListener('click', event => {
    event.preventDefault();

    let target = event.target;

    if (target && target.classList.contains('preview')) {
      imgPopup.style.display = 'flex';
      const path = target.parentNode.getAttribute('href');
      images.forEach((item, i) => {
        if (item == target && (i == 1 || i == 4 || i == 5 || i == 6)) {
          bigImage.classList.add('img_bigger_height');
        }
      });
      bigImage.src = path;
      document.body.style.overflow = 'hidden';
    }

    if (target && target.matches('.popup_calc')) {
      imgPopup.style.display = 'none';
      document.body.style.overflow = '';
      bigImage.classList.remove('img_bigger_height');
    }
  });
};

export default images;