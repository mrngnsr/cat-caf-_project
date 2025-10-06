/* *****************************************************************
 * Diese Datei gehört zum webeng-Musterprojekt                     *
 *  Copyright (c) von Andrea Kohlhase                                *
 * Kostenlos zu benutzen für WebEng-Studierende dieses Semesters *
 ******************************************************************** */
var userPropertiesPath = fullPath('../config/users.properties');
module.exports = {

    secure: function(req, res, next) {
        //Alle Anfragen für Dateien, die nur von eingeloggten Benutzern zu sehen sein sollen, werden in routes.js hierhin geleitet
        console.log("protect.js --> secure");
        //Die req.url muss einen existierenden Dateinamen enthalten, z.B. "index.html"
        req.session.wanted = req.url;
        req.session.role = "";
        console.log("\t gewünschte URL " + req.url +
            "\t dafür notwendige Berechtigung:" + req.session.role);
        checkAuth(req, res, next);
    },

    secureMitglied: function(req, res, next) {
        //Alle Anfragen für Dateien, die nur von Mitarbeitern zu sehen sein sollen, werden in routes.js hierhin geleitet
        console.log("protect.js --> secureMitglied");
        //Die req.url muss einen existierenden Dateinamen enthalten, z.B. "userBearbeiten.html"
        //var wanted=req.url.split("/secure/")[1];
        req.session.wanted = req.url;
        req.session.role = "mitglied";
        console.log("\t gewünschte URL: " + req.url +
            "\t dafür notwendige Berechtigung:" + req.session.role);
        checkAuth(req, res, next);
    },
   
    secureAdmin: function(req, res, next) {
        //Alle Anfragen für Dateien, die nur von Administratoren zu sehen sein sollen, werden in routes.js hierhin geleitet
        console.log("protect.js --> secureAdmin");
        //Die req.url muss einen existierenden Dateinamen enthalten, z.B. "userBearbeiten.html"
        //var wanted=req.url.split("/secure/")[1];
        req.session.wanted = req.url;
        req.session.role = "admin";
        console.log("\t gewünschte URL: " + req.url +
            "\t dafür notwendige Berechtigung:" + req.session.role);
        checkAuth(req, res, next);
    },

    
    loginSet: function(req, res, next) {
        //Dies wird nur vom Login-Button der Login-Form aus angefordert!
        console.log("protect.js --> loginSet");
        console.log("referer: " + req.headers.referer);
        console.log("url: " + req.url);
        console.log("wanted: " + req.session.wanted);
        //var myRequest = req.body;

        //Sind die eingegebenen Login-Daten richtig?
        if (checkLogin(req)) {
            //Falls diese Anfrage nicht durch Anklicken einer geschützten Seite
            //aufgerufen wurde, dann soll nur der Status verändert werden. Was
            //angezeigt wird, bestimmt der Client-Controller
            if (!req.session.wanted) {
                /* ako neu (21.06.22): req.session.wanted="/"+req.headers.referer.split("/")[3];
                console.log("\t wanted neu: " + req.session.wanted);*/
                res.send(true);
            }
            else {
                console.log("\t \t Login für '" + req.session.wanted + "' war erfolgreich!");
                res.sendFile(fullPath(req.session.wanted));
            }
        }
        else {
            if (!req.session.wanted) {
                //req.session.wanted="/"+req.headers.referer.split("/")[3];
                //console.log("\t wanted neu: " + req.session.wanted);
                res.send(false);
            }
            else {
                console.log("\t Login  für '" + req.session.wanted + "' war nicht erfolgreich");
                res.sendFile(fullPath("loginError.html"));
            }
        }
    },
    login: function(req, res, next) {
        //Dies wird nur vom Direkt-Login-Button aus angefordert!
        console.log("protect.js --> login");
        console.log("referer: " + req.headers.referer);
        console.log("url: " + req.url);
        console.log("wanted: " + req.session.wanted);
        //Nach dem Login soll wieder auf die Seite zurückgegangen werden,
        //von der aus das Login angefordert wurde
        if ((!req.session.wanted || req.session.wanted == "") && req.headers.referer.split("/")[3]) {
            console.log("wanted (neu):" + req.headers.referer.split("/")[3])
            req.session.wanted = "/" + req.headers.referer.split("/")[3];
        } else {req.session.wanted="/index.html"}
        if(req.session.role){req.session.role.delete;}
        console.log("\t Nach erfolgreicher Authentifizierung auf die Seite: " + req.session.wanted);
        checkAuth(req, res, next);
    },


    logout: function(req, res, next) {
        //Dies wird nur vom Direkt-Logout-Button aus angefordert und erfordert eine Success-Callback-Funktion!
        console.log("protect.js --> logout");
        console.log("referer: " + req.headers.referer);
        console.log("url: " + req.url);
        var userID = req.session.user_id;
        if (req.session.user_id) {
            delete req.session.user_id;
            delete req.session.user_roles;
            delete req.session.wanted;
            delete req.session.role;
            res.send(true);
        }
        else {
            console.log("\t ausgelogged ohne eingelogged zu sein ...")
            res.send(false);
        }
        //res.end("<div>logout erledigt</div>");
        //success-callback-Funktion wird benutzt statt res.redirect('/index.html');
        console.log("\t ausgelogged als " + userID);
    },
    logoutSet: function(req, res, next) {
        //Dies wird vom Direkt-Logout-Button aus angefordert und soll NUR ausloggen!
        console.log("protect.js --> logout");
        console.log("referer: " + req.headers.referer);
        console.log("url: " + req.url);
        var userID = req.session.user_id;

        if (req.session.user_id) {
            delete req.session.user_id;
            delete req.session.user_roles;
        }
        else {
            console.log("\t ausgelogged ohne eingelogged zu sein ...")
        }
        var wanted = "/" + req.headers.referer.split("/")[3];
        console.log("wanted: " + wanted);
        req.session.wanted = wanted;
        res.sendFile(fullPath("/" + wanted));
        console.log("\t ausgelogged als " + userID);
    },
    signinSet: function(req, res, next) {
        //Dies wird nur vom Signin-Button der Signin-Form aus angefordert!
        console.log("protect.js --> signinSet");
        //Nach der Registrierung wird auf diese Seite verzweigt
        req.session.wanted = "/";
        req.session.role = "";
        //Sind die eingegebenen Signin-Daten richtig?
        if (signIn(req)) {
            console.log("\t \t Registrierung war erfolgreich!");
            res.sendFile(fullPath("./loginBasic.html"));
        }
        else {
            console.log("\t Signin war nicht erfolgreich");
            res.send("Benutzername existiert schon!");
        }
    },
    readRoles: function(req, res, next) {
        console.log("Aufruf readRoles");
        var roles = "";
        if (req.session.user_roles) {
            roles = req.session.user_roles;
        }
        res.send(roles);
    }
};

