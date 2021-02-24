 window.addEventListener('keyup', e =>{ 
    if (e.key >= 0 && e.key <= 9 || e.key == '.'){
        writeNumber(e.key)
    }
    if (e.key == '/' || e.key == '*' || e.key == '-' || e.key == '+' ){
        getMathOperation(e.key, e.key)
    }
    if (e.key == 'Enter'){
        runOperation('equals')
    }
    if (e.key == 'Backspace'){
       deleteNumber()
    }
    if (e.key == 'Delete'){
        runOperation('clear')
    }
})

const display = document.getElementById('display')
const keypad = document.getElementById('keypad')
const history = document.getElementById('history')

display.textContent = '0'

let num1, num2, result, typeOperation
let operationStatus = false

keypad.addEventListener('click', e => {
   const button = e.target
   const buttonClass = button.className 
   const buttonId = button.id         

   if (buttonId === 'backspace'){
       deleteNumber()
   }
   if (buttonClass === 'buttonNum') {
       writeNumber(button.textContent)        
   }
   if ( buttonClass === 'buttonMath'){
       getMathOperation(button.textContent, button.textContent)
   }
   if (buttonClass === 'buttonOperation') {
       runOperation(buttonId)
   }
})

function writeNumber(num) { 
   if (display.textContent === '0' || operationStatus === true){
       if (num === '.'){
           display.textContent += num
       } else {
           display.textContent = num
       }
   }else {
       if (num === '.' && !display.textContent.includes('.')){
           display.textContent += num
       }else if ( num !== '.'){
           display.textContent += num
       }
   }
   operationStatus = false
}

function getMathOperation(opBtn, operation) {
   operationStatus = true
   num1 = Number(display.textContent)
   typeOperation = operation
   display.textContent = opBtn
} 

function runOperation(operation) {
   if(operation === 'clear') {
       display.textContent = '0'
       num1 = 0
       num2 = 0
       result = 0
       typeOperation = null
   } else if (operation === 'equals'){
       getResult(typeOperation, def = '')
   }
   operationStatus = true
}

function getResult(typeOperation) {
   num2 = Number(display.textContent)
   switch(typeOperation){
       case '+':
           result = num1 + num2
           break
       case '-':                 
           result = num1 - num2
           break
       case '*':
           result = num1 * num2
           break
       case '/':                
           result = num1 / num2
           break
       default:
           result = display.textContent
           break
   }
   if (result === Infinity) {
       display.textContent = 'Error'
   }else {
       display.textContent = result
       history.innerHTML += num1 + typeOperation + num2 + '=' + result + '<br>'
   }
}  

function deleteNumber() {
   let string = display.textContent
   if (string.length === 1) {
       display.textContent = '0'
   }else {
       let str1 = string.substring(0,string.length-1)
       display.textContent = str1
   }
}   