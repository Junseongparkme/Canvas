const canvas = document.querySelector('canvas')
const range = document.querySelector('input[type=range]')
const colors = document.querySelectorAll('.colors')
const fill_button = document.querySelector('#fill')
const save_button = document.querySelector('#save')
const erase_button = document.querySelector('#erase')

canvas.width = 700;
canvas.height = 700;

let isDrawingBegin = false;
let isDrawingEnd = false;

if (canvas.getContext) {
    const ctx = canvas.getContext('2d')
    ctx.fillStyle = 'white';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.strokeStyle = 'black';
    ctx.lineWidth = 7.5;

    function onMouseDown() {
        isDrawingBegin = true;
    }

    function onMouseUp() {
        isDrawingBegin = false;
    }

    function mouseDrag(e) {
        if (!isDrawingBegin) {
            ctx.beginPath()
            ctx.moveTo(e.offsetX, e.offsetY)
        } else {
            ctx.lineTo(e.offsetX, e.offsetY)
            ctx.stroke()
        }
    }

    function chagneRangeValue(e) {
        ctx.lineWidth = e.target.value
    }

    canvas.addEventListener('mousedown', onMouseDown)
    canvas.addEventListener('mouseup', onMouseUp)
    canvas.addEventListener('mousemove', mouseDrag)
    range.addEventListener('mouseup', chagneRangeValue)
    canvas.addEventListener('mouseleave', onMouseUp)

    function colorChange(e) {
        ctx.strokeStyle = e.target.style.backgroundColor
    }

    for(let i = 0; i < colors.length; i++) {
        colors[i].addEventListener('click', colorChange)
    }

    function clickFillButton() {
        ctx.rect(0, 0, canvas.width, canvas.height)
        ctx.fillStyle = ctx.strokeStyle;
        ctx.fill()
    }

    function clickSaveButton() {
        const imageFile = canvas.toDataURL();
        let link = document.createElement('a')
        link.download = 'Untitle.jpeg';
        link.href = imageFile;
        link.click();
    }

    function clickEraseButton() {
        ctx.rect(0, 0, canvas.width, canvas.height)
        ctx.fillStyle = 'white';
        ctx.fill()
    }

    fill_button.addEventListener('click', clickFillButton)
    save_button.addEventListener('click', clickSaveButton)
    erase_button.addEventListener('click', clickEraseButton)
}