const express = require('express');
const path = require('path');
const morgan = require('morgan');
const mysql = require('mysql');
const myConnection = require('express-myconnection');

const app = express();

//importando rutas
const customerRoute = require('./routes/customer');

app.set('port', process.env.PORT || 8000)
app.set('view  engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

//Middleware
app.use(morgan('dev'));
//configurando mysql
app.use(myConnection(mysql, {
    host: 'localhost',
    user: 'root',
    password: 'navarro',
    port: 3306,
    database: 'customersdb'

}, 'single'));
//nos permite entender todos los datos que vengan del formulario
app.use(express.urlencoded({extended:false}));//extended false es para que no envie imagenes ni datos complicadps

//rutas
app.use('/', customerRoute);

//archvos estaticos
app.use(express.static(path.join(__dirname, 'public')));


app.listen(3000, () => {
    console.log('server en puerto 3000');
})