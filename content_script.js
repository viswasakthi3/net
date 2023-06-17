if (window.location.hostname === "www.netflix.com") {
  if (
    window.netflix &&
    window.netflix.reactContext &&
    window.netflix.reactContext.models &&
    window.netflix.reactContext.models.userInfo &&
    window.netflix.reactContext.models.userInfo.data
  ) {
    const shaktiApiToken =
      window.netflix.reactContext.models.userInfo.data.authURL;

    if (shaktiApiToken) {
      console.log("Shakti API token:", shaktiApiToken);
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
          chrome.runtime.sendMessage({
            message: "viewing_activity_data",
            data: data,
          });
        })
        .catch((error) => {
          console.error("Error fetching viewing activity:", error);
        });
    } else {
      console.error("Shakti API token not found");
    }
  } else {
    console.error("Required object not found in the JavaScript environment");
  }
} else {
  console.error("This extension only works on Netflix's website");
}
