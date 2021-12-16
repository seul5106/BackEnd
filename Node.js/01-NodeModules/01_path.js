const path = require("path");

const currentPath = path.join("C:/Users/hello/world", "myphoto", "../photo.jpg");
console.group("path.join");
console.debug(currentPath);
console.groupEnd();

const dirname = path.dirname(currentPath);
const basename = path.basename(currentPath);
const extname = path.extname(currentPath);
console.group("경로 분할하기");
console.debug('디렉토리 : %s', dirname);
console.debug('파일이름 : %s', basename);
console.debug('확장자 : %s', extname);
console.groupEnd();

const parse = path.parse(currentPath);
console.group("경로정보 파싱");
console.debug("%o", parse);
console.debug("root: ", parse.root);
console.debug("dir: ", parse.dir);
console.debug("name: ", parse.name);
console.debug("ext: ", parse.ext);
console.groupEnd();