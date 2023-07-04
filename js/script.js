const customerNameInput = document.querySelector(".customer-name-input");
const amountTakenInput = document.querySelector(".amount-taken-input");
const addButton = document.querySelector(".add-button");
const customerCards = document.getElementsByClassName("customer-details-conatiner")[0];
const paidAmount = document.getElementById("paid-amount");
const getAmount = document.getElementById("get-amount");

const customerDetails = [];

function updatingBox(i) {
  document
    .getElementsByClassName("edit-amount")
    [i].addEventListener("keyup", (e) => {
      if (e.key === "Enter") {
        let res = Number(customerDetails[i].totalDues) + Number(document.getElementsByClassName("edit-amount")[i].value);
        customerDetails[i].totalDues = res;
        showList();
      }
    });
}

function showList() {
  customerCards.innerHTML = " ";
  console.log(customerDetails.length);
  for (let i = 0; i < customerDetails.length; i++) {
    // console.log(customerDetails[i].totalDues);
    customerCards.innerHTML += ` <div class="d-flex justify-content-evenly align-items-center bg-white mt-2 py-2 rounded-2">
       <span><img src="images/user.svg" alt="user image" /></span>
       <p  class="customer-name pt-3 fs-4">${customerDetails[i].customerName}</p>
       <p class="pt-3 text-danger">$<span class="amount ms-2">${customerDetails[i].totalDues}</span></p>
       <input type="number" class="edit-amount border border-0 hidden-item" />
       <span><img src="images/edit.svg" alt="edit button" class = edit-button onclick = "editButton(${i})" /></span>
      <img src="./images/froward.svg" alt="All details" class="all-details-button" onclick = "allDetails(${i})">
   </div>`;
  }
}

function editButton(i) {
  document
    .getElementsByClassName("edit-amount")
    [i].classList.toggle("hidden-item");
  updatingBox(i);
}

function backPage() {
  document.getElementById("back-btn").addEventListener("click", () => {
    document.getElementById("khata-container").classList.remove("hidden-section");
    document.getElementById("all-details-section").classList.add("hidden-section");
    showList();
    document.getElementById("amount-get").innerHTML = 0;
  });
  // console.log(customerDetails);
}
document.getElementById("edit-paid").addEventListener("click", () => {
  paidAmount.classList.toggle("hidden-item");
});
document.getElementById("edit-get").addEventListener("click", () => {
  console.log("n");
    getAmount.classList.toggle("hidden-item");
  });

function editTask(i) {
 


  
  paidAmount.addEventListener("keyup", (e) => {
    if (e.key === "Enter") {
      document.getElementById("total-amount").innerHTML = Number(paidAmount.value) + Number(document.getElementById("total-amount").innerHTML);
      paidAmount.classList.add("hidden-item");
      document.getElementById("amount-paid").innerHTML =  document.getElementById("total-amount").innerHTML;
     customerDetails[i].totalDues = document.getElementById("total-amount").innerHTML;

      paidAmount.value = "";
    }
  });

  getAmount.addEventListener("keyup", (e) => {
    if (e.key === "Enter") {
      document.querySelector("#amount-get ").innerHTML = Number(getAmount.value) + Number(document.querySelector("#amount-get ").innerHTML);
      getAmount.classList.add("hidden-item");
      document.getElementById("total-amount").innerHTML = Number(document.getElementById("total-amount").innerHTML) - Number(getAmount.value);
      document.getElementById("amount-paid").innerHTML = document.getElementById("total-amount").innerHTML;
      customerDetails[i].totalDues = document.getElementById("total-amount").innerHTML;

      getAmount.value = "";
    }

  });
}

function allDetails(i) {
  console.log(i)
  let name = customerDetails[i].customerName;
  let totalDues = customerDetails[i].totalDues;
  document.getElementById("total-amount").innerHTML = totalDues;
  document.getElementById("user-name").innerHTML = name;
  document.getElementById("amount-paid").innerHTML = totalDues;
  document.getElementById("khata-container").classList.add("hidden-section");
  document.getElementById("all-details-section").classList.remove("hidden-section");
  // console.log(customerDetails);
  
  backPage();
  editTask(i);
}

function getDetails() {
  const content = {
    customerName: customerNameInput.value.trim(),
    totalDues: amountTakenInput.value,
  };

  if (customerNameInput.value.trim() !== "" && amountTakenInput.value !== "") {
    customerCards.classList.remove("hidden-block");

    customerDetails.push(content);
  } else {
    alert("Empty task");
  }
  showList();
  customerNameInput.value = "";
  amountTakenInput.value = "";
}

amountTakenInput.addEventListener("keyup", (e) => {
  if (e.key === "Enter") {
    getDetails();
  }
});

addButton.addEventListener("click", () => {
  getDetails();
});
