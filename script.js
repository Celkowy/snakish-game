const CONTRAINER = document.querySelector('.container')
let pResult = document.querySelector('.result')
const enemyTable = []
let result = 0
let enemyInterval = 333350
const squareTable = []

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
        if (player.x === enemy.x && player.y === enemy.y) {
          enemy.square.style.backgroundColor = 'red'
          enemyTable.splice(index, 1)
          result++
          pResult.innerHTML = result
        }
      })

      if (result >= 50) {
        window.location.reload()
      }
    })
  }
}

// 2 tryby, najwięcej w 25 sekund
//przeżyć najdłużej

createEnemy = () => {
  while (true) {
    let random = Math.floor(Math.random() * 100)
    if (enemyTable.includes(squareTable[random])) {
      continue
    }
    squareTable[random].square.style.backgroundColor = 'blue'
    enemyTable.push(squareTable[random])
    if (enemyTable.length >= 30) {
      window.location.reload()
    }
    break
  }
}

setInterval(createEnemy, enemyInterval)

let windowWidth = window.matchMedia('(max-width: 1024px)')
let fieldSize = 30
if (!windowWidth.matches) {
  fieldSize = 50
}

for (i = 0; i < 100; i++) {
  const field = new Fields(fieldSize, fieldSize, i % 10, (i / 10) | 0)
  squareTable.push(field)
}

const player = new Player(fieldSize, fieldSize, 0, 0)
// 2 tryby, najwięcej w 25 sekund //przeżyć najdłużej

const aaa = () => {
  console.log('111')
}
