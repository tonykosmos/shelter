let pets = [];
const request = new XMLHttpRequest();
request.open('GET', './pets.json');

request.onload = () => {
  pets = JSON.parse(request.response);
};

const menuIcon = document.querySelector('.burger-menu-icon');
const burgerMenu = document.querySelector('.burger-menu');
const shadow = document.querySelector('.shadow');
const body = document.querySelector('body');
const startLink = document.querySelector('.burger-menu .header-nav-list__item:first-child a');
const modal = document.querySelector('.modal');
const modalBody = document.querySelector('.modal-body');
const modalCloseButton = document.querySelector('.modal button');
const sliderItemImage = document.querySelector('.modal-image img');
const sliderItemPetName = document.querySelector('.pet-name__heading');
const sliderItemBreed = document.querySelector('.pet-name__subheading');
const sliderItemPetDescribing = document.querySelector('.pet-describing');
const sliderItemPetAge = document.querySelector('.pet-features__item:nth-child(1) span');
const sliderItemPetInoculations = document.querySelector('.pet-features__item:nth-child(2) span');
const sliderItemPetDiseases = document.querySelector('.pet-features__item:nth-child(3) span');
const sliderItemPetParasites = document.querySelector('.pet-features__item:nth-child(4) span');
const sliderItems = document.querySelectorAll('.slider-active .slider-item');
const hideSliderItems = document.querySelectorAll('.not-active .slider-item');
const items = document.querySelectorAll('.slider-items-block');
const leftArrow = document.querySelector('.arrow-left');
const rightArrow = document.querySelector('.arrow-right');

const set = new Set();
let arr = [4, 0, 2];

function closeBurger() {
  if (menuIcon.classList.contains('menu-open')) {
    menuIcon.classList.add('menu-close');
    menuIcon.classList.remove('menu-open');
    burgerMenu.classList.remove('burger-menu_visible');
    burgerMenu.classList.add('burger-menu_non-visible');
    shadow.classList.remove('visible');
    body.classList.remove('no-scroll');
  }
}

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

startLink.addEventListener('click', closeBurger);

menuIcon.addEventListener('click', () => {
  if (!menuIcon.classList.contains('menu-open') && !menuIcon.classList.contains('menu-close')) {
    menuIcon.classList.add('menu-open');
    burgerMenu.classList.add('burger-menu_visible');
    shadow.classList.add('visible');
    body.classList.add('no-scroll');
  } else if (menuIcon.classList.contains('menu-open')) {
    closeBurger();
  } else {
    menuIcon.classList.remove('menu-close');
    menuIcon.classList.add('menu-open');
    burgerMenu.classList.add('burger-menu_visible');
    burgerMenu.classList.remove('burger-menu_non-visible');
    shadow.classList.add('visible');
    body.classList.add('no-scroll');
  }
});

function changeSlide() {
  const petName = document.querySelectorAll('.not-active .slider-item__name');
  const sliderImg = document.querySelectorAll('.not-active .slider-item__image img');
  while (set.size < 6) {
    set.add(getRandomInt(0, pets.length - 1));
  }

  for (const value of set) {
    if (value === arr[0] || value === arr[1] || value === arr[2]) {
      set.delete(value);
    }
  }

  arr = Array.from(set);
  arr.length = 3;

  for (let i = 0; i < petName.length; i += 1) {
    petName[i].textContent = pets[arr[i]].name;
    sliderImg[i].src = pets[arr[i]].img;
  }

  set.clear();
}

leftArrow.addEventListener('click', changeSlide);
rightArrow.addEventListener('click', changeSlide);

for (let i = 0; i < sliderItems.length; i += 1) {
  sliderItems[i].addEventListener('click', () => {
    if (!modal.classList.contains('active')) {
      modal.classList.add('active');
      shadow.classList.add('visible');
      body.classList.add('no-scroll');
      sliderItemImage.src = pets[arr[i]].img;
      sliderItemPetName.textContent = pets[arr[i]].name;
      sliderItemBreed.textContent = pets[arr[i]].type;
      sliderItemPetDescribing.textContent = pets[arr[i]].description;
      sliderItemPetAge.textContent = pets[arr[i]].age;
      sliderItemPetInoculations.textContent = pets[arr[i]].inoculations;
      sliderItemPetDiseases.textContent = pets[arr[i]].diseases;
      sliderItemPetParasites.textContent = pets[arr[i]].parasites;
    }
  });
}

for (let i = 0; i < hideSliderItems.length; i += 1) {
  hideSliderItems[i].addEventListener('click', () => {
    if (!modal.classList.contains('active')) {
      modal.classList.add('active');
      shadow.classList.add('visible');
      body.classList.add('no-scroll');
      sliderItemImage.src = pets[arr[i]].img;
      sliderItemPetName.textContent = pets[arr[i]].name;
      sliderItemBreed.textContent = pets[arr[i]].type;
      sliderItemPetDescribing.textContent = pets[arr[i]].description;
      sliderItemPetAge.textContent = pets[arr[i]].age;
      sliderItemPetInoculations.textContent = pets[arr[i]].inoculations;
      sliderItemPetDiseases.textContent = pets[arr[i]].diseases;
      sliderItemPetParasites.textContent = pets[arr[i]].parasites;
    }
  });
}

function closeModal() {
  if (modal.classList.contains('active')) {
    modal.classList.remove('active');
    shadow.classList.remove('visible');
    body.classList.remove('no-scroll');
  }
}

shadow.addEventListener('click', closeModal);
shadow.addEventListener('click', closeBurger);
modalCloseButton.addEventListener('click', closeModal);

modalBody.addEventListener('mouseout', () => {
  modalCloseButton.classList.add('button-background');
});

modalBody.addEventListener('mouseover', () => {
  modalCloseButton.classList.remove('button-background');
});

// slider

let currentItem = 0;
let isEnabled = true;

function changeCurrentItem(n) {
  currentItem = (n + items.length) % items.length;
}

function hideItem(direction) {
  isEnabled = false;
  items[currentItem].classList.add(direction);
  items[currentItem].addEventListener('animationend', () => {
    this.classList.remove('slider-active', direction);
    this.classList.add('not-active');
  });
}

function showItem(direction) {
  items[currentItem].classList.add('next', direction);
  items[currentItem].addEventListener('animationend', function () {
    this.classList.remove('next', direction);
    this.classList.add('slider-active');
    this.classList.remove('not-active');
    isEnabled = true;
  });
}

function nextItem(n) {
  hideItem('to-left');
  changeCurrentItem(n + 1);
  showItem('from-right');
}

function previousItem(n) {
  hideItem('to-right');
  changeCurrentItem(n - 1);
  showItem('from-left');
}

leftArrow.addEventListener('click', () => {
  if (isEnabled) {
    previousItem(currentItem);
  }
});

rightArrow.addEventListener('click', () => {
  if (isEnabled) {
    nextItem(currentItem);
  }
});

request.send();
