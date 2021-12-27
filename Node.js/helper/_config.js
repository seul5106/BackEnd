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
    },
    server_port: 3217,

    public_path: path.join(__dirname, "../public"),
    favicon_path: path.join(__dirname, "../public/favicon.png"),
    cookie_domain: "",

    secure: {
        cookie_encrypt_key: "1234567890",
        session_encrypt_key: "1234567890"
    },

    sendmail_info: {
        host: "smtp.gmail.com",
        port: 465,
        secure: true,
        auth: { user: "seul5106@gmail.com", pass: "idqrhqrfzcnbohzy" }
    },

    upload: {
        path: "/upload",
        dir: path.join(__dirname, "../_files/upload"),
        max_size: 1024 * 1024 * 20,
        max_count: 10
    },

    thumbnail: {
        sizes: [640, 750, 1020],
        dir: path.join(__dirname, "../_files/thumb")
    }
};