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
        const sql = "insert into department (dname, loc) values (?, ?)";
        const input_data = ["Node학과", "공학관"];
        const [result1] = await dbcon.query(sql, input_data);
        console.log("저장된 데이터의 수: " + result1.affectedRows);
        console.log("생성된 PK값: " + result1.insertId);

        const [result2] = await dbcon.query("update department set dname=? where deptno=?", ["수정학과", result1.insertId]);
        console.log("수정된 데이터의 수: " + result2.affectedRows);

        const [result3] = await dbcon.query("delete from department where deptno=?", [result1.insertId]);
        console.log("삭제된 데이터의 수: " + result3.affectedRows);
    } catch (err) {
        console.log(err);
        dbcon.end();
        return;
    }
    dbcon.end();
})()