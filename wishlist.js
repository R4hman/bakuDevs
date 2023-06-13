const wishContent = document.querySelector(".istekContent");

// async function createWishlist(list) {
//   console.log(list);

//   const l = await fetch("./data.json");
//   const res = await l.json();
//   const data = res.map((r, i) => {
//     if (r.id === list) {
//       return `
//       <div class="course" data-id=${r.id}>
//       <div class="course-img-container">
//         <img class="course-img" src=${r.img} alt="javascript-img" />
//       </div>
//       <div class="course-info">
//         <h4 class="course-title">${r.type}</h4>
//         <div class="course-hours">
//           <ion-icon
//             class="play-icon"
//             name="play-skip-back-circle-outline"
//           ></ion-icon>
//           <span class="course-hours">18 dərs</span>
//         </div>
//       </div>
//       <div class="divider">
//         <hr />
//       </div>
//       <div class="main-info">
//         <h1 class="subtitle">Lorem ipsum dolor sit amet.</h1>
//         <a href="">
//           <ion-icon
//             class="play-icon-secondary"
//             name="play-skip-back-circle-outline"
//           ></ion-icon>
//         </a>
//       </div>
//     </div>
//           `;
//     } else {
//       return null;
//     }
//   });

//   wishContent.innerHTML = "";
//   wishContent.insertAdjacentHTML("beforeend", data);
// }

// export { createWishlist };
