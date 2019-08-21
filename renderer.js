const TitleBar = require('./classes/titleBar')
const Player = require('./classes/player')
const View = require('./classes/view')
const Store = require('./classes/store')
const Controller = require('./classes/controller')
const App = require('./classes/app')

const titleBarElements = require('./utils/titleBarElements')
const audioElement = document.getElementById('audio')
const userInterfaceElements = require('./utils/userInterfaceElements')

const titleBar = new TitleBar(titleBarElements)
const player = new Player(audioElement)
const view = new View(userInterfaceElements)
const store = new Store()
const controller = new Controller(player, view, store)
const app = new App(titleBar, controller)

app.init()