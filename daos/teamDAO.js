/* *****************************************************************
* Diese Datei gehört zum webeng-Musterprojekt                      *
*  Copyright (c) von Robert Barensteiner                                 *
* Kostenlos zu benutzen für WebEng-Studierende dieses Semesters    *
******************************************************************** */

module.exports = {

  get: function(req, res, next) {

    console.log("teamDAO.js --> get");
    req.models.teamDB.find({
      id: req.params.id
    },
      function(err, data) {

        if (err) return next(err);
        return next(null, data[0]);

      });
  },



  get: function(req, res, next) {

    req.models.teamDAO.js.find({
      id: req.params.id
    },
      function(err, data) {
        if (err) return next(err);

      });
  },



  getall: function(req, res, next) {

    console.log("teamDAO.js --> getall");
    req.models.teamDB.find(function(err, data) {

      if (err) return next(err);
      return next(null, data);

    });
  },

  create: function(req, res, next) {

    console.log("teamDAO.js --> create");
    var anfrage = req.body;
    req.models.teamDB.create({

      bild: anfrage.bild,
      vorname: anfrage.vorname,
      nachname: anfrage.nachname,
      job: anfrage.job,
      alter: anfrage.alter,
      mail: anfrage.mail,

    },
      function(err, data) {

        if (err) return next(err);
        return next(null, data);

      });
  },

  update: function(req, res, next) {

    console.log("teamDAO.js --> update");
    var anrage = req.body;
    req.models.teamDB.find({

      id: req.params.id

    }).each(function(team) {

      team.bild = anrage.bild;
      team.vorname = anrage.vorname;
      team.nachname = anrage.nachname;
      team.job = anrage.job;
      team.alter = anrage.alter;
      team.mail = anrage.mail;

    }).save(function(err, data) {

      if (err) return next(err);
      return next();

    });
  },

  delete: function(req, res, next) {

    console.log("teamDAO.js --> delete");
    req.models.teamDB.find({

      id: req.params.id

    }).remove(function(err, data) {

      if (err) return next(err);
      return next(null, data);

    });
  }
};