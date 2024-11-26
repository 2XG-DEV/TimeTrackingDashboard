const daily = document.getElementById("daily");
const weekly = document.getElementById("weekly");
const monthly = document.getElementById("monthly");

let activities = undefined;

async function getData() {
  const response = await fetch("data.json");
  const data = await response.json();

  return data;
}

getData().then((data) => {
  activities = data;
});

function update(selected) {
  switch (selected) {
    case "daily":
      daily.classList.add("active");
      weekly.classList.remove("active");
      monthly.classList.remove("active");
      updateData(activities, "daily");
      break;
    case "weekly":
      daily.classList.remove("active");
      weekly.classList.add("active");
      monthly.classList.remove("active");
      updateData(activities, "weekly");
      break;
    case "monthly":
      daily.classList.remove("active");
      weekly.classList.remove("active");
      monthly.classList.add("active");
      updateData(activities, "monthly");
      break;
  }
}

function dataToIds(data) {
  return data.map((activity) => activity.title.toLowerCase().replace(" ", "-"));
}

function updateData(activities, selected = "weekly") {
  activities.forEach((activity) => {
    const selector = document.getElementById(
      activity.title.toLowerCase().replace(" ", "-")
    );

    const previous = selector.querySelector(".card__duration__previous");
    const current = selector.querySelector(".card__duration__current");
    const previousText =
      "Previous - " + activity.timeframes[selected].previous + "hrs";
    const currentText = activity.timeframes[selected].current + "hrs";

    previous.textContent = previousText;
    current.textContent = currentText;
  });
}
