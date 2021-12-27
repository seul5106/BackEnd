module.exports = (app) => {
    const logger = require('../../helper/LogHelper');
    const fileHelper = require("../../helper/FileHelper")
    const config = require('../../helper/_config');
    const router = require('express').Router();
    const path = require('path');
    const multer = require("multer");
    const thumbnail = require("node-thumbnail").thumb;
    const multipart = multer({
        storage: multer.diskStorage({
            destination: (req, file, callback) => {
                fileHelper.mkdirs(config.upload.dir);
                fileHelper.mkdirs(config.thumbnail.dir);
                console.debug(file);

                file.dir = config.upload.dir.replace(/\\/gi, "/");
                callback(null, config.upload.dir);
            },

            filename: (req, file, callback) => {
                const extName = path.extname(file.originalname);
                const saveName = new Date().getTime().toString() + extName.toLowerCase();
                file.savename = saveName;
                file.path = path.join(file.dir, saveName);
                file.url = path.join(config.upload.path, saveName).replace(/\\/gi, "/");
                if (req.file instanceof Array) {
                    req.file.push(file);
                } else {
                    req.file = file;
                }
                callback(null, saveName);
            }

        }),

        limits: {
            files: config.upload.max_count,
            fileSize: config.upload.max_size
        },

        fileFilter: (req, file, callback) => {
            let mimetype = file.mimetype;

            if (mimetype.indexOf("image/") == -1) {
                const err = new Error();
                err.result_code = 500;
                err.result_msg = "이미지 파일만 업로드 가능합니다.";
                return callback(err);
            }
            callback(null, true);
        },
    });
    router.route("/upload/simple").post((req, res, next) => {
        const upload = multipart.single("myphoto");

        upload(req, res, async(err) => {
            let result_code = 200;
            let result_msg = "ok";

            if (err) {
                if (err instanceof multer.MulterError) {
                    switch (err.code) {
                        case "LIMIT_FILE_COUNT":
                            err.result_code = 500;
                            err.result_msg = "업로드 가능한 파일 수를 초과했습니다.";
                        case "LIMIT_FILE_SIZE":
                            err.result_code = 500;
                            err.result_msg = "업로드 가능한 파일 용량을 초과했습니다.";
                        default:
                            err.result_code = 500;
                            err.result_msg = "알 수 없는 에러가 발생했습니다.";
                            break;
                    }
                }
                logger.error(err);
                result_code = err.result_code;
                result_msg = err.result_msg;
            }
            for (let i = 0; i < (config.thumbnail.sizes).length; i++) {
                const v = config.thumbnail.sizes[i];
                logger.debug(v);
                const thumb_options = {
                    source: req.file.path,
                    destination: config.thumbnail.dir,
                    width: v,
                    prefix: "thumb_",
                    suffix: "_" + v + "w",
                    override: true
                };

                const basename = req.file.savename;
                const filename = basename.substring(0, basename.lastIndexOf("."));
                const thumbname = thumb_options.prefix + filename + thumb_options.suffix + path.extname(basename);

                const key = v + "w";

                if (!req.file.hasOwnProperty("thumbnail")) {
                    req.file.thumbnail = {};
                }

                req.file.thumbnail[key] = "/thumb/" + thumbname;

                try {
                    await thumbnail(thumb_options);
                } catch (error) {
                    console.error(error);
                }
            }
            const result = {
                rt: result_code,
                rtmsg: result_msg,
                item: req.file
            }

            res.status(result_code).send(result);
        });
    });

    router.route("/upload/multiple").post((req, res, next) => {
        req.file = [];
        const upload = multipart.array("myphoto");

        upload(req, res, (err) => {
            let result_code = 200;
            let result_msg = "ok";

            if (err) {
                if (err instanceof multer.MulterError) {
                    switch (err.code) {
                        case "LIMIT_FILE_COUNT":
                            err.result_code = 500;
                            err.result_msg = "업로드 가능한 파일 수를 초과했습니다.";
                        case "LIMIT_FILE_SIZE":
                            err.result_code = 500;
                            err.result_msg = "업로드 가능한 파일 용량을 초과했습니다.";
                        default:
                            err.result_code = 500;
                            err.result_msg = "알 수 없는 에러가 발생했습니다.";
                            break;
                    }
                }
                logger.error(err);
                result_code = err.result_code;
                result_msg = err.result_msg;
            }
            const thumb_size_list = [640, 750, 1020];
            req.file.map((v, i) => {
                thumb_size_list.map(async(w, j) => {
                    const thumb_options = {
                        source: v.path,
                        destination: config.thumbnail.dir,
                        width: w,
                        prefix: "thumb_",
                        suffix: "_" + w + "w",
                        override: true
                    };

                    const basename = v.savename;
                    const filename = basename.substring(0, basename.lastIndexOf("."));
                    const thumbname = thumb_options.prefix + filename + thumb_options.suffix + path.extname(basename);

                    const key = w + "w";

                    if (!req.file.hasOwnProperty("thumbnail")) {
                        v.thumbnail = {};
                    }

                    v.thumbnail[key] = "/thumb/" + thumbname;

                    try {
                        await thumbnail(thumb_options);
                    } catch (error) {
                        console.error(error);
                    }
                })
            })

            const result = {
                rt: result_code,
                rtmsg: result_msg,
                item: req.file
            }

            res.status(result_code).send(result);
        });
    });
    return router;
}