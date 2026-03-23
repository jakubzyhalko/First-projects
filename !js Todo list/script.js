let todoInput // input do wpisania zadań przez użytkownika
let errorInfo // informacja o braku zadania / braku treści
let addBtn // przycisk DODAJ - dodający nowy element do listy
let ulList // lista zadań
let popup // popup
let popupInfo // tekst w popupie
let todoToEdit // edytowany todo
let popupinput // input w popupie
let popupAddBtn // przycisk "zatwierdź" w popupie
let popupCloseBtn // przycisk "anuluj" w popupie

const main = () => {
	prepareDOMElements()
	prepareDOMEvents()
	loadTodosFromLocalStorage()
}

const prepareDOMElements = () => {
	todoInput = document.querySelector('.todo-input')
	errorInfo = document.querySelector('.error-info')
	addBtn = document.querySelector('.btn-add')
	ulList = document.querySelector('.todolist ul')

	popup = document.querySelector('.popup')
	popupInfo = document.querySelector('.popup-info')
	popupinput = document.querySelector('.popup-input')
	popupAddBtn = document.querySelector('.accept')
	popupCloseBtn = document.querySelector('.cancel')
}

const prepareDOMEvents = () => {
	addBtn.addEventListener('click', addNewTodo)
	ulList.addEventListener('click', checkClick)
	popupCloseBtn.addEventListener('click', closePopup)
	popupAddBtn.addEventListener('click', changeTodoText)
	todoInput.addEventListener('keyup', enterKeyCheck)
}

const addNewTodo = () => {
	if (todoInput.value.trim() !== '') {
		const newTodo = document.createElement('li')
		newTodo.textContent = todoInput.value.trim()

		createToolsArea(newTodo)
		ulList.append(newTodo)

		todoInput.value = ''
		errorInfo.textContent = ''

		saveTodosToLocalStorage()
	} else {
		errorInfo.textContent = 'Wpisz treść zadania!'
	}
}

const createToolsArea = newTodo => {
	const toolsPanel = document.createElement('div')
	toolsPanel.classList.add('tools')
	newTodo.append(toolsPanel)

	const completeBtn = document.createElement('button')
	completeBtn.classList.add('complete')
	completeBtn.innerHTML = '<i class="fas fa-check"></i>'

	const editBtn = document.createElement('button')
	editBtn.classList.add('edit')
	editBtn.textContent = 'EDIT'

	const deleteBtn = document.createElement('button')
	deleteBtn.classList.add('delete')
	deleteBtn.innerHTML = '<i class="fas fa-times"></i>'

	toolsPanel.append(completeBtn, editBtn, deleteBtn)
}

const checkClick = e => {
	const completeBtn = e.target.closest('.complete')
	const editBtn = e.target.closest('.edit')
	const deleteBtn = e.target.closest('.delete')

	if (completeBtn) {
		completeBtn.closest('li').classList.toggle('completed')
		saveTodosToLocalStorage()
	} else if (editBtn) {
		editTodo(editBtn)
	} else if (deleteBtn) {
		deleteTodo(deleteBtn)
	}
}

const editTodo = btn => {
	todoToEdit = btn.closest('li')
	popupinput.value = todoToEdit.firstChild.textContent
	popup.style.display = 'flex'
}

const closePopup = () => {
	popup.style.display = 'none'
	popupInfo.textContent = ''
}

const changeTodoText = () => {
	if (popupinput.value.trim() !== '') {
		todoToEdit.firstChild.textContent = popupinput.value.trim()
		popup.style.display = 'none'
		popupInfo.textContent = ''
		saveTodosToLocalStorage()
	} else {
		popupInfo.textContent = 'Musisz podać jakąś treść'
	}
}

const deleteTodo = btn => {
	btn.closest('li').remove()
	const allTodos = ulList.querySelectorAll('li')

	if (allTodos.length === 0) {
		errorInfo.textContent = 'Brak zadań na liście'
	}

	saveTodosToLocalStorage()
}

const enterKeyCheck = e => {
	if (e.key === 'Enter') {
		addNewTodo()
	}
}

const saveTodosToLocalStorage = () => {
	const todos = []

	document.querySelectorAll('.todolist ul li').forEach(li => {
		todos.push({
			text: li.firstChild.textContent,
			completed: li.classList.contains('completed'),
		})
	})

	localStorage.setItem('todos', JSON.stringify(todos))
}

const loadTodosFromLocalStorage = () => {
	const todos = JSON.parse(localStorage.getItem('todos')) || []

	todos.forEach(todo => {
		const newTodo = document.createElement('li')
		newTodo.textContent = todo.text

		if (todo.completed) {
			newTodo.classList.add('completed')
		}

		createToolsArea(newTodo)
		ulList.append(newTodo)
	})
}

document.addEventListener('DOMContentLoaded', main)
