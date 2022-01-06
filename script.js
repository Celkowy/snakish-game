const CONTRAINER = document.querySelector('.container')
let pResult = document.querySelector('.result')
const enemyTable = []
let result = 0
let enemyInterval = 350
const squareTable = []
const yourTime = document.querySelector('.time')
const startBoard = document.querySelector('.start-board')
const board = document.querySelector('.board')
const menu = document.querySelector('.menu')
let show = true

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

      // if (result >= 50) {
      //   window.location.reload()
      // }
    })
  }
}

let windowWidth = window.matchMedia('(max-width: 1024px)')
let fieldSize = 30
if (!windowWidth.matches) {
  fieldSize = 50
}
const player = new Player(fieldSize, fieldSize, 0, 0)
player.square.style.display = 'none'

const survival = () => {
  console.log('111')
  startBoard.style.display = 'none'
  board.style.display = 'flex'
  player.square.style.display = 'block'
  startTimer()
  startGame()
}

var timer = new Timer()

function startTimer() {
  timer.start()
  timer.addEventListener('secondsUpdated', function () {
    $('.timer').html(formatDisplayTime(timer.getTimeValues().minutes, timer.getTimeValues().seconds))
  })

  const formatDisplayTime = (minutes, seconds) => {
    if (minutes >= 5) timer.stop()

    if (seconds < 10) {
      yourTime.innerText = `Time 0${timer.getTimeValues().minutes}:0${timer.getTimeValues().seconds}`
      return `0${minutes}:0${seconds}`
    } else {
      yourTime.innerText = `Time 0${timer.getTimeValues().minutes}:${timer.getTimeValues().seconds}`
      return `0${minutes}:${seconds}`
    }
  }
}
//poziomy trudności
//custom poziom trudności/wybierz ilość kwadracików, czas
//settings popup
//restart jak przegrasz
//napisać collector mode
function startGame() {
  createEnemy = () => {
    while (true) {
      let random = Math.floor(Math.random() * 100)
      if (enemyTable.length == 15) {
        timer.stop()
        // player.square.style.display = 'none'
        show = false
        // player.square.remove()
        break
      }
      if (enemyTable.includes(squareTable[random])) {
        continue
      }
      squareTable[random].square.style.backgroundColor = 'blue'
      enemyTable.push(squareTable[random])

      break
    }
  }

  setInterval(createEnemy, enemyInterval)

  for (i = 0; i < 100; i++) {
    const field = new Fields(fieldSize, fieldSize, i % 10, (i / 10) | 0)
    squareTable.push(field)
  }
}

menu.addEventListener('click', () => {
  window.location.reload()
})
