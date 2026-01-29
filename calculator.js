// Variables to store calculator state
let currentOperand = '0';
let previousOperand = '';
let operation = null;

// Get display elements
const currentOperandDisplay = document.getElementById('current-operand');
const previousOperandDisplay = document.getElementById('previous-operand');

// Function to update the display
function updateDisplay() {
    currentOperandDisplay.textContent = currentOperand;
    
    if (operation != null) {
        previousOperandDisplay.textContent = `${previousOperand} ${operation}`;
    } else {
        previousOperandDisplay.textContent = previousOperand;
    }
}

// Function to append numbers
function appendNumber(number) {
    // If current operand is '0', replace it
    if (currentOperand === '0') {
        currentOperand = number;
    } else {
        currentOperand = currentOperand + number;
    }
    updateDisplay();
}

// Function to append decimal point
function appendDecimal() {
    // Only add decimal if there isn't one already
    if (!currentOperand.includes('.')) {
        currentOperand = currentOperand + '.';
    }
    updateDisplay();
}

// Function to append operators
function appendOperator(op) {
    // If there's already an operation, calculate first
    if (operation != null) {
        calculate();
    }
    
    operation = op;
    previousOperand = currentOperand;
    currentOperand = '0';
    updateDisplay();
}

// Function to clear display
function clearDisplay() {
    currentOperand = '0';
    previousOperand = '';
    operation = null;
    updateDisplay();
}

// Function to delete last character
function deleteLast() {
    if (currentOperand.length === 1) {
        currentOperand = '0';
    } else {
        currentOperand = currentOperand.slice(0, -1);
    }
    updateDisplay();
}

// Function to perform calculation
function calculate() {
    let result;
    const prev = parseFloat(previousOperand);
    const current = parseFloat(currentOperand);
    
    // Check if numbers are valid
    if (isNaN(prev) || isNaN(current)) {
        return;
    }
    
    // Perform calculation based on operation
    switch (operation) {
        case '+':
            result = prev + current;
            break;
        case '-':
            result = prev - current;
            break;
        case '*':
            result = prev * current;
            break;
        case '/':
            if (current === 0) {
                alert('Cannot divide by zero!');
                clearDisplay();
                return;
            }
            result = prev / current;
            break;
        default:
            return;
    }
    
    // Round to avoid floating point errors
    result = Math.round(result * 100000000) / 100000000;
    
    currentOperand = result.toString();
    operation = null;
    previousOperand = '';
    updateDisplay();
}

// Scientific Functions

// Function to calculate square root
function calculateSquareRoot() {
    const number = parseFloat(currentOperand);
    
    if (isNaN(number)) {
        alert('Invalid input!');
        return;
    }
    
    if (number < 0) {
        alert('Cannot calculate square root of negative number!');
        return;
    }
    
    const result = Math.sqrt(number);
    currentOperand = result.toString();
    previousOperand = `√${number}`;
    updateDisplay();
}

// Function to calculate power (square)
function calculatePower() {
    const number = parseFloat(currentOperand);
    
    if (isNaN(number)) {
        alert('Invalid input!');
        return;
    }
    
    const result = Math.pow(number, 2);
    previousOperand = `${number}²`;
    currentOperand = result.toString();
    updateDisplay();
}

// Function to calculate sine (in radians)
function calculateSin() {
    const number = parseFloat(currentOperand);
    
    if (isNaN(number)) {
        alert('Invalid input!');
        return;
    }
    
    const result = Math.sin(number);
    previousOperand = `sin(${number})`;
    currentOperand = result.toFixed(8).toString();
    updateDisplay();
}

// Function to calculate cosine (in radians)
function calculateCos() {
    const number = parseFloat(currentOperand);
    
    if (isNaN(number)) {
        alert('Invalid input!');
        return;
    }
    
    const result = Math.cos(number);
    previousOperand = `cos(${number})`;
    currentOperand = result.toFixed(8).toString();
    updateDisplay();
}

// Function to calculate tangent (in radians)
function calculateTan() {
    const number = parseFloat(currentOperand);
    
    if (isNaN(number)) {
        alert('Invalid input!');
        return;
    }
    
    const result = Math.tan(number);
    previousOperand = `tan(${number})`;
    currentOperand = result.toFixed(8).toString();
    updateDisplay();
}

// Function to calculate logarithm (base 10)
function calculateLog() {
    const number = parseFloat(currentOperand);
    
    if (isNaN(number)) {
        alert('Invalid input!');
        return;
    }
    
    if (number <= 0) {
        alert('Cannot calculate log of zero or negative number!');
        return;
    }
    
    const result = Math.log10(number);
    previousOperand = `log(${number})`;
    currentOperand = result.toString();
    updateDisplay();
}

// Keyboard support
document.addEventListener('keydown', function(event) {
    // Numbers
    if (event.key >= '0' && event.key <= '9') {
        appendNumber(event.key);
    }
    
    // Operators
    if (event.key === '+') appendOperator('+');
    if (event.key === '-') appendOperator('-');
    if (event.key === '*') appendOperator('*');
    if (event.key === '/') {
        event.preventDefault(); // Prevent browser search
        appendOperator('/');
    }
    
    // Decimal point
    if (event.key === '.' || event.key === ',') {
        appendDecimal();
    }
    
    // Calculate
    if (event.key === 'Enter' || event.key === '=') {
        event.preventDefault();
        calculate();
    }
    
    // Clear
    if (event.key === 'Escape' || event.key === 'c' || event.key === 'C') {
        clearDisplay();
    }
    
    // Delete
    if (event.key === 'Backspace') {
        event.preventDefault();
        deleteLast();
    }
});

// Initialize display on page load
updateDisplay();
