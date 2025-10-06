/* *****************************************************************
* Diese Datei gehört zum webeng-Musterprojekt                      *
*  Copyright (c) von Robert Barensteiner                                 *
* Kostenlos zu benutzen für WebEng-Studierende dieses Semesters   *
******************************************************************** */

var teamDAO = require('../daos/teamDAO.js');

module.exports = {
  get: function(req, res, next) {

    var data = teamDAO.get(req, res, function(err, data) {

      if (err) return next(err);
      res.send(data);

    });
  },

  getall: function(req, res, next) {

    teamDAO.get(req, res, function(err, data) {

      if (err) return next(err);
      res.send(data);

    });
  },

  create: function(req, res, next) {

    teamDAO.create(req, res, function(err, data) {
      if (err) return next(err);
      res.send(data);

    });
  },

  update: function(req, res, next) {

    teamDAO.update(req, res, function(err, data) {

      if (err) return next(err);
      if (data) { res.send(data) } else { res.end(); }

    });
  },

  delete: function(req, res, next) {

    teamDAO.delete(req, res, function(err, data) {

      if (err) return next(err);
      res.send(data);
      res.end();

    });
  }
}