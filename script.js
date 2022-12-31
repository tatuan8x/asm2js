"use strict";

// click vào nút Submit
submitBtn.addEventListener("click", function (e) {
  //  ngày tạo
  const date = new Date();
  function dateData() {
    return (
      date.getDate() + "/" + (date.getMonth() + 1) + "/" + date.getFullYear()
    );
  }
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
    date: dateData(),
  };

  // Validate dữ liệu
  const validateInput = function (data2) {
    //check trùng id
    for (let i = 0; i < petArr.length; i++) {
      if (data.id === petArr[i].id) {
        alert("ID must unique!");
        return false;
      }
    }
    //check id rỗng
    if (!data2.id) {
      alert("Please input for ID");
      return false;
    }
    //check tên rỗng
    else if (!data2.name) {
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
    petArr.push(data);
    saveToStorage("petID", petArr);
    clearInput();
    renderTableData(petArr);
  }
});

// Thêm các lựa chọn Breed khi thay đổi type
document.getElementById("input-type").onchange = function () {
  showBreed();
};

// Hiển thị danh sách thú cưng
function renderTableData(petArr) {
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
    <button type="button" class="btn btn-danger" onclick="deletePet('${
      petArr[i].id
    }')">Delete</button>
  </td>
</tr>`;
    tableBodyEl.appendChild(row);
  }
}

// Xóa một thú cưng
const deletePet = (petId) => {
  // xác nhận xoá pet
  if (confirm("Are you sure?")) {
    for (let i = 0; i < petArr.length; i++) {
      if (petArr[i].id === petId) {
        //xác định vị trí của object trong array
        const deleteId = petArr.map((e) => e.id).indexOf(petId);
        //xóa phần tử
        petArr.splice(deleteId, 1);
        saveToStorage("petID", petArr);
        renderTableData(petArr);
      }
    }
  }
};

//hiển thị pet đã tiêm phòng đầy đủ
let healthyCheck = false;
healthyBtn.addEventListener("click", function () {
  healthyCheck = healthyCheck === false ? true : false;
  //đổi nút thành Show All Pet
  if (healthyCheck) {
    healthyBtn.textContent = "Show All Pet";
    //hàm điều kiện cả 3 đều là true
    function createHealthyPet(x) {
      if (x.vaccinated && x.dewormed && x.sterilized) {
        return true;
      }
    }
    //tạo array được filter dựa trên điều kiện
    const healthyPetArr = petArr.filter(createHealthyPet);
    renderTableData(healthyPetArr);
  }
  //ấn lại thì trở về ban đầu
  else {
    healthyBtn.textContent = "Show Healthy Pet";
    renderTableData(petArr);
  }
});
