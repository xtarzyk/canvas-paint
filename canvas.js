const canvas = document.getElementById('canvas')
console.log('canvas', canvas)
const ctx = canvas.getContext('2d')
const widthRange = document.querySelector('.width-range')
const colorPicker = document.querySelector('.color-picker')

canvas.setAttribute('width', `${canvas.scrollWidth}`)
canvas.setAttribute('height', `${canvas.scrollHeight}`)

export {
  canvas,
  ctx,
  widthRange,
  colorPicker
}