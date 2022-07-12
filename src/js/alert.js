import Notiflix from 'notiflix';

export default function alertMessage() {
    
      return Notiflix.Notify.failure("Oop's there are no added movies")
     
}

Notiflix.Notify.init({
    width: '250px',
  position: 'center-top',
  distance: '10px',
  useIcon: true,
  failure: {
    background: '#AD9893',
  },
});