const changePageButton = document.querySelectorAll(".changePageButton");
const profileContent = document.querySelector(".profileContent");
const abunelikContent = document.querySelector(".abunelikContent");
const qebzlerContent = document.querySelector(".qebzlerContent");
const istekContent = document.querySelector(".istekContent");
const rightMenu = document.querySelectorAll(".rightMenu");
const refreshSubscribe = document.querySelector(".refresh");
const modalOverlay = document.querySelector(".modal-overlay");
const closeModal = document.querySelector(".close-modal");
const modalContent = document.querySelector(".modal-content");
const modalInner = document.querySelectorAll(".modal-inner");
const subscribeTypes = document.querySelectorAll(".subscribe-type");
const refreshBtn = document.querySelector(".subscribe-btn");
const paymentTable = document.querySelector(".payment-table");
const tableLists = document.querySelectorAll(".table-list");

let tableArrays = [];

changePageButton.forEach((activeButton) => {
  activeButton.addEventListener("click", (e) => {
    e.preventDefault();
    changePageButton.forEach((button) => button.classList.remove("active"));
    activeButton.classList.add("active");
    rightMenu.forEach((menu) => (menu.style.display = "none"));

    switch (activeButton.dataset.id) {
      case "profile":
        profileContent.style.display = "block";
        // document.location.href = "http://localhost:5500/account.html/profile";
        break;

      case "subscribe":
        abunelikContent.style.display = "block";
        modalInner[0].classList.remove("rightMenu");
        break;

      case "payment":
        qebzlerContent.style.display = "block";
        break;

      case "wishlist":
        istekContent.style.display = "block";
        break;
    }
  });
});

refreshSubscribe.onclick = function (e) {
  e.preventDefault();
  e.stopPropagation();
  modalOverlay.style.display = "flex";
  if (modalContent.children[0].classList.contains("rightMenu")) {
    modalContent.children[0].classList.remove("rightMenu");
    changePageButton.forEach((item) => {
      item.classList.remove("active");
      if (item.dataset.id === "subscribe") {
        item.classList.add("active");
      }
    });
  }

  modalInner.forEach((modal) => {
    if (modal.dataset.id === "payment-content") {
      modal.style.display = "none";
    }
    if (modal.dataset.id === "subscribe-content") {
      modal.style.display = "block";
    }
  });
};

closeModal.onclick = function (e) {
  e.preventDefault();
  e.stopPropagation();
  modalOverlay.style.display = "none";

  modalContent.innerHTML = `
    <div class="modal-inner rightMenu " data-id="subscribe-content">
    <h3>
      Sizin abunəliyiniz 15.03.2022 tarixində bitir. Abunəliyinizi
      uzatmaq istədiyiniz tarixi seçin
    </h3>
    <div class="subscription">
      <div class="subscribe-type">
        <input
          type="radio"
          name="fee"
          value="10"
          id="subscribe-ten"
        />
        <label class="subscribe-label" for="subscribe-ten">
          1 ay
        </label>
      </div>
      <h3>Məbləğ 10 AZN</h3>
    </div>
    <hr class="line" />
    <div class="subscription">
      <div class="subscribe-type">
        <input
          type="radio"
          name="fee"
          value="20"
          id="subscribe-twenty"
        />
        <label class="subscribe-label" for="subscribe-twenty">
          2 ay
        </label>
      </div>
      <h3>Məbləğ 20 AZN</h3>
    </div>
    <hr class="line" />
    <div class="subscription">
      <div class="subscribe-type">
        <input
          type="radio"
          name="fee"
          value="30"
          id="subscribe-thirty"
        />
        <label class="subscribe-label" for="subscribe-thirty">
          3 ay
        </label>
      </div>
      <h3>Məbləğ 30 AZN</h3>
    </div>

    <div class="query-btn" >
    <a class="reset-link refresh2" href="javascript:void(0)"
      >Yenilə 2
         
      <ion-icon name="chevron-forward-outline"></ion-icon>
    </a>
  </div>
  </div>
  <div class="modal-inner rightMenu" data-id="payment-content"></div>
          `;
};

window.onclick = function (e) {
  if (e.target === modalOverlay) {
    modalOverlay.style.display = "none";
  }
};

subscribeTypes.forEach((subscribe) => {
  subscribe.onclick = function (e) {
    subscribeTypes.forEach((el) => {
      el.classList.remove("fee-active");
    });
    e.currentTarget.classList.add("fee-active");
  };
});

