let photoContainer = document.querySelector(".img-row");

window.onload = () => {
  let rowGrid = document.getElementById("myCards");
  for (let i = 0; i < 12; i++) {
    rowGrid.innerHTML += `<div class="d-flex col">
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
          <h5 class="card-title">Card title</h5>
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

let loadImage = document.getElementsByClassName("btn btn-primary my-2")[0];
let loadSecondaryImg = document.getElementsByClassName(
  "btn btn-secondary my-2"
)[0];

const options = {
  method: "GET",
  headers: {
    Authorization:
      "Bearer 563492ad6f9170000100000162301b50024d45149b90f2458fc942ea",
  },
};

function getloadImage(query) {
  fetch("https://api.pexels.com/v1/search?query=" + query, options)
    .then((photos) => photos.json())
    .then((photoData) => {
      //   console.log("photo1", photoData.photos);
      const fetchPhotos = photoData.photos;
      let cards = document.getElementsByClassName("card");

      for (let i = 0; i < cards.length; i++) {
        cards[i].firstElementChild.remove(); //removes svg
        let img = document.createElement("img");
        img.src = fetchPhotos[i].src.portrait;
        img.className = "bd-placeholder-img card-img-top";

        cards[i].insertBefore(img, cards[i].firstChild); //adds the new image before other content

        // EX5 replaces 9 min with img id
        cards[i].querySelector("small").innerText = "ID: " + fetchPhotos[i].id;
      }
      let cardTitle = document.getElementsByClassName("card-title");
      for (let i = 0; i < cardTitle.length; i++) {
        cardTitle[i].innerText = fetchPhotos[i].alt;
        // console.log("cardTitle", cardTitle);
      }
    })
    .catch((err) => console.error(err));
}
const getSecondaryImg = (query) => {
  let hasImage = document.querySelector(".card").querySelector("img");
  //   console.log(hasImage);
  if (hasImage) {
    fetch("https://api.pexels.com/v1/search?query=" + query, options)
      .then((photos) => photos.json())
      .then((photoData) => {
        const fetchPhotos = photoData.photos;
        let cards = document.getElementsByClassName("card");
        for (let i = 0; i < cards.length; i++) {
          cards[i].firstElementChild.src = fetchPhotos[i].src.portrait; //switching the pre-existing image with a new image source
          cards[i].querySelector("small").innerText =
            "ID: " + fetchPhotos[i].id;
        }
      })
      .catch((err) => console.error(err));
  } else {
    // if cards still have svg we need the first method to handle the change
    getloadImage(); // the parameter "sea" changes the default value of query
  }
};
loadImage.addEventListener("click", function () {
  getloadImage("Nature");
});
loadSecondaryImg.addEventListener("click", () => {
  getSecondaryImg("Ocean");
});

let searchQuery;

const handleSearchQuery = (event) => {
  //   console.log(event);
  searchQuery = event.target.value.toLowerCase();
};

const searchImages = () => {
  let hasImage = document.querySelector(".card").querySelector("img");

  if (hasImage) {
    getSecondaryImg(searchQuery);
  } else {
    getloadImage(searchQuery);
  }
};

// just another way to handle the DOM after is being loaded
window.addEventListener("DOMContentLoaded", () => {
  //EX10 handles MODAL
  document.querySelectorAll(".card .btn-group .btn:first-of-type").forEach(
    (btn) =>
      (btn.onclick = (e) => {
        let cardImage =
          // e.target.parentNode.parentNode.parentNode.parentNode.getElementsByTagName(
          //   "img"
          // )[0]; // finding the image node navigating the node tree

          // OR:
          // e.target.closest(".card").children[0];
          // OR:
          // e.target.closest(".card").firstElementChild;

          //OR:

          e.target.closest(".card").querySelector("img");

        if (cardImage) {
          e.target.setAttribute("data-toggle", "modal");
          e.target.setAttribute("data-target", "#exampleModal");

          let modal = document.querySelector(".modal");
          let image = document.createElement("img");
          image.src = cardImage.src;

          image.className = "img-fluid w-100";
          modal.querySelector(".modal-body").innerText = "";
          modal.querySelector(".modal-body").appendChild(image);
        } else {
          alert("Load images first");
        }
      })
  );
});
