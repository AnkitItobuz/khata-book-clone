const customerNameInput = document.querySelector(".customer-name-input");
const amountTakenInput = document.querySelector(".amount-taken-input");
const addButton = document.querySelector(".add-button");
const customerCards = document.getElementsByClassName("customer-details-conatiner")[0];

const customerDetails = [];

function updatingBox(i) {
  document
    .getElementsByClassName("edit-amount")
    [i].addEventListener("keyup", (e) => {
      if (e.key === "Enter") {
        let res =
          Number(customerDetails[i].totalDues) +
          Number(document.getElementsByClassName("edit-amount")[i].value);
        customerDetails[i].totalDues = res;
        showList();
      }
    });
}

function showList() {
  customerCards.innerHTML = " ";
  for (let i = 0; i < customerDetails.length; i++) {
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
    document
      .getElementById("khata-container")
      .classList.remove("hidden-section");
    document
      .getElementById("all-details-section")
      .classList.add("hidden-section");
    showList();
  });
}

function editTask(i) {
  const paidAmount = document.getElementsByClassName("paid-amount")[i];
  const getAmount = document.getElementsByClassName("get-amount")[i];
  // alert(i);
  document.getElementsByClassName("edit-paid")[i].addEventListener("click", () => {
      paidAmount.classList.toggle("hidden-item");
    });

  document.getElementsByClassName("edit-get")
    [i].addEventListener("click", () => {
      getAmount.classList.toggle("hidden-item");
    });

  paidAmount.addEventListener("keyup", (e) => {
    if (e.key === "Enter") {
      document.getElementsByClassName("total-paid ")[i].innerHTML =
        Number(paidAmount.value) +
        Number(document.getElementsByClassName("total-paid ")[i].innerHTML);
      paidAmount.classList.add("hidden-item");
      document.querySelector(".total-amount").innerHTML =
        document.getElementsByClassName("total-paid ")[i].innerHTML;
      customerDetails[i].totalDues =
        document.querySelector(".total-amount").innerHTML;
      // paidAmount.value = "";
    }
  });

  getAmount.addEventListener("keyup", (e) => {
    if (e.key === "Enter") {
      document.querySelector("#amount-get ").innerHTML =
        Number(getAmount.value) +
        Number(document.querySelector("#amount-get ").innerHTML);
      getAmount.classList.add("hidden-item");
      document.getElementsByClassName("total-paid ")[i].innerHTML =
        Number(document.getElementsByClassName("total-paid ")[i].innerHTML) -
        Number(getAmount.value);
      document.querySelector(".total-amount").innerHTML =
        Number(document.querySelector(".total-amount").innerHTML) -
        Number(getAmount.value);
      customerDetails[i].totalDues =
        document.querySelector(".total-amount").innerHTML;

      getAmount.value = "";
    }
  });
}

function allDetails(i) {
  let name = customerDetails[i].customerName;
  let totalDues = customerDetails[i].totalDues;
  document.getElementsByClassName("total-amount")[i].innerHTML = totalDues;
  document.getElementsByClassName("user-name")[i].innerHTML = name;
  document.getElementsByClassName("total-paid")[i].innerHTML = totalDues;
  document.getElementsByClassName("khataBook-container")[i].classList.add("hidden-section");
  document.getElementById("all-details-section").classList.remove("hidden-section");
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
