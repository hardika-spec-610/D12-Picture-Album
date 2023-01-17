const endPoints1 = ["Nature", "Ocean"];
const endPoints2 = ["Tigers", "Pears"];
let loadImgButton = document.getElementsByClassName("btn btn-primary my-2")[0];
let loadSecondBtn = document.getElementsByClassName(
  "btn btn-secondary my-2"
)[0];
let photoContainer = document.querySelector(".img-row");
const options = {
  method: "GET",
  headers: {
    Authorization:
      "Bearer 563492ad6f9170000100000162301b50024d45149b90f2458fc942ea",
  },
};

function getPicture() {
  for (const endPoint of endPoints1) {
    fetch(`https://api.pexels.com/v1/search?query=${endPoint}`, options)
      .then((photos) => photos.json())
      .then((photoData) => {
        console.log("photo1", photoData.photos);
        const fetchPhotos = photoData.photos;
        renderImage(fetchPhotos);
      })
      .catch((err) => console.error(err));
  }
}
const getSecondaryPics = () => {
  for (const endPoint of endPoints2) {
    fetch(`https://api.pexels.com/v1/search?query=${endPoint}`, options)
      .then((photos) => photos.json())
      .then((photoData) => {
        // console.log("photo1", photoData.photos);
        renderImage(photoData.photos);
      })
      .catch((err) => console.error(err));
  }
};
const renderImage = (fetchPhotos) => {
  for (let i = 0; i < fetchPhotos.length; i++) {
    const pics = fetchPhotos[i];
    console.log("pics", pics);
    let colCreate = document.createElement("div");
    colCreate.className = "d-flex col-12 col-sm-6 col-md-4 col-lg-3 mb-4";
    colCreate.innerHTML = `

                <div class="card w-100">
                    <img src=${pics.src.portrait} class="card-img-top" alt=${pics.alt}>
                    <div class="card-body">
                        <h5 class="card-title">${pics.alt}</h5>
                    </div>
            </div>
            `;
    photoContainer.appendChild(colCreate);
  }
};
loadImgButton.addEventListener("click", () => {
  getPicture();
});
loadSecondBtn.addEventListener("click", () => {
  getSecondaryPics();
});
// window.onload = () => {
//   getPicture();
//     getSecondaryPics();
// };
// getPicture();
