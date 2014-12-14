var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var multer  = require('multer');

var routes = require('./routes/index');
var csvupload = require('./routes/csvupload');
var stateservice = require('./routes/stateservice');
var urlshortner = require('./routes/urlshortner');
global.approotpath = __dirname;

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.engine('html', require('ejs').renderFile);

// uncomment after placing your favicon in /public
//app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(multer({
    dest: path.join(__dirname, '/public/data/'),
    rename: function (fieldname, filename) {
        return 'zipcodes';
    }
}));

app.use('/', routes);
app.use('/upload',csvupload.uploadfile);
app.use('/states',stateservice.getAllStates);
app.use('/getcoordinates',stateservice.getCoordinates);
app.use('/city',stateservice.getCityForStates);
app.use('/zipcode',stateservice.getZipCodesForCity);urlshortner
app.use('/encode',urlshortner.ecnodeurl);
app.use('/decode',urlshortner.decodeurl);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});


module.exports = app;
