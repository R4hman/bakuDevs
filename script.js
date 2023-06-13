"use strict";
const courseLesson = document.querySelectorAll(".course-lessons");
const courseLessonInput = document.querySelectorAll(".course-lessons input");
const categories = document.querySelectorAll(".category ul li a");
const courses = document.querySelector(".courses");

// import * as wish from "./wishlist";
// console.log(wish.createWishlist);

let wishlist;
wishlist = localStorage.getItem("wishlist");
if (!wishlist) {
  wishlist = [];
  localStorage.setItem("wishlist", wishlist);
}

console.log(wishlist);

categories.forEach((category) => {
  category.addEventListener("click", async (e) => {
    e.preventDefault();
    categories.forEach((cat) => {
      cat.classList.remove("active");
    });
    category.classList.add("active");
    await getDataFromDB(category.dataset.id);
  });
});

async function getDataFromDB(cat) {
  let data;
  const res = await fetch("./data.json");
  data = await res.json();
  if (cat !== "cat-all") {
    data = data.filter((d) => d.type === cat.split("-")[1]);
  }

  data = data.map((item) => {
    return `
     <div class="course" data-id=${item.id}>
    <div class="course-img-container">
      <img class="course-img" src=${item.img} alt="javascript-img" />
    </div>
    <div class="course-info">
      <h4 class="course-title">${item.type}</h4>
      <div class="course-hours">
        <ion-icon
          class="play-icon"
          name="play-skip-back-circle-outline"
        ></ion-icon>
        <span class="course-hours">18 dərs</span>
      </div>
    </div>
    <div class="divider">
      <hr />
    </div>
    <div class="main-info">
      <h1 class="subtitle">Lorem ipsum dolor sit amet.</h1>
      <a href="">
        <ion-icon
          class="play-icon-secondary"
          name="play-skip-back-circle-outline"
        ></ion-icon>
      </a>
    </div>
  </div>
    `;
  });

  if (courses === null) {
    return;
  }
  courses.innerHTML = "";
  courses.insertAdjacentHTML("beforeend", data.join(" "));

  document.querySelectorAll(".course").forEach((crs) => {
    crs.onclick = (e) => {
      e.preventDefault();

      if (!wishlist.includes(crs.dataset.id)) {
        wishlist.push(crs.dataset.id);
      }

      localStorage.setItem("wishlist", wishlist);
    };
  });
}

function grabDataId(el) {
  Array.from(courseLesson).map((element, i) => {
    if (i + 1 === +el) {
      element.style.backgroundColor = "#E3F1F2";
    } else {
      element.style.backgroundColor = "transparent";
    }
  });
}

courseLesson.forEach((lesson) =>
  lesson.addEventListener("click", (e) => {
    if (e.target.checked) {
      grabDataId(e.currentTarget.dataset.id);
    } else {
      e.currentTarget.style.backgroundColor = "transparent";
    }
  })
);

const menu = document.querySelector(".menu-icon");
const menuClose = document.querySelector(".menu-close-icon");
const menuContent = document.querySelector(".menu-content");
const close = document.querySelector(".close-x");

menu.addEventListener("click", () => {
  menuContent.style.display = "block";
  menu.style.display = "none";

  document.body.style.overflow = "hidden";
  console.log(document.body);
});

close.addEventListener("click", () => {
  menuContent.style.display = "none";
  menu.style.display = "block";

  document.body.style.height = "auto";
  document.body.style.overflow = "auto";
});

const menuItems = document.querySelectorAll(".nav-content-left ul li ");

const navContent = document.querySelectorAll(".nav-content-right ul");

menuItems.forEach((item) => {
  item.addEventListener("click", (e) => {
    e.preventDefault();
    menuItems.forEach((i) => {
      i.classList.remove("active");
    });
    item.classList.add("active");

    switch (item.dataset.id) {
      case "frontend":
        navContent.forEach((nav) => {
          nav.classList.remove("active");
        });
        navContent.forEach((nav) => {
          nav.dataset.id === "frontend-content" && nav.classList.add("active");
        });
        break;

      case "backend":
        navContent.forEach((nav) => {
          nav.classList.remove("active");
        });
        navContent.forEach((nav) => {
          nav.dataset.id === "backend-content" && nav.classList.add("active");
        });
        break;

      case "ui/ux":
        navContent.forEach((nav) => {
          nav.classList.remove("active");
        });
        navContent.forEach((nav) => {
          nav.dataset.id === "ui/ux-content" && nav.classList.add("active");
        });
        break;
    }
  });
});

// create wishlist

// function createWishlist(list) {
//   const content = list.map((lst) => {
//     return `
//      <div class="course" data-id=${lst.id}>
//     <div class="course-img-container">
//       <img class="course-img" src=${lst.img} alt="javascript-img" />
//     </div>
//     <div class="course-info">
//       <h4 class="course-title">${lst.type}</h4>
//       <div class="course-hours">
//         <ion-icon
//           class="play-icon"
//           name="play-skip-back-circle-outline"
//         ></ion-icon>
//         <span class="course-hours">18 dərs</span>
//       </div>
//     </div>
//     <div class="divider">
//       <hr />
//     </div>
//     <div class="main-info">
//       <h1 class="subtitle">Lorem ipsum dolor sit amet.</h1>
//       <a href="">
//         <ion-icon
//           class="play-icon-secondary"
//           name="play-skip-back-circle-outline"
//         ></ion-icon>
//       </a>
//     </div>
//   </div>
//     `;
//   });
//   console.log(wishContent);
//   wishContent.innerHTML = "";
//   wishContent.insertAdjacentHTML("beforeend", content.join(" "));
// }

async function Init() {
  await getDataFromDB("cat-all");
}

Init();
