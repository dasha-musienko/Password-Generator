const resultEl = document.getElementById('result');
const lengthEl = document.getElementById('length');
const slideValueEl = document.querySelector('.range-slider-value');
const uppercaseEl = document.getElementById('uppercase');
const lowercaseEl = document.getElementById('lowercase');
const numbersEl = document.getElementById('numbers');
const symbolsEl = document.getElementById('symbols');
const generateEl = document.getElementById('generate');
const copyEl = document.getElementById('copy');
const randomFunc = {
	lower: generateLowercaseLetter,
	upper: generateUppercaseLetter,
	number: generateNumber,
	symbol: generateSymbol
}
copyEl.addEventListener('click', copyElClickHandler);
lengthEl.addEventListener("input", lengthSlideHandler)
generate.addEventListener('click', generateClickHandler);

function generateClickHandler() {
	const length = +lengthEl.value;
	const isLower = lowercaseEl.checked;
	const isUpper = uppercaseEl.checked;
	const isNumber = numbersEl.checked;
	const isSymbol = symbolsEl.checked;
	
	resultEl.innerText = generatePassword(isLower, isUpper, isNumber, isSymbol, length);
}

function generatePassword(lower, upper, number, symbol, length) {
	let generatedPassword = '';
	const typesCount = lower + upper + number + symbol;
	const typesArr = [{lower}, {upper}, {number}, {symbol}].filter(item => Object.values(item)[0]);
	
	if(typesCount === 0) {
		return '';
	}
	
	for(let i=0; i<length; i+=typesCount) {
		typesArr.forEach(type => {
			const funcName = Object.keys(type)[0];
			generatedPassword += randomFunc[funcName]();
		});
	}
	
	const finalPassword = generatedPassword.slice(0, length);
	
	return finalPassword;
}

function generateLowercaseLetter() {
	return String.fromCharCode(Math.floor(Math.random() * 26) + 97);
}

function generateUppercaseLetter() {
	return String.fromCharCode(Math.floor(Math.random() * 26) + 65);
}

function generateNumber() {
	return +String.fromCharCode(Math.floor(Math.random() * 10) + 48);
}

function generateSymbol() {
	const symbols = '!@#$%^&*(){}[]=<>/,.'
	return symbols[Math.floor(Math.random() * symbols.length)];
}


function lengthSlideHandler (evt) {
  slideValueEl.textContent = evt.target.value
}


function copyElClickHandler () {
    const textarea = document.createElement('textarea');
    const password = resultEl.innerText;
    
    if(!password) { return; }
    
    textarea.value = password;
    document.body.appendChild(textarea);
    textarea.select();
    document.execCommand('copy');
    textarea.remove();
  
    alertify.set('notifier','position', 'top-right');
    alertify.success('Password copied to clipboard!');

}