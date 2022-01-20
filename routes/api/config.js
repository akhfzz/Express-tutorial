const exp = require('express');
const app = exp();
const session = require('express-session');
const cors = require('cors')

app.use(exp.urlencoded({extended: true}));
app.use(exp.json());
app.use(session({
    secret: 'iniPasswordKey',
    cookie: {maxAge: 30000, secure: false},
    saveUninitialized: true,
    resave: false,
    proxy:true
}))

module.exports = app