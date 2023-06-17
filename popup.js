chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
  chrome.scripting.executeScript(
    {
      target: { tabId: tabs[0].id },
      files: ["content_script.js"],
    },
    function () {
      chrome.runtime.sendMessage(
        { message: "fetch_shakti_api_data" },
        function (response) {
          if (response) {
            const outputElement = document.getElementById("output");
            outputElement.textContent = JSON.stringify(response.data, null, 2);
          }
        }
      );
    }
  );
});
