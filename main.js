const pencil = document.querySelector('.toolbar__pencil')
const undo = document.querySelector('.toolbar__undo')
const canvas = document.getElementById('canvas')
console.log('canvas', canvas)
const ctx = canvas.getContext('2d')
let coord = {
  x: 0,
  y: 0
}
let draw = false
let shapes = []
let newShape = []

canvas.setAttribute('width', `${canvas.scrollWidth}`)
canvas.setAttribute('height', `${canvas.scrollHeight}`)

const getPosition = event => {
  coord.x = event.clientX - canvas.offsetLeft
  coord.y = event.clientY - canvas.offsetTop
}

const startDrawing = event => {
  draw = true
  getPosition(event)
}

const stopDrawing = () => {
  draw = false
  shapes = shapes.concat([newShape])
  newShape = []
  console.log('shapes', shapes)
}

const sketch = event => {
  console.log(draw)
  if (!draw) return
  
  ctx.beginPath()
  // ctx.lineWidth = 2
  ctx.moveTo(coord.x, coord.y)
  getPosition(event)
  ctx.lineTo(coord.x, coord.y)
  ctx.stroke()
  newShape = newShape.concat({x: coord.x, y: coord.y})
  
  console.log('newShape', newShape)

}

const drawLines = () => {
  shapes.forEach(arr => {
    ctx.beginPath()
    arr.forEach((coord, index) => {
      ctx.moveTo(coord.x, coord.y)
      console.log(index)
      if (index < arr.length - 1) {
        ctx.lineTo(arr[index + 1].x, arr[index + 1].y)
        ctx.stroke()
        ctx.closePath()
        return
      }
      ctx.lineTo(arr[index].x, arr[index].y)
      ctx.stroke()
      ctx.closePath()
      console.log('shapes', shapes)
    })
  })
}

pencil.addEventListener('click', () => {
  canvas.addEventListener('mousedown', startDrawing)
  canvas.addEventListener('mouseup', stopDrawing)
  canvas.addEventListener('mousemove', sketch)
})

undo.addEventListener('click', () => {
  shapes = shapes.slice(0, shapes.length-1)
  ctx.clearRect(0, 0, canvas.width, canvas.height)
  drawLines()
})