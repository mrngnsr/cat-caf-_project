const multer = require("multer");

module.exports = function(app, controllers) {

  //Routing zur Home-Page (unterschiedliche Routes, aber ein hardkodierter Service)
  app.get('/', controllers.serviceUtils.index);
  app.get('/index', controllers.serviceUtils.index);

  //Services
  app.get('/service_istEingelogged', controllers.serviceUtils.istEingelogged);
  app.get('/service_rollenAbfrage', controllers.protect.readRoles);


  //Standard für Login und Logout
  app.get('/erfolg.html', controllers.serviceUtils.durchreichen);
  //--> Anmeldung
  app.get('/login', controllers.protect.login);
  app.post('/login', controllers.protect.loginSet);
  //--> Registrierung
  app.get('/signinBasic.html', controllers.serviceUtils.durchreichen);
  app.post('/signin', controllers.protect.signinSet);
  //--> Abmeldung
  app.get('/logout', controllers.protect.logout);

  //Hilfsroutes 
  app.get('/generalInterface.html', controllers.serviceUtils.durchreichen);
  app.get('/pics/*', controllers.serviceUtils.durchreichen);
  app.get('/uploads/*', controllers.serviceUtils.durchreichen);
  app.get('/fonts/*', controllers.serviceUtils.durchreichenBackend);
  app.get('/*.js', controllers.serviceUtils.durchreichenBackend);
  app.get('/*.css', controllers.serviceUtils.durchreichenBackend);
  app.get('/index-*.html', controllers.serviceUtils.durchreichen);
  app.get('/buch-*.html', controllers.serviceUtils.durchreichen);
  app.get('/dyn*.html', controllers.serviceUtils.durchreichen);
  app.get('/uebung-*.html', controllers.serviceUtils.durchreichen);
  app.get('/plenum-*.html', controllers.serviceUtils.durchreichen);


  //Routing zum serviceBuecher-Controller ohne REST mit generalInterface.html
  app.post('/buch-lesen/:id', controllers.serviceBuecher.get);
  app.post('/buecher-lesen', controllers.serviceBuecher.getall);
  app.post('/buch-anlegen', controllers.serviceBuecher.create);
  app.post('/buch-aendern/:id', controllers.serviceBuecher.update);
  app.post('/buch-loeschen/:id', controllers.serviceBuecher.delete);

  //Katzen: Routing zum serviceKatzen-Controller ohne REST mit generalInterface.html
  /*app.post('/katze-lesen/:id', controllers.serviceKatzen.get);
  app.post('/katzen-lesen', controllers.serviceKatzen.getall);
  app.post('/katze-anlegen', controllers.serviceKatzen.create);
  app.post('/katze-aendern/:id', controllers.serviceKatzen.update);
  app.post('/katze-loeschen/:id', controllers.serviceKatzen.delete);
  app.get('/katzen-CRUD-aendern.html', controllers.serviceUtils.durchreichen);*/

  //Routing zum serviceBuecher-Controller mit REST
  app.get('/buchladen-webapp-kaufen.html', controllers.serviceUtils.durchreichen);
  app.get('/buch-kaufen/:id', controllers.serviceBuecher.get);
  app.get('/buch-kaufen', controllers.serviceBuecher.getall);
  app.post('/buch-kaufen', controllers.serviceBuecher.create);
  app.put('/buch-kaufen/:id', controllers.serviceBuecher.update);
  app.delete('/buch-kaufen/:id', controllers.serviceBuecher.delete);

  //Katzen: Routing zum serviceKatzen-Controller mit REST
  app.get('/katzen-CRUD-aendern.html', controllers.serviceUtils.durchreichen);
  app.get('/katzen/:id', controllers.serviceKatzen.get);
  app.get('/katzen', controllers.serviceKatzen.getall);
  app.post('/katzen', controllers.serviceKatzen.create);
  app.put('/katzen/:id', controllers.serviceKatzen.update);
  app.delete('/katzen/:id', controllers.serviceKatzen.delete);

  //Routing: Team -> serviceTeam.js no rest
  /*app.post("/team-get/:id", controllers.serviceTeam.get);
  app.post("/team-getall", controllers.serviceTeam.getall);
  app.post("/team-create", controllers.serviceTeam.create);
  app.post("/team-update/:id", controllers.serviceTeam.update);
  app.post("/team-delete/:id", controllers.serviceTeam.delete);
  app.get("/team.html", controllers.serviceUtils.durchreichen);*/

  //Routing: Team -> serviceTeam.js rest
  app.get("/team.html", controllers.serviceUtils.durchreichen);
  app.get("/team/:id", controllers.serviceTeam.get);
  app.get("/team", controllers.serviceTeam.getall);
  app.post("/team/", controllers.serviceTeam.create);
  app.put("/team/:id", controllers.serviceTeam.update);
  app.delete("/team/:id", controllers.serviceTeam.delete);

  //Routing zum serviceSpeisekarte-Controller mit REST
  app.get('/css_speiseplanFunktionierendMitAllem.html', controllers.serviceUtils.durchreichen);
  app.get('/speiseplan/:id', controllers.serviceSpeisekarte.get);
  app.get('/speiseplan', controllers.serviceSpeisekarte.getall);
  app.post('/speiseplan/', controllers.serviceSpeisekarte.create);
  app.put('/speiseplan/:id', controllers.serviceSpeisekarte.update);
  app.delete('/speiseplan/:id', controllers.serviceSpeisekarte.delete);

  
  //Geschützte Bereiche
  app.get('/rolle_beispiele.html', controllers.serviceUtils.durchreichen);
  app.get('/rolle_fuerAlle.html', controllers.serviceUtils.durchreichen);
  //Alle zu schützenden Seiten müssen auf den protect-Controller geroutet werden!
  //Nur nach erfolgreichem Login wird die angegebene URL vom Server an den Client geschickt:
  //--> Spezialfall: Geschützte Bereiche für z.B. Benutzer mit Rolle "mitglied":
  //Routing zum enterprise-Controller
  app.get('/rolle_nurNachLogin.html', controllers.protect.secure);
  app.get('/rolle_nurNachLoginAlsMitglied.html', controllers.protect.secureMitglied);


  // Generiere Liste aller Dateinamen in einem Ordner
  app.get('/filesInFolder/:folder', controllers.serviceUtils.filesInFolder);

  app.get('*', controllers.serviceUtils.durchreichen);

  app.get('/drop', controllers.serviceUtils.drop);


  console.log("Server wurde gestartet!");

};