// Authentication and Authorization Middleware
function checkAuth(req, res, next) {
    console.log("Aufruf checkAuth");
    //Überprüfung, ob der Benutzer bereits eingeloggt ist (d.h. schon authentifiziert wurde):
    if (!req.session.user_id) {
        console.log("\t Benutzer wurde noch nicht authentifiziert.");
        res.sendFile(fullPath("loginBasic.html"));
    }
    else {
        console.log("\t Benutzer wurde bereits authentifiziert.");
        //Jetzt wird Benutzer-Autorisierung überprüft:
        if (req.session.role) {
            console.log("\t req.session.role: " + req.session.role);
            if(req.session.role!=""){
               console.log("\t req.session.user_roles: " + req.session.user_roles.toString());
               if (checkRole(req.session.role, req.session.user_roles)) {
                  console.log("\t Autorisierung für " + req.session.wanted + " erfolgreich!");
                  res.sendFile(fullPath(req.session.wanted));
               }
               else {
                  console.log("\t Keine Autorisierung für " + req.session.wanted + " (notwendig: " + req.session.role + ")");
                  res.sendFile(fullPath("loginBasic.html"));
               }
            }
        }
        else {
            console.log("\t Keine Autorisierung für " + req.session.wanted + " notwendig.");
            res.sendFile(fullPath(req.session.wanted));
        }

    }
}


