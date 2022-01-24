const logger = require('./LogHelper');

module.exports = () => {
    return (req, res, next) => {
        req._getParam = (method, key, def = null) => {
            let value = null;

            if (method.toUpperCase() === 'GET') {
                value = req.query[key] || req.params[key] || def;
            } else {
                value = req.body[key] || def;
            }

            if (value === undefined) {
                value = def;
            }

            if (value !== null && typeof value == 'string') {
                value = value.trim();

                if (value.length === 0) {
                    value = def;
                }
            }

            logger.info("[HTTP %s Params] %s=%s", method, key, value);
            return value;
        };


        req.get = function(key, def) {
            return this._getParam("GET", key, def);
        };

        req.post = function(key, def) {
            return this._getParam("POST", key, def);
        };

        req.put = function(key, def) {
            return this._getParam("PUT", key, def);
        };

        req.delete = function(key, def) {
            return this._getParam("DELETE", key, def);
        };

        res.sendResult = (statusCode, message, data) => {
            const json = {
                "rt": statusCode,
                "rtmsg": message
            };

            if (data !== undefined) {
                for (const key in data) {
                    json[key] = data[key];
                }
            }

            json.pubdate = new Date().toISOString();
            res.status(statusCode).send(json);
        };

        res.sendJson = (data) => {
            res.sendResult(200, "OK", data);
        };

        res.sendError = (error) => {
            logger.error(error.name);
            logger.error(error.message);
            logger.error(error.stack);
            res.sendResult(error.statusCode, error.message)
        }

        next();
    }
}