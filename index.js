const { faker } = require('@faker-js/faker');
const mysql = require('mysql2');
const express = require('express');
const app = express();
const path = require('path');

app.set("view engine", "ejs")
app.set("views", path.join(__dirname, "views"))

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    database: 'delta_app',
    password:"889342"
  });

app.get('/', (req, res) =>{
    let q = "SELECT * FROM record" ;
    try {
        connection.query(q, (error, result)=>{
            // console.log(result);
            if(error) throw error;
            let data = result;
            console.log(data);
            res.render("index.ejs", {data} );
        })
    } catch (error) {
        res.send("error")
    }
    // res.render("index.ejs");
  }
)
// app.get('/', (req, res) => {
//     res.render("index.ejs",{result});
// })

// connection.end();


const PORT = 8080;
app.listen(PORT, (req, res) => {
    console.log(`listening at http://localhost:${PORT}`);
});