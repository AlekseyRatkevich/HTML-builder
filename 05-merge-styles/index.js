const fs = require('fs')
const path = require('path')
const cssFolder = path.join(__dirname, 'styles')
const projFolder = path.join(__dirname, 'project-dist')
const bundleFile = path.join(projFolder, 'bundle.css')
const output = fs.createWriteStream(bundleFile)
const {
    stdout
} = process

//Создаём новый файл 
fs.open(bundleFile, 'w', (err) => {
    if (err) throw err
    stdout.write(`\n Создан файл: ${bundleFile}\n`)
})

//Чтение исходного каталога
fs.readdir(cssFolder, (err, files) => {
    if (err) {
        console.log(err)
    } else {
        files.forEach(file => {
            let curFile = path.join(cssFolder, file)
            fs.stat(curFile, function (err, stats) {
                if (stats.isFile()) {
                    const ext = path.extname(curFile)
                    if (ext === '.css') {
                        fs.readFile(curFile, 'utf8', (err, data) => {
                            if (err) throw err
                            // В конец файла записываем новые данные
                            fs.appendFile(bundleFile, data, (err) => {
                                if (err) throw err
                                stdout.write(`Добавлены данные из файла ${curFile}\n`)
                            })
                        })
                    }
                }
            })
        })
    }
})