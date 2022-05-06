import { canvas, ctx } from './canvas'

let coord = {
  x: 0,
  y: 0
}

const getPosition = (event, coord) => {
  coord.x = event.clientX - canvas.offsetLeft
  coord.y = event.clientY - canvas.offsetTop
}

const drawShapes = shapes => {
  shapes.forEach((arr, index) => {
    switch (arr.type) {
      case 'path':
        ctx.beginPath()
        ctx.moveTo(arr.paths[index].x, arr.paths[index].y)
        ctx.lineWidth = arr.lineWidth
        ctx.strokeStyle = arr.color
        arr.paths.forEach((e, index) => {
        if (index < arr.paths.length - 1) {
          ctx.lineTo(arr.paths[index + 1].x, arr.paths[index + 1].y)
          
          return
        }
  
        ctx.lineTo(arr.paths[index].x, arr.paths[index].y)
        ctx.stroke()
        ctx.closePath()
        console.log('shapes', shapes)
      })

      break
  
    case 'rectangle':
      ctx.lineWidth = arr.lineWidth
      ctx.strokeStyle = arr.color
      ctx.strokeRect(arr.paths[0].x, arr.paths[0].y, arr.width, arr.height)
      
      break

    case 'circle':
      ctx.beginPath()
      ctx.lineWidth = arr.lineWidth
      ctx.strokeStyle = arr.color
      ctx.arc(arr.paths[0].x, arr.paths[0].y, Math.abs(arr.radius), 0, Math.PI / 180 * 360)
      ctx.stroke()
      ctx.closePath()

      break
    }
  })
}

export {
  getPosition,
  drawShapes,
  coord
}