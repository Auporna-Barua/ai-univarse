const toolInfos = (data, limit) => {
  const card = document.getElementById("all-card");
  card.textContent = "";
  console.log(limit);
  console.log(data);
  if (data.status) {
    error.innerHTML = "";
    for (const info of data.data.tools.slice(0, limit)) {
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
         <button class="btn arrow-btn" onclick="toolsDetails('${
           info.id
         }')" data-bs-toggle="modal" data-bs-target="#detailsModal"><i class="fa-solid fa-arrow-right"></i> </button>
         


        </div>
        `;
      card.appendChild(div);
    }
  } else {
    const error = document.getElementById("error");
    error.innerHTML = `<h2 class= "text-center text-danger">Oops!😥😪😢 There are no tools</h2>`;
  }
};
window.onload = async () => {
  const response = await fetch(
    `https://openapi.programming-hero.com/api/ai/tools`
  );
  const data = await response.json();
  // const data = res.data;
  let limit = 6;
  toolInfos(data, limit);

  document.getElementById("see-more").addEventListener("click", () => {
    limit += data?.data?.tools?.length;
    toolInfos(data, limit);
  });
};
// tools Details Show Here
const toolsDetails = async (id) => {
  const details = document.getElementById("details");

  const response = await fetch(
    `https://openapi.programming-hero.com/api/ai/tool/${id}`
  );
  var data = await response.json();

  details.innerHTML = `
    <div class="modal-content">
      <div class="modal-header">
        <button type="button" class="btn-close " data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body">
    <div class="tool-details">
      <div class="tool-left">
        <h2>
         ${data?.data?.description}
        </h2>
        <div class="price">
        ${data?.data?.pricing
          .map(
            (price) =>
              ` <div class="box">
            <h3 style="color: #03a30a">${
              price.price == 0 ? "cost of" : price.price
            } ${price.plan}</h3>
          </div>`
          )
          .join("")}
        
          
        </div>
        <div class="features">
          <div>
            <h2>Features</h2>

            <ul>
          
            <li>${data?.data?.features[1].feature_name}<li>
            <li>${data?.data?.features[2].feature_name}<li>
            <li>${data?.data?.features[3].feature_name}<li>

            
             
            </ul>
          </div>
          <div>
            <h2>Integrations</h2>
            <ul class=" ">
              ${
                data?.data?.integrations
                  ? data?.data?.integrations
                      .map((inte) => `<li >${inte}</li>`)
                      .join("")
                  : `<p>No data found </p>`
              }
            </ul>
          </div>
        </div>
      </div>

      <div class="tool-right">
        <div class="card ">
       ${
         data?.data?.accuracy.score
           ? `<img src="${data?.data?.image_link[0]}" class="card-img-top img-fluid position-relative" alt="..." />
       
           <span class="position-absolute top-0 custom-badge  badge rounded-pill bg-danger">
        ${data?.data?.accuracy?.score}% accuracy
        </span>`
           : `<img src="${data?.data?.image_link[0]}" class="card-img-top img-fluid position-relative" alt="..." />`
       }
         
          <div class="card-body text-center">
          ${data?.data?.input_output_examples
            ?.map(
              (result) =>
                `<h5 class="card-title">${result.input}</h5>
              <p class="card-text">
                ${result.output}
              </p>`
            )
            .join("")}
          
          </div>
        </div>
      </div>
    </div>
  </div>
    
  </div>
  `;
};
