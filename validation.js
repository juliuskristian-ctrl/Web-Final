
function displayError(elementId, message) {
   
    const errorElement = document.getElementById(elementId);
 
    const inputElement = document.getElementById(elementId.replace('Error', ''));
    
    errorElement.textContent = message;

    if (message) {
        inputElement.classList.add('input-error');
    } else {
        inputElement.classList.remove('input-error');
    }
}

function validateForm(event) {
    event.preventDefault(); 
    
    let isValid = true; 


    const firstName = document.getElementById('firstName').value.trim();
    const lastName = document.getElementById('lastName').value.trim();
    const nim = document.getElementById('nim').value;
    const phone = document.getElementById('phone').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;


    if (firstName.length === 0 || firstName.length > 40) {
        displayError('firstNameError', 'Nama Depan wajib diisi (Max 40 karakter).');
        isValid = false;
    } else {
        displayError('firstNameError', '');
    }

    if (lastName.length === 0 || lastName.length > 40) {
        displayError('lastNameError', 'Nama Belakang wajib diisi (Max 40 karakter).');
        isValid = false;
    } else {
        displayError('lastNameError', '');
    }


    const nimRegex = /^\d{1,7}$/;
    if (!nimRegex.test(nim)) {
        displayError('nimError', 'NIM harus berupa angka dan maksimal 7 digit.');
        isValid = false;
    } else {
        displayError('nimError', '');
    }

    const phoneRegex = /^\d{1,15}$/;
    if (!phoneRegex.test(phone)) {
        displayError('phoneError', 'Nomor Telepon harus berupa angka dan maksimal 15 digit.');
        isValid = false;
    } else {
        displayError('phoneError', '');
    }

    const emailRegex = /^[a-zA-Z0-9._%+-]+@unai\.edu$/;
    if (!emailRegex.test(email)) {
        displayError('emailError', 'Format email tidak valid atau domain harus @unai.edu.');
        isValid = false;
    } else {
        displayError('emailError', '');
    }

 
    
    const lengthValid = password.length >= 8 && password.length <= 16;
    const hasUpperCase = /[A-Z]/.test(password);
    const hasLowerCase = /[a-z]/.test(password);
    const hasNumber = /[0-9]/.test(password);
    const noSymbols = /^[a-zA-Z0-9]+$/.test(password); 
    
    let passwordErrorMessage = '';

    if (!lengthValid) {
        passwordErrorMessage = 'Password harus antara 8 sampai 16 karakter.';
    } else if (!noSymbols) {
        passwordErrorMessage = 'Password tidak boleh mengandung simbol.';
    } else if (!hasUpperCase) {
        passwordErrorMessage = 'Password harus mengandung minimal 1 huruf kapital.';
    } else if (!hasLowerCase) {
        passwordErrorMessage = 'Password harus mengandung minimal 1 huruf kecil.';
    } else if (!hasNumber) {
        passwordErrorMessage = 'Password harus mengandung minimal 1 angka.';
    }

    if (passwordErrorMessage) {
        displayError('passwordError', passwordErrorMessage);
        isValid = false;
    } else {
        displayError('passwordError', '');
    }
    

    if (isValid) {

        alert("Registration Successful");
        

        document.getElementById('registrationForm').reset();
    }

    return false; 
}