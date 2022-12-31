"use strict";

// Bắt sự kiện Click vào nút "Submit"
submitBtn.addEventListener("click", function (e) {
  // Lấy dữ liệu từ các Form input

  const data = {
    type: typeInput.value,
    breed: breedInput.value,
  };
  // Validate dữ liệu

  let array = ["type", "breed"];
  const validateInput = function (data2) {
    for (let i = 0; i < array.length; i++) {
      if (!data2.breed) {
        alert("Please select Breed");
        return false;
      } else if (data2.type === "Select Type") {
        alert("Please select Type");
        return false;
      } else {
        return true;
      }
    }
  };
  // return validated;

  const validate = validateInput(data);

  // Xóa các dữ liệu nhập trong Form Input
  const clearInput = () => {
    breedInput.value = "";
    typeInput.value = "Select Type";
  };

  // Thêm thú cưng vào danh sách
  if (validate) {
    breedArr.push(data);
    saveToStorage("breed", breedArr);
    clearInput();
    renderBreedData(breedArr);
  }
});

// Hiển thị danh sách thú cưng
function renderBreedData(breedArr) {
  tableBodyEl.innerHTML = "";
  for (let i = 0; i < breedArr.length; i++) {
    const row = document.createElement("tr");
    let doc = `<td scope="row">${i + 1}</td>
    <td>${breedArr[i]["breed"]}</td>
    <td>${breedArr[i]["type"]}</td>
  <td>
  <button class="btn btn-danger" onclick="deletePet('${
    breedArr[i]["breed"]
  }')">Delete</button>
  </td>`;
    row.innerHTML = doc;
    tableBodyEl.appendChild(row);
  }
}
// Xóa một thú cưng
function deletePet(petId) {
  // Confirm before deletePet
  if (confirm("Are you sure?")) {
    for (let i = 0; i < breedArr.length; i++) {
      if (petId === breedArr[i]["breed"]) {
        breedArr.splice(i, 1);
        saveToStorage("breed", breedArr);
        renderBreedData(breedArr);
      }
    }
  }
}
