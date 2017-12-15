/* Scenes */

function introduction(){
	// create elements
	const hello = document.createElement('h1')
	hello.innerHTML = 'Welcome to my morning commute'
	const info = document.createElement('h2')
	info.innerHTML = 'I will let you make decisions on how you get to school today'
	// add to DOM
	document.body.appendChild(hello)
	document.body.appendChild(info)
}

function getToStation(method,destination){
	// clears the screen to make way for new content
	resetScreen()
	// create Eelement
	const message = document.createElement('h1')
	switch(method){
	// set message based on where and how user is going
		case 'walk':
			message.innerHTML = `Walking to ${destination==='train'?'Pickering Go':'Bus Stop'}`
			break
		case 'ride':
			message.innerHTML = `Traveling to ${destination==='train'?'Pickering Go':'Bus Stop'}`
			break
		case 'bike':
			message.innerHTML = 'Biking to Pickering Go'
			break
	}
	// add to DOM
	document.body.appendChild(message)
	// keep onscreen for 2 seconds
	return sleep(2)
}

async function train(){
	resetScreen()
	// make message
	const message = document.createElement('h1')
	message.innerHTML = 'Traveling to Union Station'
	message.style['padding-top'] = 0
	// get SVG
	const background = document.createElement('div')
	background.innerHTML = await fetch('/GoMap.svg').then(res=>res.text())
	background.style['padding-top'] = '20vh'
	background.style.width = '100vw'
	// add to DOM
	document.body.appendChild(background)
	document.body.appendChild(message)
	return sleep(6)
}

function bus(){
	resetScreen()
	const message = document.createElement('h1')
	message.innerHTML = 'Traveling to Yorkdale Bus Terminal'
	document.body.appendChild(message)
	return sleep(3)
}

async function unionSubway(){
	// from union to st. Patrick
	resetScreen()
	//make message
	const message = document.createElement('h1')
	message.innerHTML = 'Traveling to St. Patrick Station'
	message.style['padding-top'] = 0
	// get SVG
	const background = document.createElement('div')
	background.innerHTML = await fetch('/SubwayMapUnion.svg').then(res=>res.text())
	background.style['padding-top'] = '20vh'
	background.style.margin = '0 auto'
	background.style.width = '60vw'
	// add to DOM
	document.body.appendChild(background)
	document.body.appendChild(message)
	return sleep(2)
}

async function terminalSubway(){
	// from york mills to st. Patrick
	resetScreen()
	// make message
	const message = document.createElement('h1')
	message.innerHTML = 'Traveling to St. Patrick Station'
	message.style['padding-top'] = 0
	// get SVG
	const background = document.createElement('div')
	background.innerHTML = await fetch('/SubwayMapTerminal.svg').then(res=>res.text())
	background.style['padding-top'] = '20vh'
	background.style.margin = "0 auto"
	background.style.width = '60vw'
	// add to DOM
	document.body.appendChild(background)
	document.body.appendChild(message)
	return sleep(3)
}

function walkOrBikeToSchool(method){
	resetScreen()
	const message = document.createElement('h1')
	// walk is default in case accidentally undefined
	message.innerHTML = `${method==='bike'?'Biking':'Walking'} to school`
	document.body.appendChild(message)
	return sleep(2)
}

function endScreen(){
	resetScreen()
	const message = document.createElement('h1')
	message.innerHTML = 'Thank you for participating'
	const info = document.createElement('p')
	info.innerHTML = `To get to school on time, you needed to wake up at ${WAKEUP}.<br>You spent $${DAILY_COST} today. This commute will cost $${YEARLY_COST} per year.`
	document.body.appendChild(message)
	document.body.appendChild(info)
}
