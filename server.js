const express = require('express');
var mysql = require('mysql');
var path = require('path');
var bodyParser = require('body-parser');
const app = express();
var port = process.env.PORT || 3000;
app.use(bodyParser.json());
app.use('/public', express.static(path.join(__dirname, 'public')));
var connection = mysql.createConnection({
    host     : process.env.CLEARDB_HOST || 'localhost',
    user     : process.env.CLEARDB_USERNAME || 'root',
    password : process.env.CLEARDB_PASSWORD || '',
    database : process.env.CLEARDB_DATABASE || 'test'
});
app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname + "/public/html_files/index.html"));
});
app.get('/userspage', function(req, res) {
    res.sendFile(path.join(__dirname + "/public/html_files/users.html"));
});
app.get('/events', function(req, res) {
    res.sendFile(path.join(__dirname + "/public/html_files/MyEvents.html"));
});
app.delete('/delete', function(req, res) {
    connection.query(
        "DELETE FROM users WHERE userName = '"+req.body.username+"'", 
        function (err, result) {
            if (err) throw err;
            res.send(result);
        });
});
app.get('/users', function(req, res) {
    connection.query(
        "SELECT userName, password, email FROM users", 
        function (err, result) {
            if (err) throw err;
            res.send(result);
        }
    );
});
app.post('/users', function(req, res) {
    connection.query(
        "SELECT userName, password, email FROM users WHERE userName = '" + req.body.userName + "'", 
        function (err, result) {
            if (err) throw err;
            if (result.length > 0) {
                console.log("UPDATE users SET email = '" + req.body.email + "', password = '" + req.body.password + "' WHERE username = '" + req.body.userName + "'");
                connection.query(
                    "UPDATE users SET email = '" + req.body.email + "', password = '" + req.body.password + "' WHERE username = '" + req.body.userName + "'", 
                    function (err) {
                        if (err) {
                            throw err;
                        }
                        res.send('user has been updated');
                    }
                );
            }
            else {
                connection.query(
                    "INSERT INTO users (userName, email, password) VALUES  ('" + req.body.userName + "','" + req.body.email + "','" + req.body.password + "')", 
                    function (err) {
                        if (err) {
                            throw err;
                        }
                        res.send('user has been inserted');
                    }
                );
            }
        }
    );
                
});
app.listen(port, () => console.log('Example app listening on port!' + port));