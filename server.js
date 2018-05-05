const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

const port = process.env.PORT || 3000;
var app = express();

hbs.registerPartials(__dirname + '/views/partials');
app.set('view engine', 'hbs');

//#region Handlers
// app.use((req, res, next) => {
//     res.render('maintenance.hbs');
// });

app.use((req, res, next) => {
    let now = new Date().toString();
    let log = `${now}: ${req.method} ${req.url}`;
    fs.appendFile('server.log', log + '\n', (err) => {
        console.log(err);
    });
    next();
});

app.use(express.static(__dirname + '/public'));
//#endregion Handlers

hbs.registerHelper('getCurrentYear', () => {
    return new Date().getFullYear();
});

hbs.registerHelper('screamIt', (text) => {
    return text.toUpperCase();
});

app.get('/', (req, res) => {
    // res.send('<h1>Hello Express!</h1>');
    res.render('home.hbs', {
        pageTitle: 'Home Page',
        welcomeMessage: 'Welcome to the site!'
    });
});

app.get('/maintenance', (req, res) => {
    res.render('maintenance.hbs');
});

app.get('/about', (req, res) => {
    res.render('about.hbs', {
        pageTitle: 'Passed in About Page'
    });
});

app.get('/bad', (req, res) => {
    // res.send('<h1>Hello Express!</h1>');
    res.send({
        errorCode: 404,
        errorMessage: 'This is a bad request'
    });
});

app.listen(port, () => {
    console.log(`Server started on port ${port}`);
});

