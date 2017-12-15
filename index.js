// get dependencies
const express = require('express')
const bodyParser = require('body-parser')
const app = express()

// parse post request bodies
app.use(bodyParser.json())
// use static folder to get files
app.use(express.static(`${__dirname}/static`))

// get index in case of root
app.get('/',(req,res)=>{
	res.sendFile(`${__dirname}/static/index.htm`)
})

// show SVG files (for coding animations)
app.get('/bus',(req,res)=>{
	res.sendFile(`${__dirname}/static/GoMap.svg`)
})

app.get('/subway',(req,res)=>{
	res.sendFile(`${__dirname}/static/SubwayMapTerminal.svg`)
})

// send responses to post requests
app.post('/start',(req,res)=>{
	res.send('start')
})

app.post('/travelMethod',(req,res)=>{
	res.send(req.body.msg)
})

app.post('/toStation',(req,res)=>{
	res.send(req.body.msg)
})

app.post('/fromUnion',(req,res)=>{
	res.send(req.body.msg)
})

app.post('/fromTerminal',(req,res)=>{
	res.send(req.body.msg)
})


// listen on the right port
app.listen(process.env.PORT || 8080)
