class BadRequestException extends Error {
    constructor(msg = "잘못된 요청 입니다.") {
        super(msg);
        this._statusCode = 400;
    }

    get statusCode() {
        return this._statusCode;
    }
}

module.exports = BadRequestException;