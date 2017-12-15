/* Decisions */

// asks user to make a decision and waits for their answer

function start(opts){
// would you like to leave now
// returns start
	// don't reset the screen because its on same screen as intro
	// creates elements
	const question = document.createElement('p')
	question.innerHTML = 'Would you like to leave now?'
	const option = document.createElement('button')
	option.innerHTML = 'yes'
	option.value = 'begin'
	option.setAttribute('class','onlyOption')
	// creates container for buttons so CSS is cleaner
	const optionContainer = document.createElement('div')
	optionContainer.id = 'buttons'
	optionContainer.appendChild(option)
	// appends to body
	document.body.appendChild(question)
	document.body.appendChild(optionContainer)
	// returns promise for user input
	// probably don't need to go to server for this but i do
	return new Promise((resolve,reject)=>
		option.addEventListener('click',()=>{
			fetch('/start',{
				headers:{'Content-Type':'application/json'},
				method: 'post',
				body: JSON.stringify({msg:option.value})
			})
			.then(res=>res.text())
			.then(data=>resolve(data))
			.catch(error=>reject(error))
	}))
}

function travelMethod(opts) {
// Would you like to take the train or the bus
// returns train, bus
	// clears the screen to make way for new content
	resetScreen()

	const question = document.createElement('h1')
	question.innerHTML = 'How would you like to get to school?'
	// more than one option so using an array to store buttons
	let options = new Array()
	options.push(document.createElement('button'))
	options[0].innerHTML = 'the Go Train'
	options[0].value = 'train'
	options.push(document.createElement('button'))
	options[1].innerHTML = 'the Go Bus'
	options[1].value = 'bus'

	const optionContainer = document.createElement('div')
	optionContainer.id = 'buttons'

	document.body.appendChild(question)
	options.forEach(option=>{
		optionContainer.appendChild(option)
	})
	document.body.appendChild(optionContainer)

	return new Promise((resolve,reject)=>{
		options.forEach(option=>
			option.addEventListener('click',()=>{
				fetch('/travelMethod',{
					method: 'post',
					headers:{'Content-Type':'application/json'},
					body: JSON.stringify({msg:option.value})
				})
				.then(res=>res.text())
				.then(data=>resolve(data))
				.catch(error=>reject(error))
		}))
	})
}

function houseToStation(opts) {
// How are you getting to the bus/train station
// returns walk, bike (if opt.bus==false), ride
	resetScreen()

	const question = document.createElement('h1')
	let options = new Array()
	question.innerHTML = `How are you getting to the ${opts.method} station?`
	options.push(document.createElement('button'))
	options[0].innerHTML = 'I am walking'
	options[0].value = 'walk'
	options.push(document.createElement('button'))
	options[1].innerHTML = 'I am carpooling'
	options[1].value = 'ride'
	if(opts.method==='train') {
		// only show bike option if they're using the train (can't take bike on GO Busses)
		options.push(document.createElement('button'))
		options[2].innerHTML = 'I am biking'
		options[2].value = 'bike'
	}

	const optionContainer = document.createElement('div')
	optionContainer.id = 'buttons'

	document.body.appendChild(question)
	options.forEach(option=>{
		optionContainer.appendChild(option)
	})
	document.body.appendChild(optionContainer)

	return new Promise((resolve,reject)=>{
		options.forEach(option=>
			option.addEventListener('click',()=>{
				fetch('/toStation',{
					method: 'post',
					headers:{'Content-Type':'application/json'},
					body: JSON.stringify({msg:option.value})
				})
				.then(res=>res.text())
				.then(data=>resolve(data))
				.catch(error=>reject(error))
		}))
	})
}

function unionToSchool(opts) {
// How are you traveling from union
// returns walk, subway, bike (if opts.hasBike==true)
	resetScreen()

	const question = document.createElement('h1')
	let options = new Array()
	question.innerHTML = `How are you getting from Union Station to school?`
	if(opts.hasBike) {
		// they can't bike if they didn't bring one
		options.push(document.createElement('button'))
		options[0].innerHTML = 'I am biking'
		options[0].value = 'bike'
	} else {
		// they won't walk when they have to carry a bike
		options.push(document.createElement('button'))
		options[0].innerHTML = 'I am walking'
		options[0].value = 'walk'
	}
	options.push(document.createElement('button'))
	options[1].innerHTML = 'I am taking the subway'
	options[1].value = 'subway'

	const optionContainer = document.createElement('div')
	optionContainer.id = 'buttons'

	document.body.appendChild(question)
	options.forEach(option=>{
		optionContainer.appendChild(option)
	})
	document.body.appendChild(optionContainer)

	return new Promise((resolve,reject)=>{
		options.forEach(option=>
			option.addEventListener('click',()=>{
				fetch('/fromUnion',{
					method: 'post',
					headers:{'Content-Type':'application/json'},
					body: JSON.stringify({msg:option.value})
				})
				.then(res=>res.text())
				.then(data=>resolve(data))
				.catch(error=>reject(error))
		}))
	})
}

function terminalToSchool(opts){
// How are you getting fromt the bus terminal to school
// returns subway
	resetScreen()

	const question = document.createElement('h1')
	question.innerHTML = 'how are you getting to school?'
	const option = document.createElement('button')
	option.innerHTML = 'I am taking the subway'
	option.value = 'subway'
	option.setAttribute('class','onlyOption')
	const optionContainer = document.createElement('div')
	optionContainer.id = 'buttons'
	optionContainer.appendChild(option)

	document.body.appendChild(question)
	document.body.appendChild(optionContainer)

	return new Promise((resolve,reject)=>
		option.addEventListener('click',()=>{
			fetch('/fromTerminal',{
				headers:{'Content-Type':'application/json'},
				method: 'post',
				body: JSON.stringify({msg:option.value})
			})
			.then(res=>res.text())
			.then(data=>resolve(data))
			.catch(error=>reject(error))
	}))
}
