import { ctx, widthRange, colorPicker, clearCanvas } from './canvas'
import { getPosition, drawShapes, coord } from './utils'

let draw = false
let path = null
let tempPath = null
let startX
let startY

const startDrawingRect = event => {
  draw = true
  path = {
    type: 'rectangle',
    paths: [],
    lineWidth: widthRange.value,
    color: colorPicker.value
  }

  getPosition(event, coord)

  startX = coord.x
  startY = coord.y
}

const sketchRect = (event, shapes) => {
  if (!draw) {
    return
  }

  getPosition(event, coord)

  let width = coord.x - startX
  let height = coord.y - startY
  
  clearCanvas()
  drawShapes(shapes)
  ctx.lineWidth = widthRange.value
  ctx.strokeStyle = colorPicker.value
  ctx.strokeRect(startX, startY, width, height)

  tempPath = { x: coord.x, y: coord.y }
  path.paths = path.paths.concat(tempPath)
  path = { ...path, width: width, height: height }
}
  
const stopDrawingRect = onStopped => {
  draw = false
  onStopped(path)
  tempPath = null
  ctx.strokeStyle = colorPicker.value
}

export {
  startDrawingRect,
  stopDrawingRect,
  sketchRect
}