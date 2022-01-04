const CONTRAINER = document.querySelector('.container')

let arr = [
  [
    [0, 0],
    [1, 0],
    [2, 0],
    [3, 0],
    [4, 0],
    [5, 0],
    [6, 0],
    [7, 0],
    [8, 0],
    [9, 0],
  ],
  [
    [0, 1],
    [1, 1],
    [2, 1],
    [3, 1],
    [4, 1],
    [5, 1],
    [6, 1],
    [7, 1],
    [8, 1],
    [9, 1],
  ],
  [
    [0, 2],
    [1, 2],
    [2, 2],
    [3, 2],
    [4, 2],
    [5, 2],
    [6, 2],
    [7, 2],
    [8, 2],
    [9, 2],
  ],
  [
    [0, 3],
    [1, 3],
    [2, 3],
    [3, 3],
    [4, 3],
    [5, 3],
    [6, 3],
    [7, 3],
    [8, 3],
    [9, 3],
  ],
  [
    [0, 4],
    [1, 4],
    [2, 4],
    [3, 4],
    [4, 4],
    [5, 4],
    [6, 4],
    [7, 4],
    [8, 4],
    [9, 4],
  ],
  [
    [0, 5],
    [1, 5],
    [2, 5],
    [3, 5],
    [4, 5],
    [5, 5],
    [6, 5],
    [7, 5],
    [8, 5],
    [9, 5],
  ],
  [
    [0, 6],
    [1, 6],
    [2, 6],
    [3, 6],
    [4, 6],
    [5, 6],
    [6, 6],
    [7, 6],
    [8, 6],
    [9, 6],
  ],
  [
    [0, 7],
    [1, 7],
    [2, 7],
    [3, 7],
    [4, 7],
    [5, 7],
    [6, 7],
    [7, 7],
    [8, 7],
    [9, 7],
  ],
  [
    [0, 8],
    [1, 8],
    [2, 8],
    [3, 8],
    [4, 8],
    [5, 8],
    [6, 8],
    [7, 8],
    [8, 8],
    [9, 8],
  ],
  [
    [0, 9],
    [1, 9],
    [2, 9],
    [3, 9],
    [4, 9],
    [5, 9],
    [6, 9],
    [7, 9],
    [8, 9],
    [9, 9],
  ],
]

const handleCube = {
  x: 0,
  y: 0,
}

class Fields {
  constructor(x, y) {
    this.x = x
    this.y = y

    let cube = document.createElement('cube')
    cube.classList.add('field')
    cube.style.width = this.x + 'px'
    cube.style.height = this.y + 'px'
    CONTRAINER.appendChild(cube)
    this.cubeToMove = cube

    // this.cubeToMove
  }
}
class Player extends Fields {
  constructor(x, y) {
    super(x, y)

    this.cubeToMove.style.backgroundColor = 'blue'
    window.addEventListener('keydown', event => {
      if (event.keyCode == 39) {
        //right
        // console.log(this.cubeToMove)

        if (handleCube.x <= 8) {
          handleCube.x++
          // this.cubeToMove.style.top += `${parseInt(ale)} px`
          // console.log(this.cubeToMove.style.top)
          this.cubeToMove.style.transform += 'translateX(30px)'
        } else {
          this.cubeToMove.style.transform += 'translateX(0px)'
        }
      } else if (event.keyCode == 37) {
        if (handleCube.x >= 1) {
          handleCube.x--
          this.cubeToMove.style.transform += 'translateX(-30px)'
        } else {
          this.cubeToMove.style.transform += 'translateX(0px)'
        }
      } else if (event.keyCode == 38) {
        if (handleCube.y >= 1) {
          handleCube.y--

          this.cubeToMove.style.transform += 'translateY(-30px)'
        } else {
          this.cubeToMove.style.transform += 'translateY(0px)'
        }

        //top
      } else if (event.keyCode == 40) {
        if (handleCube.y <= 8) {
          handleCube.y++
          this.cubeToMove.style.transform += 'translateY(30px)'
        } else {
          this.cubeToMove.style.transform += 'translateX(0px)'
        }
        //down
      }
      // console.log(event)
      console.log('x: ', handleCube.x, 'y: ', handleCube.y)
    })
  }
}

const cubeTable = []
for (i = 0; i < 100; i++) {
  if (i == 0) {
    const field = new Player(30, 30)
    cubeTable.push(field)
  } else {
    const field = new Fields(30, 30)
    cubeTable.push(field)
  }
}

cubeTable[50].cubeToMove.style.backgroundColor = 'black'

// cubeTable[0].cubeToMove.style.backgroundColor = 'blue'
