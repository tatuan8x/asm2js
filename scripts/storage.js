// "use strict";
"use strict";
// Khai báo ban đầu
const submitBtn = document.getElementById("submit-btn");
const idInput = document.getElementById("input-id");
const nameInput = document.getElementById("input-name");
const ageInput = document.getElementById("input-age");
const typeInput = document.getElementById("input-type");
const weightInput = document.getElementById("input-weight");
const lengthInput = document.getElementById("input-length");
const colorInput = document.getElementById("input-color-1");
const breedInput = document.getElementById("input-breed");
const vaccinatedInput = document.getElementById("input-vaccinated");
const dewormedInput = document.getElementById("input-dewormed");
const sterilizedInput = document.getElementById("input-sterilized");
const healthyBtn = document.getElementById("healthy-btn");

const tableBodyEl = document.getElementById("tbody");
const petArr = getFromStorage("petID");
let healthyPetArr;

// 1. Bổ sung Animation cho Sidebar
const slidebar = document.querySelector("#sidebar");
slidebar.addEventListener("click", function () {
  slidebar.classList.toggle("active");
});

const breedArr = getFromStorage("breed");

function saveToStorage(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}
function getFromStorage(key) {
  return localStorage.getItem(key) ? JSON.parse(localStorage.getItem(key)) : [];
}
function removeFromStorage(key) {
  localStorage.removeItem(key);
}
// Hiển thị Breed trong màn hình quản lý thú cưng
function showBreed() {
  if (typeInput.value === "Dog") breedType("dog");
  else if (typeInput.value === "Cat") breedType("cat");
}

/// Danh sách các Breed lấy từ mục Breed
function renderBreed(typeBreed) {
  let breedType = [];
  if (typeBreed === "dog") {
    for (let i = 0; i < breedArr.length; i++)
      if (breedArr[i].type === "Dog") breedType.push(breedArr[i].breed);
  } else {
    for (let i = 0; i < breedArr.length; i++)
      if (breedArr[i].type === "Cat") breedType.push(breedArr[i].breed);
  }
  return breedType;
}
// Thêm các breed vào option lựa chọn
function breedType(a) {
  breedInput.innerHTML = `<option>Select Breed</option>`;
  const breedList = renderBreed(a);
  breedList.forEach(function (element) {
    const option = document.createElement("option");
    option.innerHTML = `<option>${element}</option>`;
    breedInput.appendChild(option);
  });
}

// Xóa các dữ liệu nhập trong Form Input
function clearInput() {
  idInput.value = "";
  nameInput.value = "";
  ageInput.value = "";
  typeInput.value = "Select Type";
  weightInput.value = "";
  lengthInput.value = "";
  colorInput.value = "#000000";
  breedInput.value = "Select Breed";
  vaccinatedInput.checked = false;
  dewormedInput.checked = false;
  sterilizedInput.checked = false;
  ageInput.value = "";
}
