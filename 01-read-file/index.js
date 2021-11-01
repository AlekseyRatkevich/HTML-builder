var fs = require('fs')

let ReadStream = fs.createReadStream(__dirname + '/text.txt', 'utf-8')

ReadStream.on('data', function(chunk) {
    console.log(chunk)
})