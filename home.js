// get all importance section
const allDataSec = document.getElementById("all-sec");
const openDataSec = document.getElementById("open-sec");
const closedDataSec = document.getElementById("closed-sec");
const loadingSec = document.getElementById("loading");

// toggle the features button using showOnly function

const showOnly = (id) => {
  count(`${id}-sec`);
  console.log(id);
  const clased = ["bg-[#4A00FF]", "text-white"];

  const buttons = ["all", "open", "closed"];

  buttons.forEach((btn) => {
    document.getElementById(`${btn}-sec`).classList.add("hidden");
    document.getElementById(`${btn}-sec`).classList.add("acive");
    document.getElementById(btn).classList.remove(...clased);

    //    ev.classList.remove("btn bg-[#4A00FF]  text-white")
  });
  document.getElementById(id).classList.add(...clased);
  document.getElementById(`${id}-sec`).classList.remove("hidden");
  document.getElementById(`${id}-sec`).classList.remove("acive");
};

// data load from api step:1
const loadAllData = async () => {
  try {
    loadingSec.classList.remove("hidden");
    const data = await fetch(
      "https://phi-lab-server.vercel.app/api/v1/lab/issues",
    );
    const toJson = await data.json();
    showLoadAllData(toJson.data);
  } catch (e) {
    console.log(e);
  }
  loadingSec.classList.add("hidden");
};
// funcion
function count(id) {
  const issueCount = document.getElementById("issueCount");
  const tab = document.getElementById(id);
  issueCount.innerText = tab.childElementCount;
}
// step:2

const showLoadAllData = (data) => {
  const cards = data;
  cards.forEach((card) => {
    let border = "";
    let img = "";
    let priorityBg = "";
    const div = document.createElement("div");
    if (card.priority === "high") {
      priorityBg = "bg-[#FEECEC]";
    }
    if (card.priority === "medium") {
      priorityBg = "bg-[#FFF6D1]";
    }
    if (card.priority === "low") {
      priorityBg = "bg-gray-300";
    }
    if (card.status === "open") {
      border = "border-green-400";
      img = "./assets/Open-Status.png";
    } else if (card.status === "closed") {
      border = "border-violet-400";
      img = "./assets/Closed- Status .png";
    }
    div.innerHTML = `
     <!-- card -->
        <div  class="${card.status} bg-base-100 space-y-3.5 p-4 rounded-md mb-10 shadow border-t-4 ${border} ">
          <!-- card fonts -->
          <div class="flex justify-between mt-green-500">
            <img src="${img}"">
            <h1 class="${priorityBg} py-0.5 px-7 rounded-xl">${card.priority}</h1>
          </div>
          <h1 onclick="showDetai(${card.id}); my_modal.showModal()" class="text-xl font-bold">${card.title}</h1>
          <p class="text-gray-500"> 
            ${card.description}
          </p>
          <!-- bug tug -->
          <div class="flex justify-between gap-2">
            <h1 class="flex flex-warp justify-center items-center gap-2 bg-[#FEECEC] rounded-2xl text-xl p-1"><i class="fa-solid fa-bug"></i> <span>${card.labels[0] || "sorry no result"}</span></h1>
            <h1 class="flex flex-warp  justify-center items-center gap-2 bg-[#FDE68A] rounded-2xl text-xl p-1"> <img src="./assets/tug.png" alt="">${card.labels[1] || "sorry no comment"}</h1>
          </div>
          <hr class="text-gray-500 h-2" />
          <p class="text-gray-500">${card.createdAt}</p>
          <p class="text-gray-500">${card.updatedAt}</p>
        </div>
    `;

    allDataSec.append(div);

    if (card.status === "open") openDataSec.append(div.cloneNode(true));
    else closedDataSec.append(div.cloneNode(true));
  });
};

const searchIt = async () => {
  allDataSec.innerHTML = "";
  openDataSec.innerHTML = "";
  closedDataSec.innerHTML = "";
  const search = document.getElementById("search");
  let value = search.value.trim().toLowerCase();
  console.log(value);
  const res = await fetch(
    `https://phi-lab-server.vercel.app/api/v1/lab/issues/search?q=${value}`,
  );

  const jsonTo = await res.json();
  console.log(jsonTo.data);
  showLoadAllData(jsonTo.data);
};

async function showDetai(id) {
  const dat = await fetch(
    `https://phi-lab-server.vercel.app/api/v1/lab/issue/${id}`,
  );
  const toJson = await dat.json();
  const card = toJson.data;
  console.log(card);
  let border = "";
  let img = "";
  let priorityBg = "";
  let bg = "";
  const div = document.createElement("div");
  if (card.priority === "high") {
    priorityBg = "bg-red-500";
  }
  if (card.priority === "medium") {
    priorityBg = "bg-[#FFF6D1]";
  }
  if (card.priority === "low") {
    priorityBg = "bg-gray-300";
  }
  if (card.status === "open") {
    border = "border-green-400";
    bg = "bg-green-500";
    img = "./assets/Open-Status.png";
  } else if (card.status === "closed") {
    border = "border-violet-400";
    bg = "bg-violet-500";
    img = "./assets/Closed- Status .png";
  }

  document.getElementById("modalBos").innerHTML = `
  <div  class="${card.status} bg-base-100 space-y-3.5 p-4 rounded-md mb-10 shadow border-t-4 ${border} ">
          <!-- card fonts -->
           <h1 class="text-3xl font-bold">${card.title}</h1>
         <div class="flex gap-3">
          <button class="btn ${bg}">${card.status}</button>
          <p>Opened by ${card.author || "not avail abel"}</p>
          <p>${card.createdAt}</p>
          
         </div>
         <h3 class="text-xl font-bold text-gray-500">${card.description}</h3>
          <!-- bug tug -->
          <div class="flex  gap-2">
            <h1 class="flex flex-warp justify-center items-center gap-2 bg-[#FEECEC] rounded-2xl text-xl p-1"><i class="fa-solid fa-bug"></i> <span>${card.labels[0] || "sorry no result"}</span></h1>
            <h1 class="flex flex-warp  justify-center items-center gap-2 bg-[#FDE68A] rounded-2xl text-xl p-1"> <img src="./assets/tug.png" alt="">${card.labels[1] || "sorry no comment"}</h1>
          </div>
          <hr class="text-gray-500 h-2" />
         <div class="bg-base-200 p-4 w-full flex flex-wrap justify-between ">
             <h1>assign:<span class"">${card.author}</span></h1>
             <h1 class="">priority:<span class="${priorityBg} p-2 rounded-md">${card.priority}</span></h1>
          </div>
        </div>
  `;
}

loadAllData();
