const buttons = document.querySelectorAll("button");
const operation = document.querySelector("#operation");

let operations = ["+", "-", "x", "/"];
let numbers = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "0", "."]
let input1 = "";
let input2 = "";
let operator = "";
let operatorInput = "";

buttons.forEach(button => button.addEventListener("click", () => showInput(button)));

//function that adds the value of the clicked button to the screen and takes
//those values as parametres for the operation functions
function showInput(x){
    if (numbers.includes(x.value)){
        if(!operatorInput){
            let insideText = document.createElement("span");
            if(operation.textContent.length < 12){
                insideText.textContent = x.value;
            }
            operation.appendChild(insideText);
        }else{
            operation.textContent = "";
            operator = operatorInput;
            operatorInput = "";
            let insideText = document.createElement("span");
            if(operation.textContent.length < 12){
                insideText.textContent = x.value;
            }
            operation.appendChild(insideText);
        }
    }

    if (operations.includes(x.value)){
        x.focus();
        if(!operator){
            input1 = operation.textContent;
            operatorInput = x.value;
            if (!input1){
                operatorInput = "";
            }
        }else{
            calculate();
            operatorInput = x.value;
        }
    }

    if (input1){
        input2 = operation.textContent;
    }  
}

//main operation functions that store the result to a variable
let result;
function add(a, b){
    result = a + b;
}

function subtract(a, b){
    result = a - b;
}

function multiply(a, b){
    result = a * b;
}

function divide(a, b){
    result = a / b;
    if (a === 0 || b === 0){
        alert("ERROR! Can't divide by 0");
        result = input1;
    }
}

//function that will choose the operation based on the the selected sign
function operate (x, a, b){
    if(x === "+"){
        add(a, b)
    }else if(x === "-"){
        subtract(a, b)
    }else if(x === "x"){
        multiply(a, b)
    }else if(x === "/"){
        divide(a, b)
    }
}

//function that is run when the "=" sign is clicked
const equal = document.querySelector("#equal");
equal.addEventListener("click", calculate);

function calculate(){
    if(input1 && input2 && operator){
    x = operator;
    a = Number(input1);
    b = Number(input2);

    operate(x, a, b);
    
    checkDecimals(result);
    operation.textContent = result;

    input1 = operation.textContent;
    input2 = "";
    operator = "";
    }
}

//function that rounds up the number to the last 4
//decimals if the number has more than 4 decimals
function checkDecimals(x){
    let xArr = x.toString().split(".");
    
    if (xArr[1] && xArr[1].length > 4){
        result = x.toFixed(4);
    }
}

//function that clears everything when C button is clicked
let allClearBtn = document.querySelector("#clearAll");
allClearBtn.addEventListener("click", clearAll);

function clearAll() {
    input1 = "";
    input2 = "";
    operator = "";
    operation.textContent = "";
}

//function that clear the last character the user typed
let clearBtn = document.querySelector("#clear");
clearBtn.addEventListener("click", clear);

function clear(){
    operation.textContent = operation.textContent.slice(0, -1);
}

//function that adds a "-" or removes it when clicked
//depending on whether the current number has "-" or not
let signBtn = document.querySelector("#sign");
signBtn.addEventListener("click", changeSign);

function changeSign(){
    if (Number(operation.textContent) > 0){
        operation.textContent = "-" + operation.textContent;
    }else if(Number(operation.textContent) < 0){
        let arr = operation.textContent.split("");
        arr.shift();
        operation.textContent = arr.join("")
    }
}

//function that adds a point to the operation when "."
//button is clicked, if the operation doesn't already
//have a point
let pointBtn = document.querySelector("#point");
pointBtn.addEventListener("click", addPoint);

function addPoint(){
    if (!operation.textContent.includes(".")){
       if(operation.textContent){
            let insideText = document.createElement("span");
            insideText.textContent = ".";
            operation.appendChild(insideText);
       }else{
           operation.textContent = "0."
       }
    }
}