import { startDrawingLine, stopDrawingLine, sketchLine } from './path'
import { startDrawingRect, stopDrawingRect, sketchRect } from './rectangle'
import { startDrawingCircle, stopDrawingCircle, sketchCircle } from './circle'
import { canvas, ctx } from './canvas'
import { drawShapes } from './utils'

const pencil = document.querySelector('.toolbar__pencil')
const rectangle = document.querySelector('.toolbar__rectangle')
const circle = document.querySelector('.toolbar__circle')
const undo = document.querySelector('.toolbar__undo')
let shapes = []
let selectedTool = null

canvas.addEventListener('mousedown', event => {
  switch (selectedTool) {
    case 'pencil':
      return startDrawingLine(event)
    case 'rect':
      return startDrawingRect(event)
    case 'circle':
      return startDrawingCircle(event)
    default:
      return null
  }
})

canvas.addEventListener('mouseup', () => {
  switch (selectedTool) {
    case 'pencil':
      return stopDrawingLine(path => {
        shapes = shapes.concat(path)
      })
    case 'rect':
      return stopDrawingRect(path => {
        drawShapes(shapes)
        shapes = shapes.concat(path)
      })
    case 'circle':
      return stopDrawingCircle(path => {
        drawShapes(shapes)
        shapes = shapes.concat(path)
      })
    default:
      return null
  }
})

canvas.addEventListener('mousemove', event => {
  switch (selectedTool) {
    case 'pencil':
      return sketchLine(event)
    case 'rect':
      return sketchRect(event, shapes)
    case 'circle':
      return sketchCircle(event, shapes)
    default:
      return null
  }
})

pencil.addEventListener('click', () => {
  selectedTool = 'pencil'
})

rectangle.addEventListener('click', () => {
  selectedTool = 'rect'
})

circle.addEventListener('click', () => {
  selectedTool = 'circle'
})

undo.addEventListener('click', () => {
  shapes = shapes.slice(0, shapes.length - 1)
  ctx.clearRect(0, 0, canvas.width, canvas.height)
  drawShapes(shapes)
})

