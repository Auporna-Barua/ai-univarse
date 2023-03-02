fetch(`https://openapi.programming-hero.com/api/ai/tools`)
  .then((response) => response.json())
  .then((data) => cardInfos(data));

const cardInfos = (data) => {
  const card = document.getElementById("all-card");
  card.textContent = "";

  if (data.status) {
    for (const info of data.data.tools.slice(0,6)) {
      const div = document.createElement("div");
      div.className = "card";
      div.innerHTML = `
       <img
          src="${info.image}"
          class="card-img-top"
          alt="..."
        />
        <div class="card-body">
          <h5 class="card-title">Features</h5>
          <p class="card-text">
           <ol class="list-group list-group-numbered">
           ${
             info.features &&
             info.features
               .map((feature) => `<li class="cl">${feature}</li>`)
               .join("")
           }
              
            </ol>
          </p>
        </div>
        <div class="card-footer bg-white d-flex justify-content-between">
        <div>
            <h5 class="card-title">${info.name}</h5>
            <div class="d-flex  align-items-center">
            <i class="fa-solid fa-calendar-days"></i>
            <span class="ms-2 cl">${info.published_in} </span class="ml-4">
            </div>
         </div>
         <button class="btn arrow-btn" onclick="cardDetails('${
           info.id
         }')"><i class="fa-solid fa-arrow-right"></i> </button>
         


        </div>
        `;
      card.appendChild(div);
    }
  } else {
  }
};

// card Details Show Here
const cardDetails = (id) => {
  fetch(`https://openapi.programming-hero.com/api/ai/tool/${id}`)
    .then((response) => response.json())
    .then((data) => console.log(data.data));
};
