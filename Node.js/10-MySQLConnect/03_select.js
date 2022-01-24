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
        const sql = "select deptno, dname, loc from department where deptno<=?";
        const input_data = [202];
        const [result1] = await dbcon.query(sql, input_data);
        result1.map((v, i) => {
            console.log("%d, %s, %s", v.deptno, v.dname, v.loc);
        });
    } catch (err) {
        console.log(err);
        dbcon.end();
        return;
    }
    dbcon.end();
})()