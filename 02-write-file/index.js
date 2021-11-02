const fs = require('fs')
const path = require('path')
const fileName = path.join(__dirname, 'text.txt')
const output = fs.createWriteStream(fileName)

stdout.write('\n--- Пожалуйста, введите ваш текст:\n')
let resText = ''
stdin.on('data', data => {
    let curText = data.toString()
    if (curText.toUpperCase() === 'EXIT\r\n') {
        process.exit()
    } else {
        resText += curText
        output.write(curText)
    }
})

const { stdin, stdout } = process

process.on('SIGINT', () => {
    process.exit()
})
process.on('exit', () => {
    stdout.write('\n--- Файл сохранён.\r\nДо свидания!\r\n')
})