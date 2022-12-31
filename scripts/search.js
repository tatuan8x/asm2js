"use strict";

const findBtn = document.getElementById("find-btn");

// Hiển thị danh sách thú cưng
function renderSearchData(petArr) {
  let tableBodyEl = document.getElementById("tbody");
  tableBodyEl.innerHTML = "";
  for (let i = 0; i < petArr.length; i++) {
    const row = document.createElement("tr");
    row.innerHTML = `<th scope="row">${petArr[i].id}</th>
  <td>${petArr[i].name}</td>
  <td>${petArr[i].age}</td>
  <td>${petArr[i].type}</td>
  <td>${petArr[i].weight} kg</td>
  <td>${petArr[i].length} cm</td>
  <td>${petArr[i].breed}</td>
  <td>
    <i class="bi bi-square-fill" style="color: ${petArr[i].color}"></i>
  </td>
  <td>${
    petArr[i].vaccinated
      ? `<i class="bi bi-check-circle-fill"></i>`
      : `<i class="bi bi-x-circle-fill"></i>`
  }</td>
  <td>${
    petArr[i].dewormed
      ? `<i class="bi bi-check-circle-fill"></i>`
      : `<i class="bi bi-x-circle-fill"></i>`
  }</td>
  <td>${
    petArr[i].sterilized
      ? `<i class="bi bi-check-circle-fill"></i>`
      : `<i class="bi bi-x-circle-fill"></i>`
  }</td>
  
  <td>${petArr[i].date}</td>
  
</tr>`;
    tableBodyEl.appendChild(row);
  }
}

// Tạo mảng chứa các breed
const breedList = breedArr.map((breedArr) => {
  return breedArr.breed;
});

// Thêm các breed vào option lựa chọn
function breedType() {
  breedInput.innerHTML = `<option>Select Breed</option>`;
  breedList.forEach(function (element) {
    const option = document.createElement("option");
    option.innerHTML = `<option>${element}</option>`;
    breedInput.appendChild(option);
  });
}
breedType();

// click vào nút Find
findBtn.addEventListener("click", function () {
  const check = petArr.filter((petArr) => {
    return (
      petArr.id.includes(idInput.value) &&
      petArr.name.includes(nameInput.value) &&
      (!vaccinatedInput.checked ||
        petArr.vaccinated === vaccinatedInput.checked) &&
      (!dewormedInput.checked || petArr.dewormed === dewormedInput.checked) &&
      (!sterilizedInput.checked ||
        petArr.sterilized === sterilizedInput.checked) &&
      (typeInput.value === "Select Type" || petArr.type === typeInput.value) &&
      (breedInput.value === "Select Breed" || petArr.breed === breedInput.value)
    );
  });
  renderSearchData(check);
  clearInput1();
});

// Xóa các dữ liệu nhập trong Form Input
function clearInput1() {
  idInput.value = "";
  nameInput.value = "";
  typeInput.value = "Select Type";
  breedInput.value = "Select Breed";
  vaccinatedInput.checked = false;
  dewormedInput.checked = false;
  sterilizedInput.checked = false;
}
