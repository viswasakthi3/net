let viewingActivityData = null;

chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  if (request.message === "fetch_shakti_api_data") {
    sendResponse({ data: viewingActivityData });
  } else if (request.message === "viewing_activity_data") {
    viewingActivityData = request.data;
  }
});
