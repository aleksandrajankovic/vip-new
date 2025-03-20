import vipContent from "./vipContent.js";

window.onload = () => {
  document.body.classList.add("overflow-hidden");
  const preloader = document.getElementById("preloader");
  const wrapper = document.querySelector(".wrapper");
  
  // Uveri se da je wrapper već "učitan" i nevidljiv, ali prisutan.
  // Ako koristiš Tailwind, dodaj u HTML klasu "opacity-0" na wrapper.
  wrapper.style.visibility = "visible";
  
  setTimeout(() => {
    // Fade out preloader i istovremeno fade in wrapper
    preloader.classList.remove("opacity-100");
    preloader.classList.add("opacity-0", "pointer-events-none");
    
    // Pokreni fade-in wrapper odmah
    wrapper.classList.remove("opacity-0");
    wrapper.classList.add("opacity-100");
    
    preloader.addEventListener("transitionend", () => {
      preloader.style.display = "none";
      document.body.classList.remove("overflow-hidden");
    });
  }, 2000);
};




document.addEventListener("DOMContentLoaded", () => {
  document.getElementById("mainTitle").textContent = vipContent.hero.mainTitle;
  document.getElementById("subTitle").textContent = vipContent.hero.subTitle;
  document.getElementById("desc1").innerHTML = vipContent.content.description1;
  document.getElementById("desc2").textContent =
    vipContent.content.description2;
  document.getElementById("desc3").innerHTML = vipContent.content.description3;
});
function createModal(content) {
  const overlay = document.createElement("div");
  overlay.className =
    "fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-80 opacity-0 transition-opacity duration-500";

  const modalContent = document.createElement("div");
  modalContent.className =
    "relative w-11/12 sm:w-[430px] aspect-square rounded-lg p-4 bg-contain bg-no-repeat bg-center text-white";
  modalContent.style.backgroundImage = `url(${content.popupBackground})`;

  const modalText = document.createElement("div");
  modalText.className =
    "w-full h-full flex flex-col items-center justify-center mt-10 p-8";

  let listItems = "";
  if (content.description) {
    listItems += `<li class="text-gold">${content.description}</li>`;
  }
  if (content.description1) {
    listItems += `<li class="text-gold">${content.description1}</li>`;
  }
  if (content.description2) {
    listItems += `<li class="text-gold">${content.description2}</li>`;
  }
  if (content.description4) {
    listItems += `<li class="popup-center">${content.description4}</li>`;
  }

  const descriptionHtml = listItems
    ? `<ul class="list-none text-left text-[14px] max-[500px]:text-[12px] font-normal space-y-3 px-3 pt-5 my-4">${listItems}</ul>`
    : "";

  const description3Html = content.description3
    ? `<h4 class="text-gold text-[14px] max-[500px]:text-[12px] text-center sm:text-base">${content.description3}</h4>`
    : "";

  modalText.innerHTML = descriptionHtml + description3Html;

  modalContent.appendChild(modalText);
  overlay.addEventListener("click", closeModal);
  modalContent.addEventListener("click", (e) => e.stopPropagation());
  overlay.appendChild(modalContent);

  requestAnimationFrame(() => {
    overlay.classList.remove("opacity-0");
    overlay.classList.add("opacity-100");
  });
  return overlay;
}

function openModal(cardKey) {
  const content = vipContent.vipCards[cardKey];
  if (!content) return;
  const modal = createModal(content);
  document.getElementById("modal-container").appendChild(modal);
}

function openIconModal(iconKey) {
  const content = vipContent[iconKey];
  if (!content) return;
  const modal = createModal(content);
  document.getElementById("modal-container").appendChild(modal);
}

function closeModal() {
  const modalContainer = document.getElementById("modal-container");
  const modal = modalContainer.firstElementChild;
  if (modal) {
    modal.classList.remove("opacity-100");
    modal.classList.add("opacity-0");
    modal.addEventListener("transitionend", () => {
      if (modal.parentNode === modalContainer) {
        modalContainer.removeChild(modal);
      }
    });
  }
}

document.addEventListener("DOMContentLoaded", () => {
  const vipCards = document.querySelectorAll(".vip-card");
  vipCards.forEach((card) => {
    card.addEventListener("click", () => {
      const cardKey = card.getAttribute("data-card");
      openModal(cardKey);
    });
  });

  const vipIcons = document.querySelectorAll(".vip-icon");
  vipIcons.forEach((icon) => {
    icon.addEventListener("click", () => {
      const iconKey = icon.getAttribute("data-icon");
      openIconModal(iconKey);
    });
  });
});

function autoSlide(swiperContainer) {
  const wrapper = swiperContainer.querySelector(".swiper-wrapper");
  const slides = swiperContainer.querySelectorAll(".swiper-slide");
  const slideWidth = slides[0].offsetWidth;
  let currentPosition = 0;

  function moveSlides() {
    currentPosition -= 1;
    wrapper.style.transform = `translateX(${currentPosition}px)`;

    if (Math.abs(currentPosition) >= slideWidth) {
      currentPosition = 0;
      wrapper.style.transition = "none";
      wrapper.appendChild(wrapper.firstElementChild);
      wrapper.style.transform = `translateX(${currentPosition}px)`;
    }
  }

  setInterval(moveSlides, 30);
}
const swiperContainers = document.querySelectorAll(".swiper-container");
swiperContainers.forEach(autoSlide);
