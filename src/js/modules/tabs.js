
const tabs = (headerSelector, tabSelector, contentSelector, activeClass, display = 'block') => {
  const header = document.querySelector(headerSelector),
        tabArr = document.querySelectorAll(tabSelector),
        contentArr = document.querySelectorAll(contentSelector);
      
  function hideContent() {
    contentArr.forEach(item => {
      item.classList.remove('animated_9ms', 'fadeIn');
      item.style.display = 'none';
    });

    tabArr.forEach(item => {
      item.classList.remove(activeClass);
    })
  }

  function showContent(i = 0) {
    contentArr[i].classList.add('animated_9ms', 'fadeIn');
    contentArr[i].style.display = display;
    tabArr[i].classList.add(activeClass);
  }

  hideContent();
  showContent();

  header.addEventListener("click", e => {
    const target = e.target;


    if (target && target.closest(tabSelector)) {

      tabArr.forEach((item, i) => {
        if (target == item || target.parentNode == item) { 
          hideContent();
          showContent(i);
        }
      });
    }
  });
}

export default tabs;