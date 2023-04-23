const form = document.querySelector("form");
const tel = document.getElementById("tel");
const telError = document.querySelector("#tel + span.error");
const email = document.getElementById('email');
const emailError = document.querySelector('#email + span.error');
const password = document.getElementById('pwd');
const confirmPassword = document.getElementById('confirmpwd');
const confirmPasswordError =document.querySelector('#confirmpwd + span.error')
const toggleBtn = document.getElementById('toggleBtn');
const validation = document.getElementById('validation');

let lowerCase = document.getElementById('lower');
let upperCase = document.getElementById('upper');
let digit = document.getElementById('number');
let specialChar = document.getElementById('special');
let minLength = document.getElementById('length');

function checkPassword(data) {
  const lower = new RegExp('(?=.*[a-z])');
  const upper = new RegExp('(?=.*[A-Z])');
  const number = new RegExp('(?=.*[0-9])');
  const special = new RegExp('(?=.*[!@#\$%\^&\*])');
  const length = new RegExp('(?=.{8,})');  
  
  if(lower.test(data)) {
    lowerCase.classList.add('valid');
  } else {
    lowerCase.classList.remove('valid');
  }
  if(upper.test(data)) {
    upperCase.classList.add('valid');
  } else {
    upperCase.classList.remove('valid');
  }
  if(number.test(data)) {
    digit.classList.add('valid');
  } else {
    digit.classList.remove('valid');
  }
  if(special.test(data)) {
    specialChar.classList.add('valid');
  } else {
    specialChar.classList.remove('valid');
  }
  if(length.test(data)) {
    minLength.classList.add('valid');
  } else {
    minLength.classList.remove('valid');
  }
}

toggleBtn.onclick =  function() {
  if (password.type === 'password') {
    password.setAttribute('type', 'text');
    confirmPassword.setAttribute('type', 'text');
    toggleBtn.classList.add('hide');
  } else {
    password.setAttribute('type', 'password');
    confirmPassword.setAttribute('type', 'password');
    toggleBtn.classList.remove('hide');
  }
}




password.addEventListener('focusin', () => {
 validation.style.display = 'block';
});
password.addEventListener('focusout', () => {
  validation.style.display = 'none';
 });

 confirmPassword.addEventListener('focusout', () => {
  if (confirmPassword.value.trim() !== '') {
    if (confirmPassword.value !== password.value) {
      confirmPassword.classList.add('invalid-input');
      confirmPasswordError.textContent = '⚠ Password mismatch';
    }}
});
confirmPassword.addEventListener('focusin', () => {
  if (confirmPassword.classList.contains('invalid-input')) {
    confirmPassword.classList.remove('invalid-input');
  }
});

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
  