/* *****************************************************************
* Diese Datei gehört zum webeng-Musterprojekt                      *
*  Copyright (c) von Bernice Welens und Maya Perschke                                *
* Kostenlos zu benutzen für WebEng-Studierende dieses Semesters    *
******************************************************************** */

module.exports = {    
    get: function (req, res, next) {
        console.log("katzenDAO.js --> get");
        req.models.katzenDB.find({id: req.params.id}, function(err, data) {
            if(err) return next(err);
            if(data.length==0){
                console.log("Keinen Eintrag gefunden (id= " + req.params.id + ")");
                return next(err);
            } else {
                console.log("\t Zeile gelesen (id= " + req.params.id + ")");
                return next(null,data[0]);
            }
        });
    },
    getall: function (req, res, next) {
        console.log("katzenDAO.js --> getall");
        req.models.katzenDB.find(function(err, data) {
            if(err) return next(err);
            console.log("\t Alle Zeilen gelesen");
            return next(null, data);
        });
    },
    create: function (req, res, next) {
        console.log("katzenDAO.js --> create");
        var anfrage = req.body;
        console.log("\t Zeile zum anlegen (titel= " + anfrage.titel + ")");
        req.models.katzenDB.create({
           cover: anfrage.cover,
			  name: anfrage.name,
			  geschlecht: anfrage.geschlecht,
			  alter: anfrage.alter,
        rasse: anfrage.rasse,
        persönlichkeit: anfrage.persönlichkeit,
        }, function(err, data) {
            if(err) return next(err);
            console.log("\t Zeile angelegt (id= " + data.id + ")");
            return next(null, data);
        });
    },
    update: function(req, res, next){
        console.log("katzenDAO.js --> update");
        var myRequest = req.body;
        console.log(JSON.stringify(req.body));
        console.log("\t update fuer id= " + req.params.id + "!" 
                    +"\t mit titel=" + myRequest.titel +"!");
        req.models.katzenDB.find({
            id: req.params.id
        }).each(function (katze) {
            //myRequest-Parameter lesbar, weil wir den urlencoded-body-parser eingebunden haben
            katze.cover= myRequest.cover;
			   katze.name= myRequest.name;
			   katze.geschlecht= myRequest.geschlecht;
			   katze.alter= myRequest.alter;
        katze.rasse= myRequest.rasse;
          katze.persönlichkeit= myRequest.persönlichkeit;
			  
        }).save(function(err,data){
            if(err) return next(err);
            console.log("\t Zeile geändert (id= " + req.params.id + ")");
            return next();
        });
    },
    delete: function(req, res, next){
        console.log("katzenDAO.js --> delete (id=" + req.params.id + ")");
        req.models.katzenDB.find({id: req.params.id}).remove(function(err, data) {
            if(err) return next(err);
            console.log("\t Zeile entfernt (id= " + req.params.id + ")");
            return next(null,data);
        });
    },
    
};



