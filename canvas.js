const canvas = document.getElementById('canvas')
const ctx = canvas.getContext('2d')
const widthRange = document.querySelector('.width-range')
const colorPicker = document.querySelector('.color-picker')

canvas.setAttribute('width', `${canvas.scrollWidth}`)
canvas.setAttribute('height', `${canvas.scrollHeight}`)

widthRange.value = 1
colorPicker.value = 'black'

export {
  canvas,
  ctx,
  widthRange,
  colorPicker
}