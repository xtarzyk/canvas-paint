import { startDrawing, stopDrawing, sketch } from './path'
import { startDrawingRect, stopDrawingRect, sketchRect } from './rectangle'
import { canvas, ctx } from './canvas'
import { drawShapes } from './utils'

const pencil = document.querySelector('.toolbar__pencil')
const rectangle = document.querySelector('.toolbar__rectangle')
const undo = document.querySelector('.toolbar__undo')
// let coord = {
//   x: 0,
//   y: 0
// }
// let draw = false
// let startX
// let startY
let shapes = []
// let path = null
// let tempPath = null

// widthRange.value = 1
// colorPicker.value = 'black'


pencil.addEventListener('click', () => {
  canvas.addEventListener('mousedown', event => startDrawing(event))
  canvas.addEventListener('mouseup', () => stopDrawing(path => {
    shapes = shapes.concat(path)
    console.log(shapes)
  }))
  canvas.addEventListener('mousemove', event => sketch(event))
})

rectangle.addEventListener('click', () => {
  canvas.addEventListener('mousedown', event => startDrawingRect(event))
  canvas.addEventListener('mouseup', () => stopDrawingRect((path) => {
    drawShapes(shapes)
    shapes = shapes.concat(path)
    console.log(shapes)
  }))
  canvas.addEventListener('mousemove', event => sketchRect(event, shapes))
})

undo.addEventListener('click', () => {
  shapes = shapes.slice(0, shapes.length - 1)
  ctx.clearRect(0, 0, canvas.width, canvas.height)
  drawShapes(shapes)
  console.log(shapes)
})

