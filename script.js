let loadImgButton = document.getElementsByClassName("btn btn-primary my-2")[0];
let loadSecondBtn = document.getElementsByClassName(
  "btn btn-secondary my-2"
)[0];
let photoContainer = document.querySelector(".img-row");

window.onload = () => {
  let rowGrid = document.getElementById("myCards");
  for (let i = 0; i < 12; i++) {
    rowGrid.innerHTML += `<div class="col">
    <div class="card mb-4 shadow-sm">
          <svg
            class="bd-placeholder-img card-img-top"
            width="100%"
            height="225"
            xmlns="http://www.w3.org/2000/svg"
            preserveAspectRatio="xMidYMid slice"
            focusable="false"
            role="img"
            aria-label="Placeholder: Thumbnail"
          >
            <title>Placeholder</title>
            <rect width="100%" height="100%" fill="#55595c" />
            <text x="50%" y="50%" fill="#eceeef" dy=".3em">
              Thumbnail
            </text>
          </svg>
          <div class="card-body">
            <p class="card-text">
              This is a wider card with supporting text below as a natural
              lead-in to additional content. This content is a little bit
              longer.
            </p>
            <div
              class="d-flex justify-content-between align-items-center"
            >
              <div class="btn-group">
                <button
                  type="button"
                  class="btn btn-sm btn-outline-secondary"
                >
                  View
                </button>
                <button
                  type="button"
                  class="btn btn-sm btn-outline-secondary"
                >
                  Edit
                </button>
              </div>
              <small class="text-muted">9 mins</small>
            </div>
          </div>
        </div>
      </div>`;
  }

  hideCard();
};

function hideCard() {
  let editBtn = document.querySelectorAll(
    ".btn-group .btn.btn-sm.btn-outline-secondary:last-child"
  );
  for (let i = 0; i < editBtn.length; i++) {
    editBtn[i].textContent = "Hide";
  }
  for (let i = 0; i < editBtn.length; i++) {
    editBtn[i].addEventListener("click", function () {
      this.parentElement.parentElement.parentElement.parentElement.remove();
    });
  }
}

// const options = {
//   method: "GET",
//   headers: {
//     Authorization:
//       "Bearer 563492ad6f9170000100000162301b50024d45149b90f2458fc942ea",
//   },
// };

// function getPicture() {
//   fetch("https://api.pexels.com/v1/search?query=Nature", options)
//     .then((photos) => photos.json())
//     .then((photoData) => {
//       //   console.log("photo1", photoData.photos);
//       const fetchPhotos = photoData.photos;
//       renderImage(fetchPhotos);
//     })
//     .catch((err) => console.error(err));
// }
// const getSecondaryPics = () => {
//   fetch("https://api.pexels.com/v1/search?query=Ocean", options)
//     .then((photos) => photos.json())
//     .then((photoData) => {
//       // console.log("photo1", photoData.photos);
//       const fetchPhotos = photoData.photos;
//       renderImage(fetchPhotos);
//     })
//     .catch((err) => console.error(err));
// };
// const renderImage = (fetchPhotos) => {
//   let cards = document.querySelectorAll(".card");
//   console.log("renderImage", cards);
//   let hasImage = document.querySelector(".card").querySelector("img");
//   console.log("hasImage", hasImage);
//   let svgs = document.querySelectorAll(".card svg");
//   console.log("svg", svgs);

//   for (let i = 0; i < cards.length; i++) {
//     if (typeof svgs !== "undefine" && svgs !== null) {
//       let imgNode = document.createElement("img");
//       imgNode.src = `${fetchPhotos[i].src.portrait}`;
//       let card = cards[i];
//       card.replaceChild(imgNode, svgs[i]);
//     } else {
//       let imgNode = document.getElementsByTagName("img");
//       imgNode.src = `${fetchPhotos[i].src.portrait}`;
//     }
//   }
//   //   for (let i = 0; i < fetchPhotos.length; i++) {
//   //     const pics = fetchPhotos[i];
//   //     console.log("pics", pics);
//   //     let colCreate = document.createElement("div");
//   //     colCreate.className = "d-flex col-12 col-sm-6 col-md-4 col-lg-3 mb-4";
//   //     colCreate.innerHTML = `

//   //                 <div class="card w-100">
//   //                     <img src=${pics.src.portrait} class="card-img-top" alt=${pics.alt}>
//   //                     <div class="card-body">
//   //                         <h5 class="card-title">${pics.alt}</h5>
//   //                     </div>
//   //             </div>
//   //             `;
//   //     photoContainer.appendChild(colCreate);
//   //   }
// };
// loadImgButton.addEventListener("click", () => {
//   getPicture();
// });
// // loadSecondBtn.addEventListener("click", () => {
// //   getSecondaryPics();
// // });
