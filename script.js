const canvas = document.querySelector('canvas')
const range = document.querySelector('input[type=range]')

if (canvas.getContext) {
    const ctx = canvas.getContext('2d')
    console.log(ctx)
    ctx.lineWidth = range.value
}