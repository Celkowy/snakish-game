const CONTRAINER = document.querySelector('.container')
const YOUR_TIME = document.querySelector('.time')
const START_BOARD = document.querySelector('.start-board')
const BOARD = document.querySelector('.board')
const MENU = document.querySelector('.menu')
const SETTINGS = document.querySelector('.settings')
const SETTINGS_POPUP = document.querySelector('.settings-popup')
const LEVEL_DIFFICULTY = document.querySelector('.level-difficulty')
let pResult = document.querySelector('.result')

const enemyTable = []
let result = 0
let enemyInterval = 350
const squareTable = []
let show = true
let settings = {}
if (localStorage) {
  settings = {
    difficulty: `${JSON.parse(localStorage.getItem('settings')).difficulty || 'Easy'}`,
  }
} else {
  settings = {
    difficulty: 'Easy',
  }
}

let windowWidth = window.matchMedia('(max-width: 1024px)')
let fieldSize = 30
if (!windowWidth.matches) {
  fieldSize = 50
}

const gameMode = {
  mode: '',
}

SETTINGS.addEventListener('click', () => {
  SETTINGS_POPUP.classList.toggle('hide')
  START_BOARD.classList.toggle('hide')
  LEVEL_DIFFICULTY.textContent = `${settings.difficulty}`
  checkColor()
})

MENU.addEventListener('click', () => {
  window.location.reload()
})

function checkColor() {
  LEVEL_DIFFICULTY.className = `level-difficulty ${settings.difficulty.toLowerCase()}`
}

var timer = new Timer()
LEVEL_DIFFICULTY.textContent = `${settings.difficulty}`
checkColor()

function changeDifficulty(arg) {
  settings = {
    difficulty: arg,
  }
  localStorage.setItem('settings', JSON.stringify(settings))
  LEVEL_DIFFICULTY.textContent = `${settings.difficulty}`
  checkColor()
  SETTINGS_POPUP.classList.toggle('hide')
  START_BOARD.classList.toggle('hide')
}

//class to create fields
class Fields {
  constructor(width, height, x, y) {
    this.width = width
    this.height = height

    const square = document.createElement('cube')
    square.classList.add('field')
    square.style.width = this.width + 'px'
    square.style.height = this.height + 'px'
    CONTRAINER.appendChild(square)
    this.square = square
    this.x = x
    this.y = y
  }
}

//class to create player, handle movement and a way to deal with enemies
class Player extends Fields {
  constructor(width, height, x, y) {
    super(width, height, x, y)

    this.square.style.position = 'absolute'
    this.square.style.backgroundColor = 'black'
    let size = this.square.style.width[0] + this.square.style.width[1] - 1
    this.square.style.width = `${size}px`
    this.square.style.height = `${size}px`

    window.addEventListener('keydown', event => {
      if (event.key === 'ArrowRight' || event.key === 'd') {
        if (this.x <= 8) {
          this.x++
        }
      } else if (event.key === 'ArrowLeft' || event.key === 'a') {
        if (this.x >= 1) {
          this.x--
        }
      } else if (event.key === 'ArrowUp' || event.key === 'w') {
        if (this.y >= 1) {
          this.y--
        }
      } else if (event.key === 'ArrowDown' || event.key === 's') {
        if (this.y <= 8) {
          this.y++
        }
      }
      this.square.style.transform = `translate(${this.x * this.width}px, ${this.y * this.height}px)`

      enemyTable.forEach((enemy, index) => {
        if (show && player.x === enemy.x && player.y === enemy.y) {
          enemy.square.style.backgroundColor = 'red'
          enemyTable.splice(index, 1)
          result++
          pResult.innerHTML = `Score ${result}`
        }
      })
    })
  }
}

//applying settings to selected mode
const chooseMode = mode => {
  if (mode === 'survival') {
    gameMode.mode = 'survival'
  } else if (mode === 'collector') {
    YOUR_TIME.innerHTML = `Time 00:25`
    gameMode.mode = 'collector'
  }
  SETTINGS.hidden = true
  START_BOARD.style.display = 'none'
  BOARD.style.display = 'flex'
  player.square.style.display = 'block'
  startTimer()
  startGame(JSON.parse(localStorage.getItem('settings')).difficulty)
}

function startTimer() {
  if (gameMode.mode === 'survival') {
    timer.start()
    timer.addEventListener('secondsUpdated', function () {
      $('.timer').html(formatDisplayTime(timer.getTimeValues().minutes, timer.getTimeValues().seconds))
    })
  } else {
    timer.start({ countdown: true, startValues: { seconds: 25 } })
    timer.addEventListener('secondsUpdated', function () {
      $('.timer').html(formatDisplayTime(timer.getTimeValues().minutes, timer.getTimeValues().seconds))
    })
  }
}

//function to format displayed time
const formatDisplayTime = (minutes, seconds) => {
  if (minutes >= 5) timer.stop()
  if (seconds < 10) {
    YOUR_TIME.innerText = `Time 0${timer.getTimeValues().minutes}:0${timer.getTimeValues().seconds}`
    return `0${minutes}:0${seconds}`
  } else {
    YOUR_TIME.innerText = `Time 0${timer.getTimeValues().minutes}:${timer.getTimeValues().seconds}`
    return `0${minutes}:${seconds}`
  }
}

function startGame() {
  let myInterval = setInterval(createEnemy, enemyInterval)
  if (gameMode.mode === 'survival') {
  } else {
    clearInterval(myInterval)
    myInterval = setInterval(createEnemy, difficultyLevel(JSON.parse(localStorage.getItem('settings')).difficulty))
  }

  for (i = 0; i < 100; i++) {
    const field = new Fields(fieldSize, fieldSize, i % 10, (i / 10) | 0)
    squareTable.push(field)
  }
}

const player = new Player(fieldSize, fieldSize, 0, 0)
player.square.style.display = 'none'

function createEnemy() {
  while (true) {
    let random = Math.floor(Math.random() * 100)
    if (gameMode.mode === 'survival') {
      if (enemyTable.length == difficultyLevel(JSON.parse(localStorage.getItem('settings')).difficulty)) {
        timer.stop()
        player.square.style.display = 'none'
        show = false
        player.square.remove()
        break
      }
    } else {
      if (YOUR_TIME.textContent === 'Time 00:00' || enemyTable.length >= 90) {
        timer.stop()
        player.square.style.display = 'none'
        show = false
        player.square.remove()
        break
      }
    }

    if (enemyTable.includes(squareTable[random])) {
      continue
    }
    squareTable[random].square.style.backgroundColor = 'blue'
    enemyTable.push(squareTable[random])
    break
  }
}

function difficultyLevel(lv) {
  let level = lv.toLowerCase()

  if (gameMode.mode === 'survival') {
    if (level === 'easy') return 20
    else if (level === 'medium') return 16
    else if (level === 'hard') return 12
    else if (level === 'insane') return 8
  } else {
    if (level === 'easy') return 300
    else if (level === 'medium') return 225
    else if (level === 'hard') return 175
    else if (level === 'insane') return 125
  }
}

//restart jak przegrasz
//wytłumaczenie settingsów do trybów
