/* *****************************************************************
* Diese Datei gehört zum imuk3-webeng-Musterprojekt                *
*  Copyright (c) von Andrea Kohlhase                            *
* Kostenlos zu benutzen für WebEng-Studierende dieses Semesters   *
******************************************************************** */

var path = require('path');
//var path=__dirname;  //|| "/home/ubuntu/workspace/projekt/views";
var mime=require('mime');
var fs = require("fs");

module.exports = {

    durchreichen: function (req, res, next) {
        console.log("serviceUtils.js --> durchreichen von " + req.url);
        var pathNew="../views";
       /* 
        //Content-Type setzen (wg. nosniff-MIME-Type-Fehler)
        //Wegen des "Die Ressource von "http://localhost:8080/*.css" wurde wegen eines MIME-Typ-Konfliktes ("text/html") blockiert (X-Content-Type-Options: nosniff)."-Errors
        if(req.url.indexOf(".css")!=-1){
        	console.log("Content-type auf text/css setzen");
        	res.type(".css");
        	//Unterordner für Stylesheets festlegen
        	pathNew=pathNew + "/stylesheets";
        } else if(req.url.indexOf(".js")!=-1){
        	console.log("Content-type auf text/javascript setzen");
        	//Unterordner für Javascript-Dateien festlegen
        	res.type(".javascript");
        	pathNew=pathNew + "/client-js";
        }
        */
        res.sendFile(path.join(__dirname,pathNew,req.url));
    },
    durchreichenBackend: function (req, res, next) {
        console.log("serviceUtils.js --> durchreichen von " + req.url);
        var pathNew="../views";
        //Content-Type setzen (wg. nosniff-MIME-Type-Fehler)
        //Wegen des "Die Ressource von "http://localhost:8080/*.css" wurde wegen eines MIME-Typ-Konfliktes ("text/html") blockiert (X-Content-Type-Options: nosniff)."-Errors
       /*
        if(req.url.indexOf(".css")!=-1){
        	console.log("Content-type auf text/css setzen");
        	res.type(".css");
        } else if(req.url.indexOf(".js")!=-1){
        	console.log("Content-type auf text/javascript setzen");
        	res.type(".javascript");
        }
        */
        var type=mime.getType(req.url);
        console.log("   URL  : " + req.url);
        console.log("   MIME : " + type);
        console.log("   FILE : " + path.join(__dirname,pathNew,req.url));
        //Setze den richtigen MIME-Typ
        res.type (type);
        res.sendFile(path.join(__dirname,pathNew,req.url));
    },
    index: function (req, res, next) {
        console.log("serviceUtils.js --> index");
        res.sendFile(path.join(__dirname,"../views","index.html"));
    },
    
     generalInterface: function (req, res, next) {
        console.log("serviceUtils.js --> generalInterface");
        res.sendFile(path.join(__dirname,"../views","generalInterface.html"));
    },
   
    bild: function (req, res, next) {
       console.log("serviceUtils.js --> bild");
		 const tempPath = req.file.path;
		 const targetPath = path.join(__dirname, "../views/uploads/" + req.file.originalname);
		 if (path.extname(req.file.originalname).toLowerCase() === ".png"||".jpg") {
			fs.rename(tempPath, targetPath, function(err,data){ 
				if(err) return next(err);
				res.send({msg:"File uploaded!", path:targetPath});
			});
		 } else {
			fs.unlink(tempPath, err => {
			  //if (err) return handleError(err, res);
			  if(err) return next(err);
			  res.send("Only specific file types allowed!");	
			});
		 }
	  },
        
    filesInFolder: function(req, res, next){
       console.log("serviceUtils.js --> filesInFolder von " + req.url);
       var pathNew="../views/" + req.params.folder;
       
       console.log("PathNew:" + path.join(__dirname,pathNew));
       fs.readdir(path.join(__dirname,pathNew), function (err, files){
          console.log("Files:" + files);
          res.send(files);
       })   
    },
   
    istEingelogged: function(req, res, next) {
        console.log("serviceUtils.js --> istEingelogged");
        var loggedIn = false;
        if(req.session.user_id){loggedIn=true}
        console.log("\t " + loggedIn);
        res.send(loggedIn);
    },
    drop: function(req, res, next){
        console.log("serviceUtils.js --> drop");
        var tableDBName=req.query.table;
        console.log("table= " + tableDBName);  
        console.log("Vorhandene Modelle: " + Object.keys(req.models))
        var tableDB=req.models[tableDBName];
        tableDB.drop(function(err, data) {
            console.log("ERROR: " + err)
            if(err) return next(err);
            //Im Erfolgsfall öffnet sich die Homepage        
            res.sendFile(path.join(__dirname,"../views","index.html"));
        });
    },

};
