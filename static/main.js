/* Globals */
let WAKEUP = '8:30'
let DAILY_COST = 0
let YEARLY_COST = 0

/* Wait for DOM */

// apparently I can just add this to the document prototype
// https://developer.mozilla.org/en-US/docs/Web/API/HTMLDocument

// const documentload = () =>
// 	new Promise((resolve,reject)=>{
// 		if (document.readyState === 'complete') resolve(document)
// 		else document.addEventListener('DOMContentLoaded', ()=>{
// 			resolve(document)
// 		})
// 	})

// Promisifies document readystate so it will play nice with my async function
// I need this because I am clearing document body so the script is linked in the head
HTMLDocument.prototype.ready = ()=>
	new Promise((resolve,reject)=>{
		if (document.readyState === 'complete') resolve(document)
		else document.addEventListener('DOMContentLoaded',()=>{
			// if the ready state isn't complete when first checked, use an event listener
			resolve(document)
		})
})

/* Renderer */

// main render method to change html dynamically
// uses async to pause while waiting for things to happen

// I've been wanting to try out async/await for awhile. I like it

;(async ()=>{
	// code starts when DOM is loaded
	await document.ready()
	// displays introdcution
	introduction()
	// displays start option and waits for user input
	let starting = await start()
	// clears the screen to render new content
	if(starting){
		// using var because I want the results avaliable outside this block
		var method = await travelMethod()
		// there are only two options so i'm just using a ternary operator
		changeWakeup(method==='train'?-60:-90)
		changeCost(method==='train'?7.02:6.73)
		// don't need the results outside this block so using let
		let toStation = await houseToStation({method})
		switch(toStation){
		// changes variables based on how they're getting to their main travel method
			case 'walk':
				changeWakeup(-30)
				break
			case 'bike':
				changeWakeup(-15)
				var hasBike = true
				break
			case 'ride':
				changeWakeup(-10)
				break
		}
		await getToStation(toStation,method)
		switch(method){
		// splits the rest of the experience based on main travel method
			case 'train':
				// renders train travel
				await train()
				let fromStation = await unionToSchool({hasBike})
				console.log(fromStation)
				switch(fromStation) {
				// changes varibles depending on travel away from train station
					case 'bike':
						// don't need to break here
						changeWakeup(-10)
					case 'walk':
						// time is additive because no break
						changeWakeup(-15)
						await walkOrBikeToSchool(fromStation)
						break
					case 'subway':
						changeWakeup(-10)
						changeCost(3)
						await unionSubway()
						await walkOrBikeToSchool('walk')
						break
				}
				break
			case 'bus':
				// renders bus travel
				await bus()
				let fromTerminal = await terminalToSchool()
				// there is only one option, no logic needed
				changeCost(3)
				await terminalSubway()
				await walkOrBikeToSchool('walk')
				break
		}
		// final screen that everyone experiences
		endScreen()
	}
})()



/* General Functions */

// these neither display scenes nor ask questions

function resetScreen(){
	removeChildren(document.body)
	renderInfo()
}

function removeChildren(node){
	// go through all children and remove them until there are none left
	while(node.firstChild) node.removeChild(node.firstChild)
	return node.hasChildNodes() ? false : true
}

function renderInfo(data){
	// create elements
	const wakeup = document.createElement('p')
	wakeup.innerHTML = `🕔 ${WAKEUP}`
	wakeup.id = 'wakeup'

	const dailyCost = document.createElement('p')
	dailyCost.innerHTML = `$${DAILY_COST}`
	dailyCost.id = 'dailyCost'

	const yearlyCost = document.createElement('p')
	yearlyCost.innerHTML = `$${YEARLY_COST}`
	yearlyCost.id = 'yearlyCost'

	// add to DOM
	const header = document.createElement('header')
	header.appendChild(wakeup)
	header.appendChild(dailyCost)
	header.appendChild(yearlyCost)
	document.body.appendChild(header)
}

function changeWakeup(amount){
	// split into hour and minute, then parse string as int
	const time = WAKEUP.split(':').map(time=>parseInt(time))
	// set minute to the minutes of the amount plus existing minutes (can add up to over 60 for now)
	time[1] = Math.floor(amount%60)+time[1]
	// handle negative minutes properly
	time[1] = time[1] < 0 ? 60+time[1] : time[1]
	// set hours to: hours in amount, existing hours, extra minutes over 60, then keep under 24
	time[0] = (Math.floor(amount/60)+time[0]+Math.floor(time[1]/60))%24
	// handle negative hours properly
	time[0] = time[0] < 0 ? 24+time[0] : time[0]
	// remove extra minutes and pad, then add hours and minutes into a string
	WAKEUP = `${time[0]}:${(time[1]%60+'').padStart(2,0)}`
	// set HTML element (with a clock emoji)
	document.getElementById('wakeup').innerHMTL = `🕔 ${WAKEUP}`
}

function changeCost(amount){
	// increase cost
	DAILY_COST += amount
	// calculate yearly cost
	YEARLY_COST = Math.round(DAILY_COST * 160)
	// set HTML elements (with a dollar sign)
	document.getElementById('dailyCost').innerHTML = `$${DAILY_COST}`
	document.getElementById('yearlyCost').innerHTML = `$${YEARLY_COST}`
}

function sleep(seconds=1){
	// convert setTimeout from callback to promise
	return new Promise((resolve,reject)=>{
		setTimeout(()=>{resolve()}, seconds*1000)
	})
}

/* Ajax */

// apparently fetch does post requests now

// function ajax(uri,opts){
// 	const {method,headers,mode,cache,body} = opts
// 	if(method === 'get' || method === 'GET')
// 		return fetch(uri,{method,headers,mode,cache})
// 	if(method === 'post' || method === 'POST')
// 		return post(uri,body)
// }
//
// function post(uri,data){
// 	return new Promise((resolve,reject)=>{
// 		const req = new XMLHttpRequest()
// 		req.open('POST',uri)
// 		req.setRequestHeader('Content-Type','application/json')
// 		req.onload = ()=>{
// 			if(req.status == 200) {
// 				resolve(req.response)
// 			} else {
// 				reject(Error(req.statusText))
// 			}
// 		}
// 		req.onerror = ()=>{
// 			reject(Error("Something went wrong ... "))
// 		}
// 		req.send(data)
// 	})
// }
