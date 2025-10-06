/* *****************************************************************
* Diese Datei gehört zum webeng-Musterprojekt                      *
*  Copyright (c) von Bernice Welens & Maya Perschke                *
* Kostenlos zu benutzen für WebEng-Studierende dieses Semesters   *
******************************************************************** */


var katzenDAO=require('../daos/katzenDAO.js');

module.exports = {
    //Lesen
    get: function (req, res, next) {
        console.log("serviceKatzen.js --> get");
        var data=katzenDAO.get(req,res, function(err,data){
            if(err) return next(err);
            res.send(data);
        });
    },
    
    getall: function (req, res, next) {
        console.log("serviceKatzen.js --> getall");
        
        katzenDAO.getall(req,res, function(err,data){
            if(err) return next(err);
            res.send(data);
        });
    },
    //Anlegen
    create: function (req, res, next) {
        console.log("serviceKatzen.js --> create");
        katzenDAO.create(req,res, function(err,data){
            if(err) return next(err);
            res.send(data);
        });
    },
    // Ändern
    update: function(req, res, next){
        console.log("serviceKatzen.js --> update");
        katzenDAO.update(req,res, function(err, data){
            if(err) return next(err);
            if(data){res.send(data)} else {res.end();}
        });
    },
    //Löschen
    delete: function(req, res, next){
        console.log("serviceKatzen.js --> delete");
        katzenDAO.delete(req,res, function(err,data){
            if(err) return next(err);
            res.send(data);
            res.end();
        });
    },
    
};

