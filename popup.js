document.addEventListener("DOMContentLoaded", function () {
  const fetchDataBtn = document.getElementById("fetchDataBtn");
  fetchDataBtn.addEventListener("click", function () {
    chrome.runtime.sendMessage({ action: "fetchData" }, function (response) {
      console.log("Data fetch response:", response);
    });
  });
});
