/* *****************************************************************
* Diese Datei gehört zum imuk3-webeng-Musterprojekt                *
*  Copyright (c) von Maya Perschke und Bernice Welens                            *
* Kostenlos zu benutzen für WebEng-Studierende dieses Semesters   *
******************************************************************** */

module.exports = function (orm, db) {
    db.define('katzenDB', {
    cover:   { type: 'text'},
		name:    { type: 'text'},
		geschlecht:   { type: 'text'},
		alter:   { type: 'text'},
	  rasse:   { type: 'text'},
    persönlichkeit:   { type: 'text'},
    });
};