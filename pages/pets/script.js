let pets = []; // 8
let fullPetsList = []; // 48
const request = new XMLHttpRequest();
request.open('GET', './pets.json');

request.onload = () => {
  pets = JSON.parse(request.response);
};

const menuIcon = document.querySelector('.burger-menu-icon');
const burgerMenu = document.querySelector('.burger-menu');
const shadow = document.querySelector('.shadow');
const body = document.querySelector('body');
const startLink = document.querySelector('.burger-menu .header-nav-list__item:nth-child(2) a');
const header = document.querySelector('header');
const headerNav = document.querySelector('header');
const petsBlock = document.querySelector('.pets');
const sliderItems = document.querySelectorAll('.pets-item');
const modal = document.querySelector('.modal');
const modalBody = document.querySelector('.modal-body');
const modalCloseButton = document.querySelector('.modal button');
const sliderItemName = document.querySelectorAll('.pets-item__name');
const sliderItemPhoto = document.querySelectorAll('.pets-item img');
const sliderItemImage = document.querySelector('.modal-image img');
const sliderItemPetName = document.querySelector('.pet-name__heading');
const sliderItemBreed = document.querySelector('.pet-name__subheading');
const sliderItemPetDescribing = document.querySelector('.pet-describing');
const sliderItemPetAge = document.querySelector('.pet-features__item:nth-child(1) span');
const sliderItemPetInoculations = document.querySelector('.pet-features__item:nth-child(2) span');
const sliderItemPetDiseases = document.querySelector('.pet-features__item:nth-child(3) span');
const sliderItemPetParasites = document.querySelector('.pet-features__item:nth-child(4) span');

function closeBurger() {
  if (menuIcon.classList.contains('menu-open')) {
    menuIcon.classList.add('menu-close');
    menuIcon.classList.remove('menu-open');
    burgerMenu.classList.remove('burger-menu_visible');
    burgerMenu.classList.add('burger-menu_non-visible');
    header.classList.remove('absolute');
    shadow.classList.remove('visible');
    body.classList.remove('no-scroll');
  }
}

function closeModal() {
  if (modal.classList.contains('active')) {
    modal.classList.remove('active');
    shadow.classList.remove('visible');
    body.classList.remove('no-scroll');
  }
}

menuIcon.addEventListener('click', () => {
  if (!menuIcon.classList.contains('menu-open') && !menuIcon.classList.contains('menu-close')) {
    menuIcon.classList.add('menu-open');
    burgerMenu.classList.add('burger-menu_visible');
    header.classList.add('absolute');
    shadow.classList.add('visible');
    body.classList.add('no-scroll');
  } else if (menuIcon.classList.contains('menu-open')) {
    closeBurger();
  } else {
    menuIcon.classList.remove('menu-close');
    menuIcon.classList.add('menu-open');
    burgerMenu.classList.add('burger-menu_visible');
    burgerMenu.classList.remove('burger-menu_non-visible');
    header.classList.add('absolute');
    shadow.classList.add('visible');
    body.classList.add('no-scroll');
  }
});

startLink.addEventListener('click', closeBurger);
shadow.addEventListener('click', closeBurger);
shadow.addEventListener('click', closeModal);
modalCloseButton.addEventListener('click', closeModal);

modalBody.addEventListener('mouseout', () => {
  modalCloseButton.classList.add('button-background');
});

modalBody.addEventListener('mouseover', () => {
  modalCloseButton.classList.remove('button-background');
});

// generagiton of pseudo-random arr
const sort6recursively = (list) => {
  const { length } = list;

  for (let i = 0; i < (length / 6); i += 1) {
    const stepList = list.slice(i * 6, (i * 6) + 6);

    for (let j = 0; j < 6; j += 1) {
      const duplicatedItem = stepList.find((item, ind) => {
        return item.name === stepList[j].name && (ind !== j);
      });

      if (duplicatedItem !== undefined) {
        const ind = (i * 6) + j;
        const which8OfList = Math.trunc(ind / 8);

        list.splice(which8OfList * 8, 0, list.splice(ind, 1)[0]);

        sort6recursively(list);
      }
    }
  }
  return list;
};

