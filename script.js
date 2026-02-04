let currentOperand = '0';
let previousOperand = '';
let operation = null;

const currentOperandDisplay = document.getElementById('current-operand');
const previousOperandDisplay = document.getElementById('previous-operand');

function updateDisplay() {
    currentOperandDisplay.textContent = currentOperand;
    
    if (operation != null) {
        previousOperandDisplay.textContent = `${previousOperand} ${operation}`;
    } else {
        previousOperandDisplay.textContent = previousOperand;
    }
}

function appendNumber(number) {
    if (currentOperand === '0') {
        currentOperand = number;
    } else {
        currentOperand = currentOperand + number;
    }
    updateDisplay();
}

function appendDecimal() {
    if (!currentOperand.includes('.')) {
        currentOperand = currentOperand + '.';
    }
    updateDisplay();
}

function appendOperator(op) {
    if (operation != null) {
        calculate();
    }
    
    operation = op;
    previousOperand = currentOperand;
    currentOperand = '0';
    updateDisplay();
}

function clearDisplay() {
    currentOperand = '0';
    previousOperand = '';
    operation = null;
    updateDisplay();
}

function deleteLast() {
    if (currentOperand.length === 1) {
        currentOperand = '0';
    } else {
        currentOperand = currentOperand.slice(0, -1);
    }
    updateDisplay();
}

function calculate() {
    let result;
    const prev = parseFloat(previousOperand);
    const current = parseFloat(currentOperand);
    
    if (isNaN(prev) || isNaN(current)) {
        return;
    }
    
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
    
    result = Math.round(result * 100000000) / 100000000;
    
    currentOperand = result.toString();
    operation = null;
    previousOperand = '';
    updateDisplay();
}

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

document.addEventListener('keydown', function(event) {
    if (event.key >= '0' && event.key <= '9') {
        appendNumber(event.key);
    }
    
    if (event.key === '+') appendOperator('+');
    if (event.key === '-') appendOperator('-');
    if (event.key === '*') appendOperator('*');
    if (event.key === '/') {
        event.preventDefault();
        appendOperator('/');
    }
    
    if (event.key === '.' || event.key === ',') {
        appendDecimal();
    }
    
    if (event.key === 'Enter' || event.key === '=') {
        event.preventDefault();
        calculate();
    }
    
    if (event.key === 'Escape' || event.key === 'c' || event.key === 'C') {
        clearDisplay();
    }
    
    if (event.key === 'Backspace') {
        event.preventDefault();
        deleteLast();
    }
});

updateDisplay();
