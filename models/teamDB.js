/* *****************************************************************
* Diese Datei gehört zum imuk3-webeng-Musterprojekt                *
*  Copyright (c) von Robert Barensteiner                                 *
* Kostenlos zu benutzen für WebEng-Studierende dieses Semesters   *
******************************************************************** */

module.exports = function(orm, db) {
  db.define("mitarbeiter", {
    bild: { type: "text" },
    vorname: { type: "text" },
    nachname: { type: "text" },
    job: { type: "text" },
    alter: { type: "text" },
    mail: { type: "text" }
  });
};