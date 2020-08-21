const mysql= require('mysql');
const bodyparser = require('body-parser');
const express=require('express');
const app=express();

app.use(bodyparser.json());


var dbCon=mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'root',
    database:'employeedb'
});

dbCon.connect((err)=>{
    if(!err)
    console.log('DB connection succeeded.');
    else
    console.log('DB connection failed \n Error : '+JSON.stringify(err,undefined,2));
});


app.listen(3000,()=>console.log('Express server is running at port no : 3000'));

//Get all employees
app.get('/employees',(req,res)=>{
    dbCon.query('SELECT * FROM EMPLOYEE',(err,rows,fields)=>{
        if(!err){
        res.send(rows);
        }
        else
        console.log(err);
    })
});


//Get specific employee by id
app.get('/employees/:id',(req,res)=>{
    dbCon.query('SELECT * FROM EMPLOYEE WHERE empid=?',[req.params.id],(err,rows,fields)=>{
        if(!err){
        res.send(rows);
        }
        else
        console.log(err);
    })
});


//delete employees
app.delete('/employees/:id',(req,res)=>{
    dbCon.query('DELETE FROM EMPLOYEE WHERE empid=?',[req.params.id],(err,rows,fields)=>{
        if(!err){
        res.send('Deleted Successfully');
        }
        else
        console.log(err);
    })
});


//Insert an employees
app.post('/employees', (req, res) => {
    let emp = req.body;
    var sql = 'insert into employee(name,empcode) value(?,?,?) where empid=? ';
    dbCon.query(sql, [emp.empid, emp.name, emp.empcode, emp.salary], (err, rows, fields) => {
        if (!err)
            rows.forEach(element => {
                if(element.constructor == Array)
                res.send('Inserted employee id : '+element[0].EmpID);
            });
        else
            console.log(err);
    })
});

//Update an employees
app.put('/employees', (req, res) => {
    let emp = req.body;
    var sql ='update employee(set empid,set name,set empcode) value(?,?,?) where ';
    dbCon.query(sql, [emp.empid, emp.name, emp.empcode, emp.salary], (err, rows, fields) => {
        if (!err)
            res.send('Updated successfully');
        else
            console.log(err);
    })
});