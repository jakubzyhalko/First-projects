const converter = document.querySelector('#converter')
const result = document.querySelector('.result')
const convBtn = document.querySelector('.conv')
const restetBtn = document.querySelector('.reset')
const changeBtn = document.querySelector('.change')
const one = document.querySelector('.one')
const two = document.querySelector('.two')

let fahrenheit
let celsius

const change = () => {
	if (one.textContent === '°C') {
		one.textContent = '°F'
		two.textContent = '°C'
		result.textContent = ''
	} else {
		one.textContent = '°C'
		two.textContent = '°F'
		result.textContent = ''
	}
}

const convert = () => {
	if (converter.value !== '') {
		if (one.textContent === '°C') {
			fahrenheit = converter.value * 1.8 + 32
			result.textContent = `${converter.value}°C to ${fahrenheit}°F`
			converter.value = ''
		} else if (one.textContent === '°F') {
			celsius = (converter.value - 32) / 1.8
			result.textContent = `${converter.value}°F to ${celsius}°C`
			converter.value = ''
		}
	} else {
		result.textContent = 'Podaj jakaś liczbę'
	}
}

const reset = () => {
	converter.value = ''
	result.textContent = ''
}

changeBtn.addEventListener('click', change)
convBtn.addEventListener('click', convert)
restetBtn.addEventListener('click', reset)