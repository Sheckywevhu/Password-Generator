// DOM Elements
const passwordEl = document.getElementById('password');
const lengthEl = document.getElementById('length');
const uppercaseEl = document.getElementById('uppercase');
const lowercaseEl = document.getElementById('lowercase');
const numbersEl = document.getElementById('numbers');
const symbolsEl = document.getElementById('symbols');
const generateEl = document.getElementById('generate');
const copyEl = document.getElementById('copy');

// Character sets
const UPPERCASE_CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
const LOWERCASE_CHARS = 'abcdefghijklmnopqrstuvwxyz';
const NUMBER_CHARS = '0123456789';
const SYMBOL_CHARS = '!@#$%^&*()_+-=[]{}|;:,.<>?';

// Generate password function
function generatePassword() {
    let chars = '';
    let password = '';
    
    // Add character sets based on user selection
    if (uppercaseEl.checked) chars += UPPERCASE_CHARS;
    if (lowercaseEl.checked) chars += LOWERCASE_CHARS;
    if (numbersEl.checked) chars += NUMBER_CHARS;
    if (symbolsEl.checked) chars += SYMBOL_CHARS;
    
    // Validate at least one character set is selected
    if (chars === '') {
        alert('Please select at least one character type');
        return;
    }
    
    // Get password length
    const length = +lengthEl.value;
    
    // Validate password length
    if (length < 4 || length > 50) {
        alert('Password length must be between 4 and 50 characters');
        return;
    }
    
    // Generate password
    for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * chars.length);
        password += chars[randomIndex];
    }
    
    // Ensure password contains at least one character from each selected set
    if (uppercaseEl.checked && !containsCharFrom(password, UPPERCASE_CHARS)) return generatePassword();
    if (lowercaseEl.checked && !containsCharFrom(password, LOWERCASE_CHARS)) return generatePassword();
    if (numbersEl.checked && !containsCharFrom(password, NUMBER_CHARS)) return generatePassword();
    if (symbolsEl.checked && !containsCharFrom(password, SYMBOL_CHARS)) return generatePassword();
    
    // Display password
    passwordEl.value = password;
}

// Helper function to check if password contains characters from a set
function containsCharFrom(str, charSet) {
    return [...str].some(char => charSet.includes(char));
}

// Copy password to clipboard
function copyToClipboard() {
    if (!passwordEl.value) return;
    
    // Select and copy password
    passwordEl.select();
    document.execCommand('copy');
    
    // Show tooltip
    const tooltip = copyEl.querySelector('.tooltip');
    tooltip.style.display = 'block';
    
    // Hide tooltip after 2 seconds
    setTimeout(() => {
        tooltip.style.display = 'none';
    }, 2000);
}

// Event listeners
generateEl.addEventListener('click', generatePassword);
copyEl.addEventListener('click', copyToClipboard);

// Generate initial password
generatePassword(); 