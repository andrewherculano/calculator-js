const display = document.getElementById("display");
const numbers = document.querySelectorAll("[id *= key]");
const operators = document.querySelectorAll("[id *= op]");

let newNumber = true;
let operator;
let previousNumber;

const pendingOperation = () => operator != undefined;

const calculate = () => {
  if (pendingOperation()) {
    newNumber = true;
    const currentNumber = parseFloat(display.textContent.replace(",", "."));
    if (operator == "+") {
      updateDisplay(previousNumber + currentNumber);
    } else if (operator == "-") {
      updateDisplay(previousNumber - currentNumber);
    } else if (operator == "*") {
      updateDisplay(previousNumber * currentNumber);
    } else if (operator == "/") {
      updateDisplay(previousNumber / currentNumber);
    }
  }
};

const updateDisplay = (text) => {
  if (newNumber) {
    display.textContent = text.toLocaleString("BR");
    newNumber = false;
  } else {
    display.textContent += text.toLocaleString("BR");
  }
};

const insertNumber = (event) => updateDisplay(event.target.textContent);
numbers.forEach((number) => number.addEventListener("click", insertNumber));

const selectOperator = (event) => {
  if (!newNumber) {
    calculate();
    newNumber = true;
    operator = event.target.textContent;
    previousNumber = parseFloat(display.textContent.replace(",", "."));
  }
};
operators.forEach((operator) => {
  operator.addEventListener("click", selectOperator);
});

const equalKey = () => {
  calculate();
  operator = undefined;
};
document.getElementById("equal").addEventListener("click", equalKey);

const clearDisplay = () => {
  display.textContent = "";
};
document
  .getElementById("clean-display")
  .addEventListener("click", clearDisplay);

const cleanCalculation = () => {
  clearDisplay();
  operator = undefined;
  newNumber = true;
  previousNumber = undefined;
};
document
  .getElementById("clean-calc")
  .addEventListener("click", cleanCalculation);

const backspaceNumber = () => {
  display.textContent = display.textContent.slice(0, -1);
};
document.getElementById("backspace").addEventListener("click", backspaceNumber);

const reverseNumber = () => {
  newNumber = true;
  updateDisplay(display.textContent * -1);
};
document.getElementById("reverse").addEventListener("click", reverseNumber);

const existFloat = () => display.textContent.indexOf(",") != -1;
const existNumber = () => display.textContent.length > 0;

const addFloatNumber = () => {
  if (!existFloat()) {
    if (existNumber()) {
      updateDisplay(",");
    } else {
      updateDisplay("0,");
    }
  }
};
document.getElementById("float").addEventListener("click", addFloatNumber);

//keyboard
const mapKey = {
  0: "key0",
  1: "key1",
  2: "key2",
  3: "key3",
  4: "key4",
  5: "key5",
  6: "key6",
  7: "key7",
  8: "key8",
  9: "key9",
  ",": "float",
  Enter: "equal",
  "=": "equal",
  "+": "op-add",
  "-": "op-subtract",
  "*": "op-multi",
  "/": "op-division",
  ".": "float",
};

const mapKeyBoard = (event) => {
  const key = event.key;
  const allowedKey = () => Object.keys(mapKey).indexOf(key) != -1;

  if (allowedKey()) {
    document.getElementById(mapKey[key]).click();
  }
};
document.addEventListener("keydown", mapKeyBoard);
