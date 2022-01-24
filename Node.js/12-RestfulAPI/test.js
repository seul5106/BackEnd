const hello = () => {
    return (req, res, next) => {
        req.asdf = () => {
            for (let i = 0; i < 10; i++) {
                let s = "";
                for (let j = 0; j < i + 1; j++) {
                    s += "*";
                }
                console.log(s);
            }
        };
        next();
    };
};

module.exports = hello;