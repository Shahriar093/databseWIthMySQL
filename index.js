const { faker } = require('@faker-js/faker');
const mysql = require('mysql2');
const express = require('express');
const app = express();
const path = require('path');
const { error } = require('console');
var methodOverride = require('method-override')

app.set("view engine", "ejs")
app.set("views", path.join(__dirname, "views"))
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(methodOverride('_method'));
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    database: 'delta_app',
    password: "889342"
});

app.get('/', (req, res) => {
    let q = "SELECT * FROM record";
    try {
        connection.query(q, (error, result) => {
            // console.log(result);
            if (error) throw error;
            let data = result;
            // console.log(data);
            res.render("index.ejs", { data });
        })
    } catch (error) {
        res.send("error")
    }
}
)
app.get('/user/:id/edit', (req, res) => {
    let { id } = req.params;
    let q = `SELECT * FROM record WHERE id='${id}'`;
    // console.log(q);
    try {
        connection.query(q, (error, result) => {
            if (error) throw error;
            let user = result;
            // console.log(user);
            // res.send("check console")
            res.render("edit.ejs", { user });
        })
    } catch (error) {
        console.log(error);
    }
    // res.render("edit.ejs", { id });
})

//updating in DB
app.patch('/user/:id', (req, res) => {
    let { id } = req.params;
    let { username: NewUsername, id: NewID } = req.body;
    let q = `SELECT * FROM record WHERE id='${id}'`;
    // console.log(q);
    try {
        connection.query(q, (error, result) => {
            if (error) throw error;
            let user = result[0];
            if (user.id != NewID) {
                res.send("Wrong Pass");
            } else {
                let qupdate = `UPDATE record SET username='${NewUsername}' WHERE id='${NewID}'`;
                try {
                    connection.query(qupdate, (error, result) => {
                        if (error) throw error;
                        res.redirect('/');
                    })
                } catch (error) {
                    res.send(error);
                }
            }
            // console.log(user);

        })
    } catch (error) {
        console.log(error);
    }
})

// connection.end();
const PORT = 8080;
app.listen(PORT, (req, res) => {
    console.log(`listening at http://localhost:${PORT}`);
});