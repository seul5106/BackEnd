const mysql = require('mysql2');

const dbcon = mysql.createConnection({
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: 'root',
    database: "myschool"
});

dbcon.connect((error) => {
    if (error) {
        console.log("데이터베이스 접속에 실패했습니다.");
        console.log(error);
        return;
    }

    var sql = "UPDATE department SET loc=(?) WHERE loc=(?)";
    var input_data = ["5호관", "공학관"];

    dbcon.beginTransaction((error) => {
        dbcon.query(sql, input_data, (error, result) => {
            if (error) {
                dbcon.rollback();
                console.log("SQL문 실행에 실패했습니다");
                console.log(error);
                dbcon.end();
                return;
            }

            dbcon.commit();
            console.log("반영된 데이터의 수: " + result.affectedRows);
            console.log("생성된 PK값: " + result.insertId);
            dbcon.end();
        });
    });
});