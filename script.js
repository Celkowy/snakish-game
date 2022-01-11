const CONTRAINER = document.querySelector('.container')
const YOUR_TIME = document.querySelector('.time')
const START_BOARD = document.querySelector('.start-board')
const BOARD = document.querySelector('.board')
const MENU = document.querySelector('.menu')
const SETTINGS = document.querySelector('.settings')
const SETTINGS_POPUP = document.querySelector('.settings-popup')
const LEVEL_DIFFICULTY = document.querySelector('.level-difficulty')
const MODE = document.querySelector('.mode')
const MORE_INFO_POPUP = document.querySelector('.more-info-popup')
const CLOSE_MORE_INFO_POPUP = document.querySelector('.close-more-info-popup')
let pResult = document.querySelector('.result')

const enemyTable = []
let result = 0
let enemyInterval = 350
const squareTable = []
let show = true

LEVEL_DIFFICULTY.textContent = `${getDifficulty()}`

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
  LEVEL_DIFFICULTY.textContent = `${getDifficulty()}`
  checkColor()
})

MENU.addEventListener('click', () => {
  window.location.reload()
})

CLOSE_MORE_INFO_POPUP.addEventListener('click', () => {
  MORE_INFO_POPUP.classList.remove('show')
  SETTINGS.hidden = false
})

function checkColor() {
  LEVEL_DIFFICULTY.className = `level-difficulty ${getDifficulty().toLowerCase()}`
}

var timer = new Timer()
checkColor()

function changeDifficulty(arg) {
  saveToLocalstorage('difficulty', arg)
  LEVEL_DIFFICULTY.textContent = ` ${getDifficulty()}`
  checkColor()
  SETTINGS_POPUP.classList.toggle('hide')
  START_BOARD.classList.toggle('hide')
}

//class to create fields
class Fields {
  constructor(width, height, x, y) {
    this.width = width
    this.height = height

    const square = document.createElement('div')
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
  MODE.innerHTML = `${gameMode.mode}`
  SETTINGS.hidden = true
  START_BOARD.style.display = 'none'
  BOARD.style.display = 'flex'
  player.square.style.display = 'block'
  startTimer()
  startGame(getDifficulty())
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
    myInterval = setInterval(createEnemy, difficultyLevel(getDifficulty()))
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
      if (enemyTable.length == difficultyLevel(getDifficulty())) {
        timer.stop()
        player.square.style.display = 'none'
        show = false
        player.square.remove()
        saveToLocalstorage('highestScoreSurvival', result)
        break
      }
    } else {
      if (YOUR_TIME.textContent === 'Time 00:00' || enemyTable.length >= 90) {
        timer.stop()
        player.square.style.display = 'none'
        show = false
        player.square.remove()
        saveToLocalstorage('highestScoreCollector', result)
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

const levelRules = {
  survival: {
    easy: 30,
    medium: 25,
    hard: 20,
    insane: 10,
  },
  collector: {
    easy: 300,
    medium: 225,
    hard: 175,
    insane: 125,
  },
}

function difficultyLevel(lv) {
  let level = lv.toLowerCase()
  return levelRules[gameMode.mode][level]
}

function getDifficulty() {
  const def = 'Easy'
  const item = localStorage.getItem('difficulty')
  if (item == null) {
    saveToLocalstorage('difficulty', def)
    return def
  }
  return item
}

function saveToLocalstorage(name, value) {
  return localStorage.setItem(`${name}`, value)
}

async function openPopup(mode) {
  const response = await fetch('popupContent.json')
  const data = await response.json()

  MORE_INFO_POPUP.classList.add('show')
  SETTINGS.hidden = true
  assignElements(data[mode], mode)
}

function assignElements(
  { modeName, firstInfo, secondInfo, thirdInfo, easyLevel, mediumLevel, hardLevel, insaneLevel },
  mode
) {
  const MODE_NAME = document.querySelector('.mode-name')
  const FIRST_INFO = document.querySelector('.first-info')
  const SECOND_INFO = document.querySelector('.second-info')
  const THIRD_INFO = document.querySelector('.third-info')
  const EASY_LEVEL = document.querySelector('.easy-level')
  const MEDIUM_LEVEL = document.querySelector('.medium-level')
  const HARD_LEVEL = document.querySelector('.hard-level')
  const INSANE_LEVEL = document.querySelector('.insane-level')
  MODE_NAME.textContent = modeName
  FIRST_INFO.textContent = firstInfo
  SECOND_INFO.textContent = secondInfo
  THIRD_INFO.textContent = thirdInfo
  EASY_LEVEL.textContent = easyLevel + levelRules[mode].easy + `${mode === 'collector' ? 'ms' : ''}`
  MEDIUM_LEVEL.textContent = mediumLevel + levelRules[mode].medium + `${mode === 'collector' ? 'ms' : ''}`
  HARD_LEVEL.textContent = hardLevel + levelRules[mode].hard + `${mode === 'collector' ? 'ms' : ''}`
  INSANE_LEVEL.textContent = insaneLevel + levelRules[mode].insane + `${mode === 'collector' ? 'ms' : ''}`
}

//restart jak przegrasz
//ile max może byc na ekranie w trakcie grania w dany tryb
//zmień kwadraty na snejka i owocki
//przeglądnij nazwy
//zapisywanie highest scora w localStorage
//wyświetlanie najlepszego scora obok scora z rozróżnieniem trybów gry
