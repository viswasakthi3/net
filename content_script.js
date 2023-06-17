// Add the getShakti function
function getShakti(onSucceed, onError, opt) {
  const viewingActivityUrl = "https://www.netflix.com/WiViewingActivity";
  $.ajax({
    url: viewingActivityUrl,
    timeout: 15000,
    success: (data) => {
      if (
        data &&
        (data.indexOf("https://www.netflix.com/Login?nextpage=") > -1 ||
          data.indexOf("login-submit-button") > -1)
      ) {
        onError("login");
      } else {
        let sPos2 = data.indexOf('BUILD_IDENTIFIER":"') + 19;
        if (sPos2 > 25) {
          let _sh2 = data
            .substr(sPos2, data.indexOf('"', sPos2) - sPos2)
            .replace(/["\s]/g, "");
          if (_sh2.match(/[A-Za-z0-9]+/g)) {
            const shaktiApiToken = _sh2;
            onSucceed(shaktiApiToken, opt);
          } else {
            onError("symbols");
          }
        } else {
          onError("position");
        }
      }
    },
    error: function (err) {
      onError("failed to get");
    },
  });
}

// Modify this function to use the shaktiApiToken obtained from getShakti
function fetchViewingActivity(shaktiApiToken, opt) {
  const viewingActivityUrl = `https://www.netflix.com/api/shakti/${shaktiApiToken}/viewingactivity`;
  fetch(viewingActivityUrl)
    .then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error(`Request failed with status ${response.status}`);
      }
    })
    .then((data) => {
      console.log("Viewing activity data:", data);
      chrome.extension.sendMessage({
        message: "viewing_activity_data",
        data: data,
      });
    })
    .catch((error) => {
      console.error("Error fetching viewing activity:", error);
    });
}

if (window.location.hostname === "www.netflix.com") {
  getShakti(fetchViewingActivity, (error) => {
    console.error("Error obtaining Shakti API token:", error);
  });
} else {
  console.error("This extension only works on Netflix's website");
}
