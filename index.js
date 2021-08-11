var globby = require('globby');
var fs = require('fs'), path = require('path')

module.exports = function enumDir(dir) {
    globby(dir + '/**/*.vue').then(list => list.map(parseVue))
}

var jsReg = /<script.*>[\s\S]*?export\s+default\s+(\{[\s\S]*\})\s*<\/script>/

function parseVue(vue) {
    fs.readFile(vue, { encoding: 'utf-8' }, (err, code) => {
        if (err) throw err;
        var js = code.match(jsReg);
        js = js && js[1]
        if (js) {
            var space = js.match(/ {2,}/) || '';
            if (space) space = space[0]
            var hasName = new RegExp('\\n' + space + '[\'"]?name[\'"]?:').test(js)
            if (!hasName) {
                code = code.replace(js, `{\n        name: '${toCompoName(vue)}',` + js.slice(1))
                fs.writeFile(vue, code, { encoding: 'utf-8' }, (err, code) => {
                    if (err) throw err;
                    else console.log('OK:\t' + vue)
                })
            }
        } else {
            console.error('no code found in ' + vue)
        }
    })
}

function toCompoName(fn) {
    return path.basename(fn, '.vue').replace(/[A-Z]/g, c => '-' + c.toLowerCase())
}

