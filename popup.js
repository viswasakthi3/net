document.getElementById("button").addEventListener("click", async () => {
  // Get the active tab
  const tabs = await chrome.tabs.query({ active: true, currentWindow: true });
  const activeTab = tabs[0];

  // Execute the script on the active tab
  chrome.scripting.executeScript({
    target: { tabId: activeTab.id }, // Provide the tabId here
    files: ["content.js"],
  });
});
