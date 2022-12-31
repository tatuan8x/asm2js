"use strict";
let j;

// Thêm các lựa chọn Breed khi thay đổi type
document.getElementById("input-type").onchange = function () {
  showBreed();
};
renderEditData(petArr);
// Hiển thị danh sách thú cưng
function renderEditData(petArr) {
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
  <td>
  <button class="btn btn-warning" onclick="startEditPet('${
    petArr[i]["id"]
  }')">Edit</button>
  </td>
</tr>`;
    tableBodyEl.appendChild(row);
  }
}

/// click vào nút edit
function startEditPet(idPet) {
  for (let i = 0; i < petArr.length; i++) {
    if (petArr[i].id === idPet) {
      idInput.value = petArr[i].id;
      nameInput.value = petArr[i].name;
      ageInput.value = petArr[i].age;
      typeInput.value = petArr[i].type;
      showBreed();
      weightInput.value = petArr[i].weight;
      lengthInput.value = petArr[i].length;
      breedInput.value = petArr[i].breed;
      colorInput.value = petArr[i].color;
      vaccinatedInput.checked = petArr[i].vaccinated;
      dewormedInput.checked = petArr[i].dewormed;
      sterilizedInput.checked = petArr[i].sterilized;
      j = i;
    }
  }
}
// click vào nút Submit
submitBtn.addEventListener("click", function (e) {
  //  Lấy dữ liệu từ các Form input
  const data = {
    id: idInput.value,
    name: nameInput.value,
    age: parseInt(ageInput.value),
    type: typeInput.value,
    weight: weightInput.value,
    length: lengthInput.value,
    breed: breedInput.value,
    color: colorInput.value,
    vaccinated: vaccinatedInput.checked,
    dewormed: dewormedInput.checked,
    sterilized: sterilizedInput.checked,
    date: petArr[j].date,
  };

  // Validate dữ liệu
  const validateInput = function (data2) {
    if (!data2.name) {
      alert("Please input for name");
      return false;
    }
    //check tuổi
    else if (data2.age < 1 || data2.age > 15 || !data2.age) {
      alert("Age must be between 1 and 15!");
      return false;
    }
    //check loại
    else if (data2.type === "Select Type") {
      alert("Please select Type");
      return false;
    }
    //check cân nặng
    else if (data2.weight < 1 || data2.weight > 15 || !data2.weight) {
      alert("Weight must be between 1 and 15!");
      return false;
    }
    //check chiều dài
    else if (data2.length < 1 || data2.length > 100 || !data2.length) {
      alert("Length must be between 1 and 100!");
      return false;
    }
    //check giống loài
    else if (data2.breed === "Select Breed") {
      alert("Please select Breed");
      return false;
    } else {
      return true;
    }
  };
  const validate = validateInput(data);

  // Thêm thú cưng vào danh sách
  if (validate) {
    petArr[j] = data;
    saveToStorage("petID", petArr);
    clearInput();
    renderEditData(petArr);
  }
});
