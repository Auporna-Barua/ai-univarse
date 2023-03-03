fetch(`https://openapi.programming-hero.com/api/ai/tools`)
  .then((response) => response.json())
  .then((data) => toolInfos(data));

const toolInfos = (data) => {
  const card = document.getElementById("all-card");
  card.textContent = "";

  if (data.status) {
    error.innerHTML = "";
    for (const info of data.data.tools.slice(0, 6)) {
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

// tools Details Show Here
const toolsDetails = (id) => {
  fetch(`https://openapi.programming-hero.com/api/ai/tool/${id}`)
    .then((response) => response.json())
    .then((data) => console.log(data.data));
  
  const details = document.getElementById("details");
  details.innerHTML = `<div class="modal fade" id="detailsModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <button type="button" class="btn-close " data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body">
       <div class="tool-details">
      <div class="tool-left">
        <h2>
          ChatGPT is an AI-powered chatbot platform that uses OpenAI's GPT
          technology to simulate human conversation.
        </h2>
        <div class="price">
          <div class="box">
            <h3 style="color: #03a30a">$10/ month Basic</h3>
          </div>
          <div class="box"><h3 style="color: #f28927">$50/ month Pro</h3></div>
          <div class="box">
            <h3 style="color: #eb5757">Contact us Enterprise</h3>
          </div>
        </div>
        <div class="features">
          <div>
            <h2>Features</h2>

            <ul class=" ">
              <li>A list item</li>
              <li>A list item</li>
              <li>A list item</li>
            </ul>
          </div>
          <div>
            <h2>Integrations</h2>
            <ul class=" ">
              <li>A list item</li>
              <li>A list item</li>
              <li>A list item</li>
            </ul>
          </div>
        </div>
      </div>

      <div class="tool-right">
        <div class="card ">
          <img src="/img/1.jpg" class="card-img-top img-fluid" alt="..." />
          <div class="card-body text-center">
            <h5 class="card-title">Card title</h5>
            <p class="card-text">
              Some quick example text to build on the card title and make up the
              bulk of the card's content.
            </p>
          </div>
        </div>
      </div>
    </div>
      </div>
    
    </div>
  </div>
</div>`;
};
