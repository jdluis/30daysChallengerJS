const dataTime = document.querySelectorAll("[data-time]");
const timerDisplay = document.querySelector(".display__time-left");
const endTime = document.querySelector(".display__end-time");
const custom = document.querySelector("#custom");

let countdown;

function timer(seconds) {
  clearInterval(countdown);
  const now = Date.now();
  const then = now + seconds * 1000;
  displayTimeLeft(seconds);
  displayEndTime(then);

  countdown = setInterval(() => {
    const secondsLeft = Math.round((then - Date.now()) / 1000);
    if (secondsLeft < 0) {
      clearInterval(countdown);
      return;
    }

    displayTimeLeft(secondsLeft);
  }, 1000);
}

function displayTimeLeft(seconds) {
  const minutes = Math.floor(seconds / 60);
  const remainderSeconds = seconds % 60;
  let timeLeft = { minutes, remainderSeconds };
  const display = `${timeLeft.minutes}:${
    timeLeft.remainderSeconds < 10 ? "0" : ""
  }${remainderSeconds}`;
  document.title = display;
  timerDisplay.textContent = display;
}

function displayEndTime(timestamp) {
  const end = new Date(timestamp);
  const hour = end.getHours();
  const minutes = end.getMinutes();
  return (endTime.textContent = `Be Back At ${hour}:${
    minutes < 10 ? "0" : ""
  }${minutes}`);
}

function startTimer() {
  const seconds = parseInt(this.dataset.time);
  timer(seconds);
}

dataTime.forEach((button) => button.addEventListener("click", startTimer));
custom.addEventListener('submit', (e) => {
    e.preventDefault();
    const mins = e.target.minutes.value;
    timer(mins * 60);
    this.reset();
})