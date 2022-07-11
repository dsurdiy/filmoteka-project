export {onScroll , onToTopBtn} 

const toTopBtn = document.querySelector('.btn-to-top');
const modalWrapper = document.querySelector('.modal-wrapper.is-hidden')
window.addEventListener('scroll', onScroll);
toTopBtn.addEventListener('click', onToTopBtn);
console.log(modalWrapper);
function onScroll() {
  const scrolled = window.pageYOffset;
  const coords = document.documentElement.clientHeight;
      
   if (scrolled > coords && modalWrapper) {
      toTopBtn.classList.add('btn-to-top--visible');
   }
   if (scrolled < coords  ) {
      toTopBtn.classList.remove('btn-to-top--visible');
   }
   
  
}

function onToTopBtn() {
  if (window.pageYOffset > 0) {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
}