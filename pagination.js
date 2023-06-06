const main = document.querySelector(".courses");
const containerData = document.querySelector(".container-data");

let list = [];
const numOfElementsForPage = 4;

const fetchData = async () => {
  const data = await fetch("./data.json")
    .then((res) => res.json())
    .catch((err) => console.log(err));
  list.push(data);
  createList(data);
  createPagination(data);
  return data;
};

function createPagination(data) {
  const dataLength = Object.entries(data).length;
  const numOfBtns = Math.ceil(dataLength / numOfElementsForPage);
  const buttonContainer = document.createElement("div");
  buttonContainer.classList.add("pagination-btns");
  Array(numOfBtns)
    .fill(0)
    .map((btn, i) => {
      const button = document.createElement("button");
      button.classList.add("pagination-btn");
      button.innerHTML = i + 1;
      button.addEventListener("click", (e) => {
        showList(e);
      });
      buttonContainer.append(button);
      containerData.insertAdjacentElement("beforeend", buttonContainer);
    });
}

function showList(e) {
  const shownPages = numOfElementsForPage * (+e.currentTarget.innerHTML - 1);
  let [l] = list;
  l = l.slice(shownPages, shownPages + numOfElementsForPage);
  main.innerHTML = "";
  l = l.map((el) => {
    const { name, img, title, id } = el;
    return `<div class="course">
    <div class="course-img-container">
      <img class="course-img" src=${img} alt="javascript-img" />
    </div>
    <div class="course-info">                                                                                                                                                                             
      <h4 class="course-title">Frontend</h4>
      <div class="course-hours">
        <ion-icon
          class="play-icon"
          name="play-skip-back-circle-outline"
        ></ion-icon>
        <span class="course-hours">${id} dərs</span>
      </div>
    </div>
    <div class="divider">
      <hr />
    </div>
    <div class="main-info">
      <h1 class="subtitle">${name}</h1>
      <a href="">
        <ion-icon
          class="play-icon-secondary"
          name="play-skip-back-circle-outline"
        ></ion-icon>
      </a>
    </div>
  </div>`;
  });

  main.insertAdjacentHTML("beforeend", l.join(""));
}

function createList(data) {
  const d = data.slice(0, numOfElementsForPage).map((item) => {
    const { name, img, title, id } = item;

    const d = `<div class="course">
    <div class="course-img-container">
      <img class="course-img" src=${img} alt="javascript-img" />
    </div>
    <div class="course-info">                                                                                                                                                                             
      <h4 class="course-title">Frontend</h4>
      <div class="course-hours">
        <ion-icon
          class="play-icon"
          name="play-skip-back-circle-outline"
        ></ion-icon>
        <span class="course-hours">${id} dərs</span>
      </div>
    </div>
    <div class="divider">
      <hr />
    </div>
    <div class="main-info">
      <h1 class="subtitle">${name}</h1>
      <a href="">
        <ion-icon
          class="play-icon-secondary"
          name="play-skip-back-circle-outline"
        ></ion-icon>
      </a>
    </div>
  </div>`;
    main.insertAdjacentHTML("beforeend", d);
  });
}

window.addEventListener("DOMContentLoaded", fetchData);
