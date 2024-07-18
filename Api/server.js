const express = require('express');
const mysql = require('mysql2');
const bcrypt = require('bcrypt');
const cors = require('cors');
const dotenv = require('dotenv');

//initiate app

const app = express();

//setting up middleware

app.use(express.json());
app.use(cors());
dotenv.config();

//creating a connection to database server

const db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD
});

//connection to databse server
db.connect((err) =>{
    //if no connection
    if(err) return console.log(err);
    //connection
    console.log('Connected to server');

    //create a database
    db.query('CREATE DATABASE IF NOT EXISTS Tracker', (err, result) =>{
        //no creation
        if(err) return console.log(err);
        //creation
        console.log('Database created');
    });
    //select our databse
    db.changeUser({database: 'Tracker'}, (err, result) =>{
        //error selecting db
        if(err) return console.log(err);
        //selection sucess
        console.log('Tracker selected');
        //Create table
        const users = `
            CREATE TABLE IF NOT EXISTS users (
                id INT AUTO_INCREMENT PRIMARY KEY,
                email VARCHAR(100) NOT NULL UNIQUE,
                username VARCHAR(50) NOT NULL,
                password VARCHAR(255)
                )
        `;

        db.query(users, (err, result) =>{
            //if not created
            if(err) return console.log(err);
            //if created
            console.log('users table created');
        })
    });
});

//user registration route

app.post('/Api/Register', async(req, res) =>{
    try{
        const users = ` SELECT * FROM users WHERE email = ?`
        //check if user exists
        db.query(users, [req.body.email], (err, data) =>{
            //user with same email in database
            if(data.length > 0) return res.status(409).json("User already exists");
            //if we dont find user
            //hashing password
            const salt =bcrypt.genSaltSync(10)
            const hashedpassword = bcrypt.hashSync(req.body.password, salt)

            // create new user
            const newuser = `INSERT INTO users(email, username, password) VALUES(?)`
            value = [ req.body.email, req.body.username, hashedpassword ]

            db.query(newuser, [value], (err, data) =>{
                if(err) return res.status(400).json("something went wrong");

                return res.status(201).json("User created")
            })
        })
    }
    catch(err){
        res.status(500).json("Internal server")
    }
})
// user login route

app.post('/Api/Login', async(req, res) =>{

    try{
        //check for user
        const users =`SELECT * FROM users WHERE email = ?`
        db.query(users, [req.body.email], (err, data) => {
            //if no user exists
            if(data.length ===0) return res.status(404).json("User not found");
            //user exits
            //check for password
            const isPasswordvalid = bcrypt.compareSync(req.body.password, data[0].password)

            //if passwords dont match
            if(!isPasswordvalid) return res.status(400).json("Invalid Email/password");

            //if passwords match
            return res.status(200).json("login successful")

        } )
    }
    catch(err){
        return res.status(500).json("internal Server error")
    }

})

app.listen(3000, () =>{
    console.log('Server running on port 3000...')
})