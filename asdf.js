const date1 = new Date();

let mm = date1.getMonth() + 1

if (parseInt(mm) < 10) {
    mm = "0" + mm;
}

let result = date1.getFullYear() + '-' + mm + "-" + date1.getDate();
console.log(result);