// Sind die Login-Daten korrekt?
function checkLogin(req) {
    console.log("Aufruf checkLogin");
    var returnValue = false;
    delete req.session.user_id;
    delete req.session.user_roles;
    var myRequest = req.body;

    var fs = require('fs'); // NodeJS Dateisystem Modul
    // Datei einlesen
    var data = fs.readFileSync(userPropertiesPath);
    //Jede gelesene Zeile ist ein eigenes Array-Element im userArray:
    var userArray = data.toString().split('\n');
    console.log(userArray);
    //Array durchlaufen
    for (var i = 0; i < userArray.length; i++) {
        var userName = "";
        var userPasswd = "";
        var userRollenArray = "";
        var userRolle = "";
        var user = userArray[i];
        //user existiert und es handelt sich nicht um eine Kommentarzeile
        if (user && !(user.indexOf("#")==0)) {
            userName = user.split(':')[0].trim();
            userPasswd = user.split(':')[1].split(',')[0].trim();
            userRollenArray = user.split(':')[1].split(',')[1].trim().split(';');
            console.log("users.properties: \n\t" + userName + ": " + userPasswd + ", " + userRollenArray.toString());
        
            //Stimmen die eingegebenen Login-Daten mit den in users.properties hinterlegten überein?
            if (myRequest.user === userName &&
                myRequest.password === userPasswd) {
                console.log("User " + myRequest.user + " hatte die passenden Login-Daten");
                if (req.session.role == "" || !req.session.role) {
                    req.session.user_id = myRequest.user;
                    //ako: Diese Zeile ist neu
                    req.session.user_roles = userRollenArray;
                    returnValue = true;
                }
                else {
                    //Überprüfe, ob der User auch berechtigt ist (d.h. die richtige Rolle besitzt):
                    if (checkRole(req.session.role, userRollenArray)) {
                        req.session.user_id = myRequest.user;
                        req.session.user_roles = userRollenArray;
                        console.log("\t" + userName + " ist eingelogged als '" + req.session.user_roles + "'.");
                        returnValue = true;
                    }
                    else {
                        console.log("\t" + userName + " konnte nicht als '" + req.session.role + "' eingeloggt werden.");
                        returnValue = false;
                    }
                }
                //Eintrag in users.properties wurde gefunden:
                break;
            }
        }
        else {
            //Falls es eine Leerzeile in users.properties gibt:
            console.log("userArray[" + i + "] existiert nicht.");
        }
    }

    return returnValue;
}

function checkRole(wanted, roleArray) {
    console.log("Aufruf checkRole");
    if (!roleArray) return false;
    if (wanted == "") return true;
    var returnValue = false;
    for (var j = 0; j < roleArray.length; j++) {
        if (wanted == roleArray[j]) {
            returnValue = true;
            //gewünschte Rolle wurde gefunden
            break;
        }
        else {
            returnValue = false;
        }
    }
    return returnValue;
}

function fullPath(path) {
    var returnValue = "";

    //var views = "/home/ubuntu/workspace/projekt/views";
    var pathObj = require('path');
    var views = pathObj.join(__dirname, "../views");

    if (path.indexOf("/") == 0) {
        returnValue = views + path;
    }
    else {
        returnValue = views + "/" + path;
    }
    return returnValue;
}

// Registrierung von Nutzern
function signIn(req) {
    console.log("Aufruf signIn");
    var returnValue = true;
    req.session.user_id = "";
    var myRequest = req.body;

    var fs = require('fs'); // NodeJS Dateisystem Modul
    // Datei einlesen
    var data = fs.readFileSync(userPropertiesPath);
    //Jede gelesene Zeile ist ein eigenes Array-Element im userArray:
    var userArray = data.toString().split('\n');
    //console.log(userArray);
    //Array durchlaufen
    for (var i = 0; i < userArray.length; i++) {
        var userName = "";
        var userPasswd = "";
        var userRollenArray = "";
        var userRolle = "";
        var user = userArray[i];
        if (user) {
            userName = user.split(':')[0].trim();
        }
        else {
            //Falls es eine Leerzeile in users.properties gibt:
            console.log("userArray[" + i + "] existiert nicht.");
        }
        //Stimmen die eingegebenen Login-Daten mit denen in users.properties hinterlegten überein?
        if (myRequest.user === userName) {
            //Eintrag in users.properties existiert schon:
            console.log("Der Username " + userName + " existiert schon. Wählen Sie bitte einen anderen Namen.");
            returnValue = false;
            break;
        }
    }
    if (returnValue) {
        var roles;
        if (myRequest.role1 != "") {
            roles = myRequest.role1;
            if (myRequest.role2 != "") {
                roles = roles + ";" + myRequest.role2;
                if (myRequest.role3 != "") {
                    roles = roles + ";" + myRequest.role3;
                }
            }
        }
        else {
            returnValue = false;
        }
        var entry = "\n" + myRequest.user + ": " + myRequest.password + ", " + roles;
        console.log("Nutzer: " + entry);
        fs.appendFile(userPropertiesPath, entry);
    }

    return returnValue;
};
