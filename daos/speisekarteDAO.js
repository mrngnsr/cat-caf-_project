/* *****************************************************************
* Diese Datei gehört zum webeng-Musterprojekt                      *
*  Copyright (c) von Andrea Kohlhase                                 *
* Kostenlos zu benutzen für WebEng-Studierende dieses Semesters    *
******************************************************************** */

module.exports = {    
    get: function (req, res, next) {
        console.log("speisekarteDAO.js --> get");
        req.models.speisekarteDB.find({id: req.params.id}, function(err, data) {
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
        console.log("speisekarteDAO.js --> getall");
        req.models.speisekarteDB.find(function(err, data) {
            if(err) return next(err);
            console.log("\t Alle Zeilen gelesen");
            return next(null, data);
        });
    },
    create: function (req, res, next) {
        console.log("speisekarteDAO.js --> create");
        var anfrage = req.body;
        console.log("\t Zeile zum anlegen (titel= " + anfrage.titel + ")");
        req.models.speisekarteDB.create({
           bild: anfrage.bild,
			  name: anfrage.name,
			  beschreibung: anfrage.beschreibung,
          allergene: anfrage.allergene,
			  preis: anfrage.preis,
          id: anfrage.id,
        }, function(err, data) {
            if(err) return next(err);
            console.log("\t Zeile angelegt (id= " + data.id + ")");
            return next(null, data);
        });
    },
    update: function(req, res, next){
        console.log("speisekarteDAO.js --> update");
        var myRequest = req.body;
        console.log(JSON.stringify(req.body));
        console.log("\t update fuer id= " + req.params.id + "!" 
                    +"\t mit titel=" + myRequest.name +"!");
        req.models.speisekarteDB.find({
            id: req.params.id
        }).each(function (gericht) {
            //myRequest-Parameter lesbar, weil wir den urlencoded-body-parser eingebunden haben
            gericht.bild= myRequest.bild;
			   gericht.name= myRequest.name;
          gericht.beschreibung= myRequest.beschreibung;
          gericht.allergene= myRequest.allergene;
			   gericht.preis= myRequest.preis;
          gericht.id=myRequest.id;
			   
			  
        }).save(function(err,data){
            if(err) return next(err);
            console.log("\t Zeile geändert (id= " + req.params.id + ")");
            return next();
        });
    },
    delete: function(req, res, next){
        console.log("speisekarteDAO.js --> delete (id=" + req.params.id + ")");
        req.models.speisekarteDB.find({id: req.params.id}).remove(function(err, data) {
            if(err) return next(err);
            console.log("\t Zeile entfernt (id= " + req.params.id + ")");
            return next(null,data);
        });
    },
    
};