const sort863 = (list) => {
  let unique8List = [];
  const { length } = list;
  for (let i = 0; i < length / 8; i += 1) {
    const uniqueStepList = [];
    for (let j = 0; j < list.length; j += 1) {
      if (uniqueStepList.length >= 8) {
        break;
      }
      const isUnique = !uniqueStepList.some((item) => {
        return item.name === list[j].name;
      });

      if (isUnique) {
        uniqueStepList.push(list[j]);
        list.splice(j, 1);
        j -= 1;
      }
    }
    unique8List = [...unique8List, ...uniqueStepList];
  }
  list = unique8List;

  list = sort6recursively(list);
  return list;
};

fetch('./pets.json').then((res) => res.json()).then((list) => {
  pets = list;

  fullPetsList = (() => {
    let tempArr = [];

    for (let i = 0; i < 6; i += 1) {
      const newPets = pets;

      for (let j = pets.length; j > 0; j -= 1) {
        const randInd = Math.floor(Math.random() * j);
        const randElem = newPets.splice(randInd, 1)[0];
        newPets.push(randElem);
      }

      tempArr = [...tempArr, ...newPets];
    }
    return tempArr;
  })();

  fullPetsList = sort863(fullPetsList);

  for (let i = 0; i < (fullPetsList.length / 6); i += 1) {
    const stepList = fullPetsList.slice(i * 6, (i * 6) + 6);
  }

  for (let i = 0; i < sliderItems.length; i += 1) {
    sliderItemName[i].textContent = fullPetsList[i].name;
    sliderItemPhoto[i].src = fullPetsList[i].img;
    sliderItemImage.src = fullPetsList[i].img;
    sliderItemPetName.textContent = fullPetsList[i].name;
    sliderItemBreed.textContent = fullPetsList[i].type;
    sliderItemPetDescribing.textContent = fullPetsList[i].description;
    sliderItemPetAge.textContent = fullPetsList[i].age;
    sliderItemPetInoculations.textContent = fullPetsList[i].inoculations;
    sliderItemPetDiseases.textContent = fullPetsList[i].diseases;
    sliderItemPetParasites.textContent = fullPetsList[i].parasites;
  }
});

request.send();

const currentPage = document.querySelector('#current-page');
const nextPage = document.querySelector('#next-page');
const prevPage = document.querySelector('#prev-page');
const firstPage = document.querySelector('#first-page');
const lastPage = document.querySelector('#last-page');

let blockOfEight = 0;
let blockOfSix = 0;
let blockOfThree = 0;

function removeLeftDisable() {
  if (currentPage.textContent !== '1') {
    firstPage.removeAttribute('disabled');
    prevPage.removeAttribute('disabled');
  }
}

function setLeftDisable() {
  if (currentPage.textContent === '1') {
    firstPage.setAttribute('disabled', true);
    prevPage.setAttribute('disabled', true);
  }
}

function setRightDisable() {
  if (window.innerWidth >= 1280 && currentPage.textContent === '6') {
    lastPage.setAttribute('disabled', true);
    nextPage.setAttribute('disabled', true);
  }

  if (window.innerWidth >= 768 && window.innerWidth < 1280 && currentPage.textContent === '8') {
    lastPage.setAttribute('disabled', true);
    nextPage.setAttribute('disabled', true);
  }

  if (window.innerWidth < 768 && currentPage.textContent === '16') {
    lastPage.setAttribute('disabled', true);
    nextPage.setAttribute('disabled', true);
  }
}

function removeRightDisable() {
  if (window.innerWidth >= 1280 && currentPage.textContent !== '6') {
    lastPage.removeAttribute('disabled');
    nextPage.removeAttribute('disabled');
  }

  if (window.innerWidth >= 768 && window.innerWidth < 1280 && currentPage.textContent !== '8') {
    lastPage.removeAttribute('disabled');
    nextPage.removeAttribute('disabled');
  }

  if (window.innerWidth < 768 && currentPage.textContent !== '16') {
    lastPage.removeAttribute('disabled');
    nextPage.removeAttribute('disabled');
  }
}

window.addEventListener('resize', () => {
  if (window.innerWidth > 767) {
    currentPage.textContent = '1';
    blockOfEight = 0;
    blockOfSix = 0;
    blockOfThree = 0;
    setLeftDisable();
    removeRightDisable();
  }
});

