const Player = require('./classes/player')
const View = require('./classes/view')
const Controller = require('./classes/controller')
const App = require('./classes/app')

const audioElement = document.getElementById('audio')
const userInterfaceElements = require('./utils/userInterfaceElements')

const player = new Player(audioElement)
const view = new View(userInterfaceElements)
const controller = new Controller(player, view)
const app = new App(controller)

app.init()