import { canvas, ctx, widthRange, colorPicker } from './canvas'
import { getPosition, drawShapes, coord } from './utils'

let draw = false
let path = null
let tempPath = null
let startX
let startY

const getDistance = (startX, startY, coordX, coordY) => {
  return Math.sqrt(Math.pow(startX - coordX, 2) + Math.pow(startY - coordY, 2))
}

const startDrawingCircle = event => {
  draw = true
  path = {
    type: 'circle',
    paths: [],
    lineWidth: widthRange.value,
    color: colorPicker.value
  }
  getPosition(event, coord)
  startX = coord.x
  startY = coord.y
}

const sketchCircle = (event, shapes) => {
  if (!draw) {
    return
  }
  
  getPosition(event, coord)
  
  const radius = getDistance(startX, startY, coord.x, coord.y)
    
  ctx.clearRect(0, 0, canvas.width, canvas.height)
  drawShapes(shapes)
  ctx.beginPath()
  ctx.lineWidth = widthRange.value
  ctx.strokeStyle = colorPicker.value
  ctx.arc(startX, startY, Math.abs(radius), 0, Math.PI / 180 * 360)
  ctx.stroke()
  ctx.closePath()
  
  tempPath = { x: coord.x, y: coord.y }
  path.paths = path.paths.concat(tempPath)
  path = Object.assign(path, { radius: radius })
}

const stopDrawingCircle = onStopped => {
  draw = false
  onStopped(path)
  tempPath = null
  ctx.strokeStyle = colorPicker.value
}

export {
  startDrawingCircle,
  stopDrawingCircle,
  sketchCircle
}