/* eslint-disable no-import-assign */
import { getPosition, coord } from './utils'
import { ctx, widthRange, colorPicker } from './canvas'

// let coord = {
//   x: 0,
//   y: 0
// }

let draw = false
let path = null
let tempPath = null

const startDrawing = (event) => {
  draw = true
  path = {
    type: 'path',
    paths: [],
    lineWidth: widthRange.value,
    color: colorPicker.value
  }
  getPosition(event, coord)
}
  
const stopDrawing = onStopped => {
  draw = false
  onStopped(path)
  tempPath = null
}

const sketch = (event) => {
  console.log(draw)
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

  console.log('tempPath', tempPath)
}

export {
  startDrawing,
  stopDrawing,
  sketch
}