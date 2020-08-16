const calculatorDisplay = document.querySelector("h1")
const inputBtns = document.querySelectorAll("button")
const clearBtn = document.getElementById("clear-button")

let firstValue = 0
let operatorValue = ""
let awaitingNextValue = false

function sendNumberValue(number) {
    // Replace the current display value if first value is entered 
    if (awaitingNextValue) {
        calculatorDisplay.textContent = number
        awaitingNextValue = false
    } else {
        // If current display value is 0, replace it, if not add number
        const displayValue = calculatorDisplay.textContent
        calculatorDisplay.textContent = displayValue === "0" ? number : displayValue + number
    }
}

function addDecimal() {
    // If operator pressed dont add decimal
    if (awaitingNextValue) {
        return
    }
    // If no decimal add 1 . 
    if (!calculatorDisplay.textContent.includes(".")) {
        calculatorDisplay.textContent = `${calculatorDisplay.textContent}.`
    }
}

// calculate first and second values depending on operator
const calculate = {
    '/': (firstNumber, secondNumber) => firstNumber / secondNumber,
    '*': (firstNumber, secondNumber) => firstNumber * secondNumber,
    '+': (firstNumber, secondNumber) => firstNumber + secondNumber,
    '-': (firstNumber, secondNumber) => firstNumber - secondNumber,
    '=': (firstNumber, secondNumber) => secondNumber,
}

function useOperator(operator) {
    const currentValue = Number(calculatorDisplay.textContent)
    // Prevent multiple operator
    if (operatorValue && awaitingNextValue) {
        operatorValue = operator
        return
    }
    // Assign current value to first value if no value
    if (!firstValue) {
        firstValue = currentValue
    } else {
        console.log(firstValue, operatorValue, currentValue)
        const calculation = calculate[operatorValue](firstValue, currentValue)
        console.log("Result:", calculation)
        firstValue = calculation
        calculatorDisplay.textContent = calculation
    }
    // Ready for next value, store operator
    awaitingNextValue = true
    operatorValue = operator
}

// Add Event Listeners for numbers, operators, decimal buttons
inputBtns.forEach((inputBtn) => {
    if (inputBtn.classList.length === 0) {
        inputBtn.addEventListener("click", () => sendNumberValue(inputBtn.value))
    } else if (inputBtn.classList.contains('operator')) {
        inputBtn.addEventListener("click", () => useOperator(inputBtn.value))
    } else if (inputBtn.classList.contains('decimal')) {
        inputBtn.addEventListener("click", () => addDecimal())
    }
})

// Reset all values , display
function resetAll() {
    firstValue = 0
    operatorValue = ""
    awaitingNextValue = false
    calculatorDisplay.textContent = "0"
}

// Event listener for clear C 
clearBtn.addEventListener("click", resetAll)