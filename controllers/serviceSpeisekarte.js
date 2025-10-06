/* *****************************************************************
* Diese Datei gehört zum webeng-Musterprojekt                      *
*  Copyright (c) von Andrea Kohlhase                                 *
* Kostenlos zu benutzen für WebEng-Studierende dieses Semesters   *
******************************************************************** */


var speisekarteDAO=require('../daos/speisekarteDAO.js');

module.exports = {
    
    get: function (req, res, next) {
        console.log("serviceSpeisekarte.js --> get");
        var data=speisekarteDAO.get(req,res, function(err,data){
            if(err) return next(err);
            res.send(data);
        });
    },
    
    getall: function (req, res, next) {
        console.log("serviceSpeisekarte.js --> getall");
        
        speisekarteDAO.getall(req,res, function(err,data){
            if(err) return next(err);
            res.send(data);
        });
    },
    
    create: function (req, res, next) {
        console.log("serviceSpeisekarte.js --> create");
        speisekarteDAO.create(req,res, function(err,data){
            if(err) return next(err);
            res.send(data);
        });
    },
    
    update: function(req, res, next){
        console.log("serviceSpeisekarte.js --> update");
        speisekarteDAO.update(req,res, function(err, data){
            if(err) return next(err);
            if(data){res.send(data)} else {res.end();}
        });
    },
    
    delete: function(req, res, next){
        console.log("serviceSpeisekarte.js --> delete");
        speisekarteDAO.delete(req,res, function(err,data){
            if(err) return next(err);
            res.send(data);
            res.end();
        });
    },
    
};

