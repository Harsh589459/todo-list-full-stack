const mysql = require('mysql2')

const pool = mysql.createPool({
    host:'localhost',
    user:'root',
    database:'node-completee',//schemas name
    password:''
})

module.exports=pool.promise(); 