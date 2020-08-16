const form = document.getElementById("form")
const password1El = document.getElementById("password1")
const password2El = document.getElementById("password2")
const messageContainer = document.querySelector(".message-container")
const message = document.getElementById("message")

// By Default we dont have a valid form
let isValid = false
let passwordsMatch = false

function validateForm() {
    // Using Constraint API
    isValid = form.checkValidity()
    // .checkValidity method here doesnt actually runs if u enter wrong format of data or empty data
    // .checkValidy runs only if its true *only if values in form are of correct format* OR it will ALWAYS ALWAYS run 
    // when u add novalidate attribute in <form>
    if (!isValid) {
        // Style main message for error
        message.textContent = 'Please fill out all fields.'
        message.style.color = "red"
        messageContainer.style.borderColor = "red"
        return
    }
    // Check to see if passwords match
    if (password1El.value === password2El.value) {
        passwordsMatch = true
        password1El.style.borderColor = "green"
        password2El.style.borderColor = "green"
    } else {
        passwordsMatch = false
        message.textContent = "Make sure the password match."
        message.style.color = "red"
        messageContainer.style.borderColor = "red"
        password1El.style.borderColor = "red"
        password2El.style.borderColor = "red"
        return
    }

    // If form is valid and passwords do match
    if (isValid && passwordsMatch) {
        messageContainer.style.borderColor = "green"
        message.style.color = "green"
        message.textContent = "Successfully Registered!"
    }
}

function storeFormData() {
    const user = {
        name: form.name.value,
        phone: form.phone.value,
        email: form.email.value,
        website: form.website.value,
        password: form.password.value
    }
    // Do something with user data
    console.log(user)
}

function processFormData(e) {
    e.preventDefault()
    // Validate Form
    validateForm()
    // Submit Data if valid
    if (isValid && passwordsMatch) {
        storeFormData()
    }
}


// Event Listeners
form.addEventListener("submit", processFormData)