nextPage.addEventListener('click', () => {
  setTimeout(() => {
    if (window.innerWidth >= 1280 && Number(currentPage.textContent < 6)) {
      Number(currentPage.textContent++);
      blockOfEight += 8;
      for (let i = 0; i < sliderItems.length; i += 1) {
        sliderItemName[i].textContent = fullPetsList[i + blockOfEight].name;
        sliderItemPhoto[i].src = fullPetsList[i + blockOfEight].img;
      }
    }

    if (window.innerWidth >= 768 && window.innerWidth < 1280 && Number(currentPage.textContent < 8)) {
      Number(currentPage.textContent++);
      blockOfSix += 6;
      for (let i = 0; i < sliderItems.length - 2; i += 1) {
        sliderItemName[i].textContent = fullPetsList[i + blockOfSix].name;
        sliderItemPhoto[i].src = fullPetsList[i + blockOfSix].img;
      }
    }

    if (window.innerWidth < 768 && Number(currentPage.textContent < 16)) {
      Number(currentPage.textContent++);
      blockOfThree += 3;
      for (let i = 0; i < sliderItems.length - 5; i += 1) {
        sliderItemName[i].textContent = fullPetsList[i + blockOfThree].name;
        sliderItemPhoto[i].src = fullPetsList[i + blockOfThree].img;
      }
    }
  }, 250);
  setTimeout(() => {
    removeLeftDisable();
    setRightDisable();
  }, 250);

  petsBlock.classList.add('fade');
  headerNav.classList.add('cover');
  setTimeout(() => {
    petsBlock.classList.remove('fade');
    headerNav.classList.remove('cover');
  }, 500);
});

prevPage.addEventListener('click', () => {
  setTimeout(() => {
    if (Number(currentPage.textContent > 1)) {
      String(Number(currentPage.textContent -= 1));
      if (window.innerWidth >= 1280) {
        blockOfEight -= 8;
        for (let i = 0; i < sliderItems.length; i += 1) {
          sliderItemName[i].textContent = fullPetsList[i + blockOfEight].name;
          sliderItemPhoto[i].src = fullPetsList[i + blockOfEight].img;
        }
      }

      if (window.innerWidth >= 768 && window.innerWidth < 1280) {
        blockOfSix -= 6;
        for (let i = 0; i < sliderItems.length - 2; i += 1) {
          sliderItemName[i].textContent = fullPetsList[i + blockOfSix].name;
          sliderItemPhoto[i].src = fullPetsList[i + blockOfSix].img;
        }
      }

      if (window.innerWidth < 768) {
        blockOfThree -= 3;
        for (let i = 0; i < sliderItems.length - 5; i += 1) {
          sliderItemName[i].textContent = fullPetsList[i + blockOfThree].name;
          sliderItemPhoto[i].src = fullPetsList[i + blockOfThree].img;
        }
      }
    }

  }, 250);
  setTimeout(() => {
    removeRightDisable();
    setLeftDisable();
  }, 250);

  petsBlock.classList.add('fade');
  headerNav.classList.add('cover');
  setTimeout(() => {
    petsBlock.classList.remove('fade');
    headerNav.classList.remove('cover');
  }, 500);
});

firstPage.addEventListener('click', () => {
  setTimeout(() => {
    currentPage.textContent = '1';
    if (window.innerWidth >= 1280) {
      for (let i = 0; i < sliderItems.length; i += 1) {
        sliderItemName[i].textContent = fullPetsList[i].name;
        sliderItemPhoto[i].src = fullPetsList[i].img;
      }
    }

    if (window.innerWidth >= 768 && window.innerWidth < 1280) {
      for (let i = 0; i < sliderItems.length - 2; i += 1) {
        sliderItemName[i].textContent = fullPetsList[i].name;
        sliderItemPhoto[i].src = fullPetsList[i].img;
      }
    }

    if (window.innerWidth < 768) {
      for (let i = 0; i < sliderItems.length - 5; i += 1) {
        sliderItemName[i].textContent = fullPetsList[i].name;
        sliderItemPhoto[i].src = fullPetsList[i].img;
      }
    }

    blockOfEight = 0;
    blockOfSix = 0;
    blockOfThree = 0;

    removeRightDisable();
    setLeftDisable();
  }, 250);

  setTimeout(() => {
    removeRightDisable();
    setLeftDisable();
  }, 250);

  petsBlock.classList.add('fade');
  headerNav.classList.add('cover');
  setTimeout(() => {
    petsBlock.classList.remove('fade');
    headerNav.classList.remove('cover');
  }, 500);
});

