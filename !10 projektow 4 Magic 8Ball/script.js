const input = document.querySelector('input')
const answer = document.querySelector('.answer')
const error = document.querySelector('.error')
const ballBtn = document.querySelector('img')

const answerArr = []

const shakeBall = () => {
	ballBtn.classList.add('shake-animation')
	answer.textContent = ''
	error.textContent = ''
	setTimeout(checkInput, 1000)
}

const checkInput = () => {
	if (input.value !== '' && input.value.slice(-1) === '?') {
		generateAnswer()
		error.textContent = ''
	} else if (input.value !== '' && input.value.slice(-1) !== '?') {
		error.textContent = 'Pytanie musi być zakończone znakiem "?"'
		answer.textContent = ''
	} else {
		error.textContent = 'Musisz zadać jakieś pytanie!'
		answer.textContent = ''
	}
	ballBtn.classList.remove('shake-animation')
}

const generateAnswer = () => {
	const number = Math.floor(Math.random() * 5)
	answer.innerHTML = `<span>Odpowiedź:</span> ${answerArr[number]}`
}

ballBtn.addEventListener('click', shakeBall)
