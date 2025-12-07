/**
 * validation.js
 * Fungsionalitas validasi form pendaftaran untuk registration.html
 * Memenuhi semua kriteria validasi yang diminta menggunakan JavaScript DOM.
 */

// Fungsi untuk menampilkan pesan error dan menyesuaikan tampilan input
function displayError(elementId, message) {
    // ID element error adalah [inputID]Error
    const errorElement = document.getElementById(elementId);
    // ID element input adalah [inputID]
    const inputElement = document.getElementById(elementId.replace('Error', ''));
    
    errorElement.textContent = message;
    
    // Sesuaikan kelas Tailwind untuk border error
    if (message) {
        inputElement.classList.add('input-error');
    } else {
        inputElement.classList.remove('input-error');
    }
}

// Fungsi utama validasi form
function validateForm(event) {
    event.preventDefault(); // Mencegah form submit default HTML
    
    let isValid = true; // Flag utama validasi

    // --- Ambil nilai input ---
    const firstName = document.getElementById('firstName').value.trim();
    const lastName = document.getElementById('lastName').value.trim();
    const nim = document.getElementById('nim').value;
    const phone = document.getElementById('phone').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    // --- 1. Validasi Nama Depan & Belakang (Text, Max 40 Karakter) ---
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

    // --- 2. Validasi NIM (Numeric, Max 7 Digit) ---
    // Regex: ^\d{1,7}$ -> Harus angka (\d), panjang min 1, max 7
    const nimRegex = /^\d{1,7}$/;
    if (!nimRegex.test(nim)) {
        displayError('nimError', 'NIM harus berupa angka dan maksimal 7 digit.');
        isValid = false;
    } else {
        displayError('nimError', '');
    }

    // --- 3. Validasi Phone Number (Numeric, Max 15 Digit) ---
    // Regex: ^\d{1,15}$ -> Harus angka, panjang min 1, max 15
    const phoneRegex = /^\d{1,15}$/;
    if (!phoneRegex.test(phone)) {
        displayError('phoneError', 'Nomor Telepon harus berupa angka dan maksimal 15 digit.');
        isValid = false;
    } else {
        displayError('phoneError', '');
    }

    // --- 4. Validasi Email (Format Valid & Harus @unai.edu) ---
    // Regex: Pola dasar email + diakhiri @unai.edu
    // ([a-zA-Z0-9._%+-]+) memastikan adanya huruf/angka/karakter lain sebelum @
    const emailRegex = /^[a-zA-Z0-9._%+-]+@unai\.edu$/;
    if (!emailRegex.test(email)) {
        displayError('emailError', 'Format email tidak valid atau domain harus @unai.edu.');
        isValid = false;
    } else {
        displayError('emailError', '');
    }

    // --- 5. Validasi Password ---
    // Persyaratan: Min 8, Max 16, 1 Uppercase, 1 Lowercase, 1 Number, NO symbols (hanya huruf/angka)
    
    const lengthValid = password.length >= 8 && password.length <= 16;
    const hasUpperCase = /[A-Z]/.test(password);
    const hasLowerCase = /[a-z]/.test(password);
    const hasNumber = /[0-9]/.test(password);
    // Regex: ^[a-zA-Z0-9]+$ -> Hanya boleh mengandung huruf (a-z, A-Z) dan angka (0-9)
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
    
    // --- Finalisasi Submit ---
    if (isValid) {
        // Tampilkan alert jika SEMUA validasi berhasil
        alert("Registration Successful");
        
        // Reset form (bersihkan semua input)
        document.getElementById('registrationForm').reset();
    }

    return false; // Menghentikan pengiriman formulir HTML
}