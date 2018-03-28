const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

var app = express();

hbs.registerPartials(__dirname + '/views/partials')
app.set('view engine', 'hbs');

// middleware
app.use((req, res, next) => {
  var now = new Date().toString(); // human-ly timestamp
  var log = `${now}: ${req.method} ${req.url}`
  console.log(log);
  fs.appendFileSync('server.log', log + '\n');
  next();
})

app.use((req, res, next) => {
  res.render('maintain.hbs');
})

// put after middleware to private /public
app.use(express.static(__dirname + '/public'));

// handlebar registerHelper
hbs.registerHelper('getCurrentYear', () => {
  return new Date().getFullYear();
})

app.get('/', (req, res) => {
  res.render('home.hbs', {
    pageTitle: 'Home Page',
    welcomeText: 'Welcome to my website!'
  });
});

app.get('/about', (req, res) => {
  res.render('about.hbs', {
    pageTitle: 'About Page'
  });
});

app.get('/bad', (req, res) => {
  res.send({
    errorMessage: 'Unable to handle request'
  });
});

app.listen(4000, () => {
  console.log('Server is up on port 4000');
});
