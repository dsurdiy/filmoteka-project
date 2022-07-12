'use strict';


const refs = {
    openModal: document.querySelector(".footer__link"),
    body: document.querySelector("body"),
}

const overlay = document.createElement("div");
const modal = document.createElement("div");
const modalContent = `<div class="member">
<ul class="member__list">
<li class="member__title">
  Team GoIT: 
</li>
<li class="member__name">In progress...</li>
</ul>
</div>
<button type="button" class="modal__close-btn" data-close-modal><span>&#9587;</span></button>
`;

overlay.classList.add("overlay");
modal.classList.add("footer__modal");

overlay.appendChild(modal);
refs.body.prepend(overlay);

modal.insertAdjacentHTML("beforeend", modalContent);

refs.closeModalBtn = document.querySelector(".modal__close-btn");
refs.overlay = document.querySelector(".overlay");

const toggleModal = () => {
    refs.overlay.classList.toggle("open");
}

refs.openModal.addEventListener("click", toggleModal);
refs.closeModalBtn.addEventListener("click", toggleModal);





