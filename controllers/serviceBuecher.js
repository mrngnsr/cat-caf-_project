/* *****************************************************************
* Diese Datei gehört zum webeng-Musterprojekt                      *
*  Copyright (c) von Andrea Kohlhase                                 *
* Kostenlos zu benutzen für WebEng-Studierende dieses Semesters   *
******************************************************************** */


var buchDAO=require('../daos/buecherDAO.js');

module.exports = {
    
    get: function (req, res, next) {
        console.log("serviceBuecher.js --> get");
        var data=buchDAO.get(req,res, function(err,data){
            if(err) return next(err);
            res.send(data);
        });
    },
    
    getall: function (req, res, next) {
        console.log("serviceBuecher.js --> getall");
        
        buchDAO.getall(req,res, function(err,data){
            if(err) return next(err);
            res.send(data);
        });
    },
    
    create: function (req, res, next) {
        console.log("serviceBuecher.js --> create");
        buchDAO.create(req,res, function(err,data){
            if(err) return next(err);
            res.send(data);
        });
    },
    
    update: function(req, res, next){
        console.log("serviceBuecher.js --> update");
        buchDAO.update(req,res, function(err, data){
            if(err) return next(err);
            if(data){res.send(data)} else {res.end();}
        });
    },
    
    delete: function(req, res, next){
        console.log("serviceBuecher.js --> delete");
        buchDAO.delete(req,res, function(err,data){
            if(err) return next(err);
            res.send(data);
            res.end();
        });
    },
    
};

