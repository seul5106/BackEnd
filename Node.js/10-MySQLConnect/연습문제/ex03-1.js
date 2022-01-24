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
        const sql = "SELECT s.studno, s.name, s.deptno, d.dname, d.loc FROM student s, department d WHERE s.deptno=d.deptno; ";
        const [result1] = await dbcon.query(sql);
        console.log("EQUI JOIN을 사용하여 학생 테이블과 부서 테이블의 학번, 이름, 학과번호, 소속 학과 이름, 학과 위치를 출력하시오.")
        result1.map((v, i) => {
            console.log("%d, %s, %s, %s, %s", v.studno, v.name, v.deptno, v.dname, v.loc);
        });
        console.log("----------------------------");
        console.log("102번 학과에 다니는 학생들에 대한 학번, 이름, 학과번호, 소속 학과 이름, 학년을 EQUI JOIN으로 출력하시오.")
        const [result2] = await dbcon.query("SELECT s.studno, s.name, s.deptno, d.dname, s.grade FROM student s, department d WHERE s.deptno=d.deptno AND s.deptno=102 ORDER BY s.grade;")
        result2.map((v, i) => {
            console.log("%d, %s, %s, %s, %s", v.studno, v.name, v.deptno, v.dname, v.grade);
        });
        console.log("----------------------------");
        console.log("20101번 학생과 같은 학년이고, 20101번 학생의 키보다 큰 키를 갖는 학생의 이름, 학년, 키를 조회하시오.")
        const [result3] = await dbcon.query("SELECT name, grade, height FROM student WHERE grade = (SELECT grade FROM student WHERE studno=?) AND   height > (SELECT height FROM student WHERE studno=?)", [20101, 20101]);
        result3.map((v, i) => {
            console.log("%s, %d, %d", v.name, v.grade, v.height);
        });
        console.log("----------------------------");
        console.log("학과 이름에 ‘공학’이라는 단어를 포함하고 있는 학과에 재학중인 학생의 학번, 학과이름, 학년, 학생이름을 조회하시오")
        const [result4] = await dbcon.query("SELECT studno, dname, grade, name FROM student s INNER JOIN department d ON s.deptno=d.deptno WHERE s.deptno IN (SELECT deptno FROM department WHERE dname LIKE ?)", ['%공학%'])
        result4.map((v, i) => {
            console.log("%d, %s, %d, %s", v.studno, v.dname, v.grade, v.name);
        });
        console.log(result1)
    } catch (err) {
        console.log(err);
        dbcon.end();
        return;
    }
    dbcon.end();
})()