refreshBtn.onclick = (e) => {
  e.preventDefault();
  e.stopPropagation();

  if (!subscribeTypes) {
    return;
  }
  subscribeTypes.forEach((subscribe) => {
    if (subscribe.classList.contains("fee-active")) {
      createTableObj(subscribe.children[0].value);
      changePageButton.forEach((btn) => {
        btn.classList.remove("active");
        if (btn.dataset.id === "payment") {
          btn.classList.add("active");
        }
      });
      abunelikContent.style.display = "none";

      modalOverlay.style.display = "none";
      qebzlerContent.style.display = "block";
    }
  });
};

function createTableObj(val) {
  let Obj;

  let time = new Date();
  time = time.toLocaleDateString("en-GB");
  if (tableArrays.length === 0) {
    Obj = { val, time, id: 1 };
  } else {
    Obj = {
      val,
      time,
      id: tableArrays[tableArrays.length - 1].id + 1,
    };
  }

  tableArrays.push(Obj);
  createTable(Obj);
}

function createTable(obj) {
  const innerId = (obj.id + "").padStart(8, "0");

  let tableContent = `
    <tr class="table-list" data-id="${obj.id}">
                <td><ion-icon class="table-icon" name="document-text-outline"></ion-icon>${innerId}</td>
                <td>${obj.time}</td>
                <td>${obj.val}</td>
              </tr>
    `;
  paymentTable.insertAdjacentHTML("afterbegin", tableContent);
}

window.onclick = (e) => {
  if (e.target.parentNode.classList.contains("table-list")) {
    let currentPayment = tableArrays.filter(
      (table) => table.id === +e.target.parentNode.dataset.id
    );

    modalInner.forEach((inner) => {
      if (inner.dataset.id === "payment-content") {
        modalOverlay.style.display = "flex";

        modalContent.innerHTML = `
        <div class="payment-content-top">
                <div>
                  <h1>Qəbz ID:</h1>
                  <p>${currentPayment[0].id}</p>
                </div>
                <div>
                  <h1>Abunə tarixi:</h1>
                  <p>${currentPayment[0].time}</p>
                </div>
                <div>
                  <h1>Məbləğ:</h1>
                  <p>${currentPayment[0].val} AZN</p>
                </div>
              </div>
              <div class="payment-content-bottom">
                <img src="img/paymentConfirmation.png" alt="" />
              </div>
        `;
      }
    });
  }
};

// Wishlist

const wishlist = localStorage.getItem("wishlist");

async function createWishlist() {
  const l = await fetch("./data.json");
  const res = await l.json();
  if (wishlist.length > 0) {
    const d = res.filter((rs) => wishlist.includes(rs.id));

    const data = d.map((r, i) => {
      return `
      <div class="course" data-id=${r.id}>
      
      <div class="course-img-container">
        <img class="course-img" src=${r.img} alt="javascript-img" />
      </div>
      <div class="course-info">
      <h4 class="course-title">${r.type}</h4>
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
      <div class="hoverable">
      <a href="singleIOS.html">
      <ion-icon name="radio-button-on-outline"></ion-icon>
      
      </a>
      <button class="cart-remove">
      <ion-icon name="trash-outline"></ion-icon>
      
      </button>
      
      
      </div>
      </div>
      `;
    });

    istekContent.innerHTML = "";
    const istekContainer = document.createElement("div");
    istekContainer.setAttribute("class", "istek-container");
    istekContent.append(istekContainer);

    istekContainer.insertAdjacentHTML("beforeend", data.join(" "));
  }
}

// REMOVE FROM CART

function removeFromCart() {
  new Promise((resolve, reject) => {
    setTimeout((resolve) => {
      const removeCartBtns = document.querySelectorAll(".cart-remove");
      console.log(removeCartBtns);
      removeCartBtns.forEach((item) => {
        item.addEventListener("click", (e) => {
          e.preventDefault();
          console.log("clicked");

          item.closest(".course").remove();

          const wishlist = localStorage.getItem("wishlist");

          let arr = [];
          if (wishlist) {
            arr = JSON.parse(wishlist);
          }

          const updatedData = arr.filter(
            (el) => el !== item.closest(".course").dataset.id
          );
          console.log(updatedData);

          localStorage.setItem("wishlist", JSON.stringify(updatedData));
        });
      });
    }, 1000);
  });
}

removeFromCart();

createWishlist();
//
