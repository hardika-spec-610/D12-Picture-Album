let arrOfUrlStr = [];

window.onload = () => {
  let grid = document.getElementById("myGrid");
  for (let i = 0; i < 12; i++) {
    // generates 12 cards
    grid.innerHTML += `<div class="col">
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

  //EX3 Replace Edit with Hide btn
  grid
    .querySelectorAll(".btn.btn-outline-secondary:nth-child(2)") // finds the second button of type outline-secondary
    .forEach((btn) => {
      btn.innerText = "Hide"; //changes the inner text
      btn.onclick = (event) =>
        // event.currentTarget.parentNode.parentNode.parentNode.parentNode.parentNode.remove(); // navigating upward in the dom tree to find the .col element and remove it
        event.currentTarget.closest(".col").remove(); // modern approach: is going to find the closest element matching the condition
    });
};

let loadImages = (query) => {
  fetch("https://api.pexels.com/v1/search?query=" + query, {
    method: "GET",
    headers: {
      Authorization: "Bearer [YOUR TOKEN HERE]",
    },
  })
    .then((response) => {
      return response.json();
    })
    .then((body) => {
      let cards = document.getElementsByClassName("card");

      for (let i = 0; i < cards.length; i++) {
        cards[i].firstElementChild.remove(); //removes svg
        let img = document.createElement("img");
        img.src = body.photos[i].src.large;
        img.className = "bd-placeholder-img card-img-top";
        img.style = "height: 200px; object-fit: cover";

        cards[i].insertBefore(img, cards[i].firstChild); //adds the new image before other content

        // EX5 replaces 9 min with img id
        cards[i].querySelector("small").innerText = "ID: " + body.photos[i].id;
      }
    });
};

let loadOtherImages = (query) => {
  let hasImage = document.querySelector(".card").querySelector("img");

  //we check for the existance of imgs instead of svgs because this function uses a different approach
  if (hasImage) {
    fetch("https://api.pexels.com/v1/search?query=" + query, {
      method: "GET",
      headers: {
        Authorization: "Bearer [YOUR TOKEN HERE]",
      },
    })
      .then((response) => {
        return response.json();
      })
      .then((body) => {
        let cards = document.getElementsByClassName("card");
        for (let i = 0; i < cards.length; i++) {
          cards[i].firstElementChild.src = body.photos[i].src.large; //switching the pre-existing image with a new image source
          cards[i].querySelector("small").innerText =
            "ID: " + body.photos[i].id;
        }
      });
  } else {
    // if cards still have svg we need the first method to handle the change
    loadImages("sea"); // the parameter "sea" changes the default value of query
  }
};

//Handles jumbotron search EX6

let searchQuery;

const handleSearchQuery = (e) => {
  searchQuery = e.target.value.toLowerCase();
};

const searchImages = () => {
  let hasImage = document.querySelector(".card").querySelector("img");

  if (hasImage) {
    loadOtherImages(searchQuery);
  } else {
    loadImages(searchQuery);
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

  //EVEN MORE EXTRAS (outcome in the console)
  fetch("https://api.pexels.com/v1/search?query=" + "forest", {
    method: "GET",
    headers: {
      Authorization: "Bearer [YOUR TOKEN HERE]",
    },
  })
    .then((response) => {
      return response.json();
    })
    .then((body) => {
      //EX11  (arrOfUrlStr is at the top of the file)
      body.photos.map((image) => {
        arrOfUrlStr.push(image.src.medium);
      });

      console.log("ARRAY OF URLS", arrOfUrlStr);

      //EX12

      let filteredArtists = body.photos.filter(
        (pic) =>
          pic.photographer.includes("Brandon") ||
          pic.photographer.includes("Felix")
      );
      console.log("FILTERED ARTISTS", filteredArtists);

      //EX13
      let reducedIds = body.photos.reduce(
        (acc, curr) => acc + parseInt(curr.id),
        0
      );
      console.log("SUMMED IDs WITH REDUCE", reducedIds);
    });
});
