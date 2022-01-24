const mysql = require('mysql2/promise');

(async() => {
    let dbcon = null;

    try {
        dbcon = await mysql.createConnection({
            host: 'localhost',
            port: 3306,
            user: 'root',
            password: 'root',
            database: "myschool"

        });
        await dbcon.connect();
    } catch (err) {
        console.log(err);
        return;
    }

    try {
        const sql = "insert into department (deptno, dname, loc) values (?, ?, ?)";
        const input_data = [103, "인터넷정보과", "공학관"];
        const [result1] = await dbcon.query(sql, input_data);
        console.log("저장된 데이터의 수: " + result1.affectedRows);
        console.log("생성된 PK값: " + result1.insertId);

        const [result2] = await dbcon.query("UPDATE department SET loc=? WHERE loc=?", ["5호관", "공학관"]);
        console.log("수정된 데이터의 수: " + result2.affectedRows);

        const [result3] = await dbcon.query("DELETE FROM department WHERE deptno >= ?", [300]);
        console.log("삭제된 데이터의 수: " + result3.affectedRows);
    } catch (err) {
        console.log(err);
        dbcon.end();
        return;
    }
    dbcon.end();
})()