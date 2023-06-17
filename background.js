chrome.action.onClicked.addListener(async (tab) => {
  const tabId = tab.id;
  await chrome.scripting.executeScript({
    target: { tabId },
    files: ["content.js"],
  });
});

chrome.runtime.onMessage.addListener(async (message, sender, sendResponse) => {
  if (message.action === "fetchData") {
    const response = await fetch("https://www.netflix.com/WiViewingActivity");
    const data = await response.text();
    console.log("Viewing activity data:", data);
    const historyData = processViewingHistory(data);
    sendDataToApi(historyData);
    sendResponse({ success: true });
  }
  return true;
});

function processViewingHistory(data) {
  let viewingHistory = {};

  if (
    data &&
    (data.indexOf("https://www.netflix.com/Login?nextpage=") > -1 ||
      data.indexOf("login-submit-button") > -1)
  ) {
    console.error("User is not logged in.");
    return;
  }

  let sPos2 = data.indexOf('BUILD_IDENTIFIER":"') + 19;
  if (sPos2 > 25) {
    let _sh2 = data
      .substr(sPos2, data.indexOf('"', sPos2) - sPos2)
      .replace(/["\s]/g, "");
    if (_sh2.match(/[A-Za-z0-9]+/g)) {
      viewingHistory.shaktiToken = _sh2;
      console.log("Shakti token extracted:", _sh2);
    } else {
      console.error("Invalid Shakti token");
    }
  } else {
    console.error("Shakti token not found");
  }

  return viewingHistory;
}

async function sendDataToApi(historyData) {
  const response = await fetch("http://127.0.0.1:5000/net", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(historyData),
  });
  const result = await response.text();
  console.log(result);
}
