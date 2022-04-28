const pencil = document.querySelector('.toolbar__pencil')
const canvas = document.getElementById('canvas')
console.log('canvas', canvas)
const ctx = canvas.getContext('2d')
let coord = {
  x: 0,
  y: 0
}
let draw = false

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

const stopDrawing = () => draw = false

const sketch = event => {
  if (!draw) return

  ctx.beginPath()
  // ctx.lineWidth = 2
  ctx.moveTo(coord.x, coord.y)
  getPosition(event)
  ctx.lineTo(coord.x, coord.y)
  ctx.stroke()
}

pencil.addEventListener('click', () => {
  canvas.addEventListener('mousedown', startDrawing)
  canvas.addEventListener('mouseup', stopDrawing)
  canvas.addEventListener('mousemove', sketch)
})
