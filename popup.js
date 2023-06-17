document.getElementById("fetchData").addEventListener("click", () => {
  chrome.scripting.executeScript({
    target: { tabId: chrome.tabs.TAB_ID_CURRENT },
    files: ["content.js"],
  });
});
