const inputContainer = document.getElementById("input-container")
const countdownForm = document.getElementById("countdownForm")
const dateEl = document.getElementById("date-picker")

const countdownEl = document.getElementById("countdown")
const countdownElTitle = document.getElementById("countdown-title")
const countdownBtn = document.getElementById("countdown-button")
const timeElements = document.querySelectorAll("span")

const completeEl = document.getElementById("complete")
const completeInfoEl = document.getElementById("complete-info")
const completeBtn = document.getElementById("complete-button")

let countdownTitle = ""
let countdownDate = ""
let countdownValue = new Date()
let countdownActive
let savedCountdown

const second = 1000
const minute = second * 60
const hour = minute * 60
const day = hour * 24

// We want to set date input minimun with current date
const today = new Date().toISOString().split("T")[0]
dateEl.setAttribute("min", today)

// Populate countdown / Complete UI
function updateDOM() {
    countdownActive = setInterval(() => {
        const now = new Date().getTime()
        const distance = countdownValue - now

        const days = Math.floor(distance / day)
        const hours = Math.floor((distance % day) / hour)
        const minutes = Math.floor((distance % hour) / minute)
        const seconds = Math.floor((distance % minute) / second)

        // Hide the input container 
        inputContainer.hidden = true

        // If countdown is ended show completed
        if (distance < 0) {
            countdownEl.hidden = true
            clearInterval(countdownActive)
            completeInfoEl.textContent = `${countdownTitle} finished on ${countdownDate}`
            completeEl.hidden = false
        } else {
            // Else show countdown in progress
            // Populating the countdown
            countdownElTitle.textContent = `${countdownTitle}`

            timeElements[0].textContent = `${days}`
            timeElements[1].textContent = `${hours}`
            timeElements[2].textContent = `${minutes}`
            timeElements[3].textContent = `${seconds}`
            completeEl.hidden = true
            countdownEl.hidden = false
        }
    }, second)
}

// Take values from form
function updateCountdown(e) {
    e.preventDefault()
    countdownTitle = e.srcElement[0].value
    countdownDate = e.srcElement[1].value
    savedCountdown = {
        title: countdownTitle,
        date: countdownDate
    }
    localStorage.setItem("countdown", JSON.stringify(savedCountdown))
    // Check for valid date
    if (countdownDate === "") {
        alert("Please select a date for countdown.")
    } else {
        // Get the number version of current Date from 1970 midnight to now in milliseconds, updateDOM
        countdownValue = new Date(countdownDate).getTime()
        updateDOM()
    }
}

// Reset all values
function reset() {
    // Hide countdowns and show inputs
    countdownEl.hidden = true
    inputContainer.hidden = false
    // incase after completed , if you want to start with new one
    completeEl.hidden = true
    // Stop the countdown
    clearInterval(countdownActive)
    // Reset the values for countdown for title
    countdownTitle = ""
    countdownDate = ""
    localStorage.removeItem("countdown")
}

function restorePreviousCountDown() {
    // Get countdown from localstorage if available
    if (localStorage.getItem("countdown")) {
        inputContainer.hidden = true
        savedCountdown = JSON.parse(localStorage.getItem("countdown"))
        countdownTitle = savedCountdown.title
        countdownDate = savedCountdown.date
        countdownValue = new Date(countdownDate).getTime()
        updateDOM()
    }
}

// Event listener 
countdownForm.addEventListener("submit", updateCountdown)
// Event Listener for reset
countdownBtn.addEventListener("click", reset)
// Event Listener for complete at the end
completeBtn.addEventListener("click", reset)

// onLoad
restorePreviousCountDown()