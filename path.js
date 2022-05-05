import { getPosition, coord } from './utils'
import { ctx, widthRange, colorPicker } from './canvas'

let draw = false
let path = null
let tempPath = null

const startDrawingLine = (event) => {
  draw = true
  path = {
    type: 'path',
    paths: [],
    lineWidth: widthRange.value,
    color: colorPicker.value
  }

  getPosition(event, coord)
}
  
const stopDrawingLine = onStopped => {
  draw = false
  onStopped(path)
  tempPath = null
}

const sketchLine = event => {
  if (!draw) {
    return
  }
  
  ctx.beginPath()
  ctx.lineWidth = widthRange.value
  ctx.strokeStyle = colorPicker.value
  ctx.moveTo(coord.x, coord.y)
  getPosition(event, coord)
  ctx.lineTo(coord.x, coord.y)
  ctx.stroke()
  tempPath = { x: coord.x, y: coord.y }
  path.paths = path.paths.concat(tempPath)
}

export {
  startDrawingLine,
  stopDrawingLine,
  sketchLine
}