console.log("\n \n \n settings.js: \n Start des Servers beginnt ...")

var dbHost = process.env.HOST || 'w01299ec.kasserver.com'||'localhost';
var dbName = "d037994e";
var dbUser="d037994e"
    dbUser=dbUser.substring(0,16);
var dbPasswd="LpL488JqmguFFKQq";

var port = process.env.PORT || 8080;

console.log("!!!!!!!!!!!!!!!!!!!!!!!!!!!!!");
var zeit=new Date();
console.log("Zeit: " + zeit);
//console.log("process.env.HOST: " + process.env.HOST)
console.log("\t mySQL-Server: " + dbHost + "\n\t Datenbank: " + dbName + "\n\t User: " + dbUser + "\n\t Passwort: ***");
console.log("!!!!!!!!!!!!!!!!!!!!!!!!!!!!!");

module.exports = {
    development: {
        ip: dbHost, 
        port: port,
        db: {
            host: dbHost,
            port: 3306,
            protocol: 'mysql',
            user: dbUser,
            password: dbPasswd,
            database: dbName,
            connectionLimit: 100
        }
    },
    production: {
        ip: dbHost,
        port: port,
        db: {
            host: dbHost,
            port: 3306,
            protocol: 'mysql',
            user: dbUser,
            password: dbPasswd,
            database: dbName,
            connectionLimit: 100
        }
    }
};