var body_parser = require('body-parser');
var logger = require('morgan');
var error_handler = require('errorhandler');
//Für geschützte Bereiche werden Sessions benutzt:
var session = require('express-session');


module.exports = function(app, express) {
    
    app.use(body_parser.urlencoded({
        extended: false
    }));
    //akoNew: parse application/json
    app.use(body_parser.json());
    
    app.use(logger('dev'));
    app.use(error_handler());
    
	app.use(express.static(__dirname + '../views'));
	 //app.use(express.static('/views'));
    //app.use(express.static('/views/client-js'));
    //app.use(express.static('/views/stylesheets'));
    //app.use(express.static(__dirname + "/views/stylesheets/"));
    //app.use(express.static(__dirname + '../views/client-js')); 
	
    //Ermöglicht verschlüsselte Sessions 
    app.use(session({
        secret:'Katzen und Essen einfach beste,nom nom ',
        resave: true,
        saveUninitialized: true
    }));
    
};