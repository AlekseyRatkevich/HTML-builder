// Импорт всех требуемых модулей
const fs = require('fs')
const path = require('path')
const { stdout } = process

const oldDirectory = path.join(__dirname, 'files')
const newDirectory = path.join(__dirname, 'files-copy')

// Создание папки files-copy в случае если она ещё не существует
createDirectory(newDirectory).then((path) => {
    stdout.write(`\nНовая директория создана: ${path}\n`)
    // Если папка создана - выбираем файлы из неё
    selectFiles()
}).catch((error) => {
    console.log(`Problem creating directory: ${error.message}`)
})

function createDirectory(newDirectory) {
    const directory = path.normalize(newDirectory)
    return new Promise((resolve, reject) => {
        fs.stat(directory, (error) => {
            if (error) {
                if (error.code === 'ENOENT') {
                    fs.mkdir(directory, (error) => {
                        if (error) {
                            reject(error)
                        } else {
                            resolve(directory)
                        }
                    })
                } else {
                    reject(error)
                }
            } else {
                resolve(directory)
            }
        })
    })
}

// Чтение содержимого папки files
function selectFiles() {
    fs.readdir(oldDirectory, (err, files) => {
        if (err) {
            console.log(err)
        } else {
            files.forEach(file => {
                let curFile = path.join(oldDirectory, file)
                fs.stat(curFile, function (err, stats) {
                    //Проверяем файл ли это
                    if (stats.isFile()) {
                        // Копирование файлов из папки files в папку files-copy
                        const newFile = path.join(newDirectory, file)
                        copyFile(curFile, newFile)
                    }
                })
            })
        }
    })
}

function copyFile(source, target) {
    let cbCalled = false
    fs.createReadStream(source).pipe(fs.createWriteStream(target))
    stdout.write(`\nДанный файл скопирован: ${target}\n`)
}