lastPage.addEventListener('click', () => {
  setTimeout(() => {
    if (window.innerWidth >= 1280) {
      currentPage.textContent = '6';
      blockOfEight = 40;
      for (let i = 0; i < sliderItems.length; i += 1) {
        sliderItemName[i].textContent = fullPetsList[i + blockOfEight].name;
        sliderItemPhoto[i].src = fullPetsList[i + blockOfEight].img;
      }
    }

    if (window.innerWidth >= 768 && window.innerWidth < 1280) {
      currentPage.textContent = '8';
      blockOfSix = 42;
      for (let i = 0; i < sliderItems.length - 2; i += 1) {
        sliderItemName[i].textContent = fullPetsList[i + blockOfSix].name;
        sliderItemPhoto[i].src = fullPetsList[i + blockOfSix].img;
      }
    }

    if (window.innerWidth < 768) {
      currentPage.textContent = '16';
      blockOfThree = 45;
      for (let i = 0; i < sliderItems.length - 5; i += 1) {
        sliderItemName[i].textContent = fullPetsList[i + blockOfThree].name;
        sliderItemPhoto[i].src = fullPetsList[i + blockOfThree].img;
      }
    }
  }, 250);
  setTimeout(() => {
    removeLeftDisable();
    setRightDisable();
  }, 250);

  petsBlock.classList.add('fade');
  headerNav.classList.add('cover');
  setTimeout(() => {
    petsBlock.classList.remove('fade');
    headerNav.classList.remove('cover');
  }, 500);
});

for (let i = 0; i < sliderItems.length; i += 1) {
  sliderItems[i].addEventListener('click', () => {
    if (!modal.classList.contains('active')) {
      modal.classList.add('active');
      shadow.classList.add('visible');
      body.classList.add('no-scroll');

      if (window.innerWidth >= 1280) {
        sliderItemImage.src = fullPetsList[i + blockOfEight].img;
        sliderItemPetName.textContent = fullPetsList[i + blockOfEight].name;
        sliderItemBreed.textContent = fullPetsList[i + blockOfEight].type;
        sliderItemPetDescribing.textContent = fullPetsList[i + blockOfEight].description;
        sliderItemPetAge.textContent = fullPetsList[i + blockOfEight].age;
        sliderItemPetInoculations.textContent = fullPetsList[i + blockOfEight].inoculations;
        sliderItemPetDiseases.textContent = fullPetsList[i + blockOfEight].diseases;
        sliderItemPetParasites.textContent = fullPetsList[i + blockOfEight].parasites;
      }

      if (window.innerWidth >= 768 && window.innerWidth < 1280) {
        sliderItemImage.src = fullPetsList[i + blockOfSix].img;
        sliderItemPetName.textContent = fullPetsList[i + blockOfSix].name;
        sliderItemBreed.textContent = fullPetsList[i + blockOfSix].type;
        sliderItemPetDescribing.textContent = fullPetsList[i + blockOfSix].description;
        sliderItemPetAge.textContent = fullPetsList[i + blockOfSix].age;
        sliderItemPetInoculations.textContent = fullPetsList[i + blockOfSix].inoculations;
        sliderItemPetDiseases.textContent = fullPetsList[i + blockOfSix].diseases;
        sliderItemPetParasites.textContent = fullPetsList[i + blockOfSix].parasites;
      }

      if (window.innerWidth < 768) {
        sliderItemImage.src = fullPetsList[i + blockOfThree].img;
        sliderItemPetName.textContent = fullPetsList[i + blockOfThree].name;
        sliderItemBreed.textContent = fullPetsList[i + blockOfThree].type;
        sliderItemPetDescribing.textContent = fullPetsList[i + blockOfThree].description;
        sliderItemPetAge.textContent = fullPetsList[i + blockOfThree].age;
        sliderItemPetInoculations.textContent = fullPetsList[i + blockOfThree].inoculations;
        sliderItemPetDiseases.textContent = fullPetsList[i + blockOfThree].diseases;
        sliderItemPetParasites.textContent = fullPetsList[i + blockOfThree].parasites;
      }
    }
  });
}
