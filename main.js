let currentInput = '0';
let previousInput = '';
let operator = null;

const currentDisplay = document.getElementById('current-operand');
const previousDisplay = document.getElementById('previous-operand');

function updateDisplay() {
    currentDisplay.innerText = currentInput;
    previousDisplay.innerText = previousInput;
}

// أرقام
function appendNumber(number) {
    if (currentInput === '0' && number !== '.') currentInput = number;
    else currentInput += number;
    updateDisplay();
}

// العمليات التي تحتاج رقمين (مثل الأس و exp)
function appendOperator(op) {
    if (currentInput === '') return;
    if (previousInput !== '') calculate(); // حساب أي عملية سابقة أولاً
    
    operator = op;
    previousInput = `${currentInput} ${op === 'exp' ? '.e+' : (op === 'pow' ? '^' : op)}`;
    currentInput = '0';
    updateDisplay();
}

// العمليات الفورية (رقم واحد فقط)
function appendFunction(func) {
    let val = parseFloat(currentInput);
    if (isNaN(val)) return;

    switch(func) {
        case 'fact': val = factorial(val); break;
        case 'ln': val = Math.log(val); break;
        case '10pow': val = Math.pow(10, val); break;
        case 'square': val = Math.pow(val, 2); break;
        case 'sqrt': val = Math.sqrt(val); break;
        case 'negate': val = val * -1; break;
    }
    currentInput = val.toString();
    updateDisplay();
}

// دالة الحساب الرئيسية (عند الضغط على =)
function calculate() {
    let result;
    const prev = parseFloat(previousInput);
    const current = parseFloat(currentInput);

    if (isNaN(prev) || isNaN(current)) return;

    switch (operator) {
        case '+': result = prev + current; break;
        case '-': result = prev - current; break;
        case '*': result = prev * current; break;
        case '/': result = prev / current; break;
        case 'mod': result = prev % current; break;
        case 'pow': result = Math.pow(prev, current); break; // x^y
        case 'exp': result = prev * Math.pow(10, current); break; // x * 10^y
        default: return;
    }

    currentInput = result.toString();
    operator = null;
    previousInput = '';
    updateDisplay();
}

// دالة العاملي
function factorial(n) {
    if (n < 0) return "Error";
    if (n === 0) return 1;
    let res = 1;
    for (let i = 2; i <= n; i++) res *= i;
    return res;
}

// مسح الشاشة
function clearDisplay() {
    currentInput = '0';
    previousInput = '';
    operator = null;
    updateDisplay();
}

// دالة الثوابت الرياضية
function appendConstant(constant) {
    if (constant === 'pi') {
        currentInput = Math.PI.toString(); // قيمة ط (3.14159...)
    } else if (constant === 'e') {
        currentInput = Math.E.toString();  // قيمة الثابت النيبري (2.71828...)
    }
    updateDisplay();
}

// تعديل دالة الأرقام لتسهيل استبدال الصفر عند إدخال ثابت
function appendNumber(number) {
    if (currentInput === '0' || currentInput === Math.PI.toString() || currentInput === Math.E.toString()) {
        currentInput = number;
    } else {
        currentInput += number;
    }
    updateDisplay();
}
