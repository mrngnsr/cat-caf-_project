/* *****************************************************************
* Diese Datei gehört zum imuk3-webeng-Musterprojekt                *
*  Copyright (c) von Andrea Kohlhase                                 *
* Kostenlos zu benutzen für WebEng-Studierende dieses Semesters   *
******************************************************************** */

module.exports = function (orm, db) {
    db.define('speisekarteDB', {
		bild:   { type: 'text'},
    name: {type: 'text'},
		beschreibung:   { type: 'text'},
		allergene: { type: 'text'},
		preis:   { type: 'text'},
    id: {type: 'text'}
    });
};

