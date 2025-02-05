const fs = require('fs')
const path = require('path')
const secretFolder = path.join(__dirname, 'secret-folder')

fs.readdir(secretFolder, (err, files) => {
    if (err) {
        console.log(err)
    } else {
        files.forEach(file => {
            let curFile = path.join(secretFolder, file)
            fs.stat(curFile, function (err, stats) {
                if (stats.isFile()) {
                    const ext = path.extname(curFile)
                    const name = path.basename(curFile, ext)
                    const size = stats["size"]
                    console.log(`${name} - ${ext.substring(1)} - ${size}kb`)
                }
            })
        })
    }
})