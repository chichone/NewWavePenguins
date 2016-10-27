var express = require('express');
var bodyParser = require('body-parser');
var partials = require('express-partials');
var handler = require('./request-handler');
var generateTree = require('./tree-generator');

var express      = require('express');
var partials     = require('express-partials');
var handler      = require('./request-handler');
var passport     = require('passport');
var flash        = require('connect-flash');
var morgan       = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser   = require('body-parser');
var session      = require('express-session');


var db = require('./db/config');
var User = require('./db/models/User');
var Goal = require('./db/models/Goal');
var Task = require('./db/models/Task');

// server
var app = express();
app.use(express.static(__dirname + '/../client/app'));

// middleware
app.use(bodyParser.json());
app.use(morgan('dev')); // log every request to the console
app.use(cookieParser()); // read cookies (needed for auth)
app.use(bodyParser()); // get information from html forms

// required for passport
app.use(session({ secret: 'gaterade' })); // session secret
app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions
app.use(flash()); // use connect-flash for flash messages stored in session

//routes
app.get('/test/:goalId', generateTree.generateTree);

app.get('/', handler.getHandler);
app.get('/getGoals/:userId', handler.getGoals);
app.post('/signup', handler.signup);
app.post('/addTask', handler.addTask);
app.post('/addGoal', handler.addGoal);
app.put('/toggleTaskCompleted', handler.toggleTaskCompleted);
app.put('/makeTaskComplete', handler.makeTaskComplete);
app.put('/makeGoalComplete', handler.makeGoalComplete);
app.get('/getTasksOfGoal/:goalId', handler.getTasksOfGoal);
app.get('/getTasksOfTask/:parentIdx', handler.getTasksOfTask);
// app.get('/elemsOfGoal/:id', handler.getElemsOfGoal);


// listen
app.set('port', 3000);

app.listen(app.get('port'), function () {
  console.log('Listening on port ' + app.get('port') );
});
