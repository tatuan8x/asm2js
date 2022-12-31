"use strict";
const importBtn = document.getElementById("import-btn");
const exportBtn = document.getElementById("export-btn");
let checkID = [];
let resultArr = [];
let data = [];
// click nút Export Data
exportBtn.addEventListener("click", function () {
  exportData();
});
// Hàm export data ra static.json
function exportData() {
  const exportData = localStorage.getItem("petID");
  let blob = new Blob([exportData], { type: "application/json" });
  saveAs(blob, "static.json");
}

importBtn.addEventListener("click", function () {
  console.log(data);
  if (Array.isArray(data) && data.length > 0) saveToStorage("petID", data);
});

// phần chọn tệp
function onFileLoad(elementId, event) {
  resultArr = event.target.result;
  //console.log(resultArr, typeof resultArr);
  data = JSON.parse(resultArr);
  console.log(data);
}

function onChooseFile(event, onLoadFileHandler) {
  if (typeof window.FileReader !== "function")
    throw "The file API isn't supported on this browser.";
  let input = event.target;
  if (!input) throw "The browser does not properly implement the event object";
  if (!input.files)
    throw "This browser does not support the `files` property of the file input.";
  if (!input.files[0]) return undefined;
  let file = input.files[0];
  let fr = new FileReader();
  fr.onload = onLoadFileHandler;
  fr.readAsText(file);
}
