const path = require('path');

module.exports = {
    log: {
        debug: {
            path: path.join(__dirname, "../_files/_logs"),
            level: 'debug'
        },
        error: {
            path: path.join(__dirname, "../_files/_logs"),
            level: 'error'
        }
    }
}