import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

const datePicker = document.getElementById("datetime-picker");
const startButton = document.querySelector("[data-start]");
const daysValue = document.querySelector("[data-days]");
const hoursValue = document.querySelector("[data-hours]");
const minutesValue = document.querySelector("[data-minutes]");
const secondsValue = document.querySelector("[data-seconds]");

let userSelectedDate = null;
let timerInterval = null;

const options = {
    enableTime: true,
    time_24hr: true,
    defaultDate: new Date(),
    minuteIncrement: 1,
    onClose(selectedDates) {
        const selectedDate = selectedDates[0];
        if (selectedDate <= new Date()) {
            iziToast.error({
                title: "Error",
                message: "Please choose a date in the future",
                position: "topRight"
            });
            startButton.disabled = true;
        } else {
            userSelectedDate = selectedDate;
            startButton.disabled = false;
        }
    },
};

flatpickr(datePicker, options);

startButton.addEventListener("click", () => {
    if (!userSelectedDate) return;

    startButton.disabled = true;
    datePicker.disabled = true;

    timerInterval = setInterval(() => {
        const now = new Date();
        const remainingTime = userSelectedDate - now;

        if (remainingTime <= 0) {
            clearInterval(timerInterval);
            updateTimerDisplay(0, 0, 0, 0);
            iziToast.success({
                title: "Time's up!",
                message: "The countdown has ended.",
                position: "topRight"
            });
            datePicker.disabled = false;
            return;
        }

        const { days, hours, minutes, seconds } = convertMs(remainingTime);
        updateTimerDisplay(days, hours, minutes, seconds);
    }, 1000);
});

function convertMs(ms) {
    const second = 1000;
    const minute = second * 60;
    const hour = minute * 60;
    const day = hour * 24;

    const days = Math.floor(ms / day);
    const hours = Math.floor((ms % day) / hour);
    const minutes = Math.floor(((ms % day) % hour) / minute);
    const seconds = Math.floor((((ms % day) % hour) % minute) / second);

    return { days, hours, minutes, seconds };
}

function addLeadingZero(value) {
    return String(value).padStart(2, "0");
}

function updateTimerDisplay(days, hours, minutes, seconds) {
    daysValue.textContent = addLeadingZero(days);
    hoursValue.textContent = addLeadingZero(hours);
    minutesValue.textContent = addLeadingZero(minutes);
    secondsValue.textContent = addLeadingZero(seconds);
}
