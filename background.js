chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  if (request.message === "fetch_shakti_api_data") {
    chrome.scripting.executeScript(
      {
        target: { tabId: sender.tab.id },
        files: ["content_script.js"],
      },
      function () {
        sendResponse({ data: window.viewingActivityData });
      }
    );
    return true;
  }
});
