const form = document.querySelector("form");
const tel = document.getElementById("tel");
const telError = document.querySelector("#tel + span.error");
const email = document.getElementById('email');
const emailError = document.querySelector('#email + span.error')


tel.addEventListener('focusout', () => {
    if (tel.value.trim() !== '') {
        if (tel.checkValidity() === false) {
            tel.classList.add('invalid-input');
            telError.textContent = '⚠ Please enter a valid phone number';
        } 
    }
})
tel.addEventListener('focusin', () => {
    if (tel.classList.contains('invalid-input')) {
        tel.classList.remove('invalid-input');
    }
    telError.textContent = '';
})


email.addEventListener('focusout', () => {
    if (email.value.trim() !== '') {
        if (email.checkValidity() === false) {
            email.classList.add('invalid-input');
            emailError.textContent = '⚠ Please enter a valid email address';
        }
    }

})
email.addEventListener('focusin', () => {
    if (email.classList.contains('invalid-input')) {
        email.classList.remove('invalid-input');
    }
    emailError.textContent = '';
})

form.addEventListener("submit", (event) => {
  // if the email field is valid, let the form submit
  if (!email.validity.valid ) {
    // If it isn't, we display an appropriate error message
    showError();
    // Then we prevent the form from being sent by canceling the event
    event.preventDefault();
  }
  if (tel.checkValidity() === false) {
    tel.classList.add('invalid-input');
    telError.textContent = '⚠ Please enter a valid phone number';
    event.preventDefault();
}
});

function showError() {
    switch (true) {
      case email.validity.valueMissing:
        // If the field is empty,
        // display the following error message.
        emailError.textContent = "You need to enter an email address.";
        break;
      case email.validity.typeMismatch:
        // If the field doesn't contain an email address,
        // display the following error message.
        emailError.textContent = "Entered value needs to be an email address.";
        break;
      case email.validity.tooShort:
        // If the data is too short,
        // display the following error message.
        emailError.textContent = `Email should be at least ${email.minLength} characters; you entered ${email.value.length}.`;
        break;
        
      default:
        // No errors found
        return;
    }
  
    // Set the styling appropriately
    emailError.className = "error active";
  }
  