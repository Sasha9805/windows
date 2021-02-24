const tabs = (headerSelector, tabSelector, contentSelector, activeClass) => {

  const header = document.querySelector(headerSelector),
        tab = document.querySelectorAll(tabSelector),
        content = document.querySelectorAll(contentSelector);

  function hideTabContent() {
    content.forEach(item => {
      item.style.display = 'none';
    });

    tab.forEach(item => {
      item.classList.remove(activeClass);
    });
  }

  function showTabContent(ind = 0) {
    content[ind].style.display = 'block';

    tab[ind].classList.add(activeClass);
  }

  hideTabContent();
  showTabContent();

  header.addEventListener('click', event => {
    const target = event.target;

    // if (target && (target.classList.contains(tabSelector.replace(/\./, '')) || 
    // target.parentNode.classList.contains(tabSelector.replace(/\./, '')))) {
    if (target && target.closest(tabSelector)) {
      tab.forEach((item, index) => {
        // if (item == target || item == target.parentNode) {
        if (item == target.closest(tabSelector)) {
          hideTabContent();
          showTabContent(index);
        }
      });
    }
  });
};

export default tabs;