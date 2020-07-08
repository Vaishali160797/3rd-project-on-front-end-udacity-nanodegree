/* Global Variables */
const baseURL = "https://api.openweathermap.org/data/2.5/weather?zip=";
const apiKey = "&appid=22f3274b877a50199b45599dd07cc882";

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth() + "." + d.getDate() + "." + d.getFullYear();

// Event listener to add function to existing HTML DOM element
document.getElementById("generate").addEventListener("click", performAction);

/* Function called by event listener */
function performAction(e) {
  const postCode = document.getElementById("zip").value;
  const feelings = document.getElementById("feelings").value;
  console.log(postCode);
  getTemperature(baseURL, postCode, apiKey).then(function (data) {
    //adding data to POST request
    postData("/weatherData", {
      temperature: data.main.temp,
      date: newDate,
      userresponse: feelings,
    })
      //update UI function
      .then(function () {
        updateUI();
      });
  });
}

/* Function to GET Web API Data*/
const getTemperature = async (baseURL, code, key) => {
  const response = await fetch(baseURL + code + key);
  try {
    const data = await response.json();
    return data;
  } catch (error) {
    console.log("error", error);
  }
};

/* Function to POST data */
const postData = async (url = "", data = {}) => {
  const postRequest = await fetch(url, {
    method: "POST",
    credentials: "same-origin",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  try {
    const newData = await postRequest.json();
    return newData;
  } catch (error) {
    console.log("Error", error);
  }
};

//update UI
const updateUI = async () => {
  const request = await fetch("/all");
  try {
    const allData = await request.json();
    document.getElementById("date").innerHTML = allData.date;
    document.getElementById("temp").innerHTML = allData.temperature;
    document.getElementById("content").innerHTML = allData.userresponse;
  } catch (error) {
    console.log("error", error);
  }
};
