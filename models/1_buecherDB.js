/* *****************************************************************
* Diese Datei gehört zum imuk3-webeng-Musterprojekt                *
*  Copyright (c) von Andrea Kohlhase                                 *
* Kostenlos zu benutzen für WebEng-Studierende dieses Semesters   *
******************************************************************** */

module.exports = function (orm, db) {
    db.define('buecherDBGruppeProf', {
		titel:   { type: 'text'},
		autor:   { type: 'text'},
		zustand: { type: 'text'},
		preis:   { type: 'text'}
    });
};