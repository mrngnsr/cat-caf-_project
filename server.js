require('express-orm-mvc')({
    mode: 'development',           //default: production
    path: __dirname,               //default: auto detect
    express: require('express'),   //specify your express version
    orm: require('orm')            //specify your orm version
},
function(error, mvc) {
    if(error)
        return console.log(error);
    console.log('Server wird gestartet');
    console.log('Mode: %s', mvc.mode);
    console.log('Port: %s', mvc.settings.port);
});

