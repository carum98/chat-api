const form1 = document.querySelector('#form-1')
const form2 = document.querySelector('#form-2')

const message1 = document.querySelector('#message-1')
const message2 = document.querySelector('#message-2')

const connect1 = document.querySelector('#message-1 button[type="button"]')
const connect2 = document.querySelector('#message-2 button[type="button"]')

form1.addEventListener('submit', (e) => {
	e.preventDefault()

	const formData = new FormData(e.target);
	const formProps = Object.fromEntries(formData);

	fetch('/api/login', {
		method: 'POST',
		body: JSON.stringify(formProps),
		headers: {
			'Content-Type': 'application/json'
		}
	}).then(res => res.json())
		.then(({ token }) => {
			document.querySelector(`#token-1`).innerHTML = token
		})
		.catch(err => console.log(err))
})

form2.addEventListener('submit', (e) => {
	e.preventDefault()

	const formData = new FormData(e.target);
	const formProps = Object.fromEntries(formData);

	fetch('/api/login', {
		method: 'POST',
		body: JSON.stringify(formProps),
		headers: {
			'Content-Type': 'application/json'
		}
	}).then(res => res.json())
		.then(({ token }) => {
			document.querySelector(`#token-2`).innerHTML = token
		})
		.catch(err => console.log(err))

})

message1.addEventListener('submit', (e) => {
	e.preventDefault()

	const formData = new FormData(e.target);
	const formProps = Object.fromEntries(formData);

	sendMessage(formProps, '1')
})

message2.addEventListener('submit', (e) => {
	e.preventDefault()

	const formData = new FormData(e.target);
	const formProps = Object.fromEntries(formData);

	sendMessage(formProps, '2')
})

connect1.addEventListener('click', () => {
	connectIO({ number: message1.elements.user_number.value }, 1)
})

connect2.addEventListener('click', () => {
	connectIO({ number: message2.elements.user_number.value }, 2)
})

function connectIO({ number }, id) {
	console.log(`Connecting to ${number}`)
	const token = document.querySelector(`#token-${id}`).innerHTML

	const socket = io.connect('http://localhost:3000/chats', {
		auth: { token },
		query: { number }
	})

	socket.on('chat:connect', (payload) => {
		console.log(payload.user)

		document.querySelector(`#user-${id}`).innerHTML = JSON.stringify(payload.user)
	})

	socket.on('chat:typing', () => {
		let typing = document.querySelector(`#typing-${id}`)

		if (typing.innerHTML !== '') {
			typing.innerHTML = ''
		} else {
			typing.innerHTML = 'is typing...'
		}
	})

	socket.on('chat:message', (payload) => {
		let list = document.getElementById(`messages-list-${id}`)

		let { content } = payload

		let li = document.createElement("li")
		li.innerHTML = content
		list.appendChild(li)
	})

	document.querySelector(`#message-${id} input[name="content"]`).addEventListener('focusin', () => {
		socket.emit('chat:typing')
	})
	document.querySelector(`#message-${id} input[name="content"]`).addEventListener('focusout', () => {
		socket.emit('chat:typing')
	})
}

function sendMessage(params, id) {
	let token = document.getElementById(`token-${id}`).innerHTML;

	fetch('/api/messages', {
		method: 'POST',
		body: JSON.stringify(params),
		headers: {
			'Content-Type': 'application/json',
			'Authorization': token
		}
	}).then(res => res.json())
		.then(res => console.log(res))
		.catch(err => console.log(err))
}