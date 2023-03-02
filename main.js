fetch(`https://openapi.programming-hero.com/api/ai/tools`)
  .then((response) => response.json())
  .then((data) => cardDetails(data));

const cardDetails = (data) => {
  const card = document.getElementById("all-card");
  card.textContent = "";

  if (data.status) {
    for (const info of data.data.tools) {
      console.log(info);
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
             info.features.map((feature) => `<li>${feature}</li>`).join("")
           }
              
            </ol>
          </p>
        </div>
        <div class="card-footer">
        <div>
            <h5 class="card-title">${info.name}</h5>
            
         </div>
         


        </div>
        `;
      card.appendChild(div);
    }
  } else {
  }
};
