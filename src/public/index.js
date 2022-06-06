const form1 = document.querySelector('#form-1')
const form2 = document.querySelector('#form-2')

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
		.then(res => connectIO(res, '1'))
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
		.then(res => connectIO(res, '2'))
		.catch(err => console.log(err))

})


function connectIO({ token }, id) {
	document.querySelector(`#token-${id}`).innerHTML = token

	const socket = io.connect('http://localhost:3000/chats', {
		auth: { token },
	})

	socket.on('chant:connect', (payload) => {
		console.log(payload.user)

		document.querySelector(`#user-${id}`).innerHTML = JSON.stringify(payload.user)
	})

	socket.on('chant:typing', (payload) => {
		console.log('typing', payload)
	})

	socket.on('chant:message', (payload) => {
		let list = document.getElementById(`messages-list-${id}`);

		let li = document.createElement("li");
		li.innerHTML = payload;
		list.appendChild(li)
	})
}