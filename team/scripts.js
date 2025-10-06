var AData;

function anlegen() {

  datenArray[datenArray.length] = new Mitarbeiter($("#bild").val(), $("#vorname").val(), $("#nachname").val(), $("#job").val(), $("#alter").val(), $("#mail").val());

  $.post("/team", Mitarbeiter, function(data) {

    lesenAusArray();
    wechselnMaske("datenMaske", "");

  })
}

function aendern(eintrag) {

  var nMitarbeiter = new Mitarbeiter($("#bild").val(), $("#vorname").val(), $("#nachname").val(), $("#job").val(), $("#alter").val(), $("#mail").val());
  aendernState = 0;

  $.put("/team/" + AData[eintrag].id, nMitarbeiter, function(data) {
    lesenAusArray();
    wechselnMaske("datenMaske", "");

  })
}

function wechselnMaske(maske, eintrag) {

  if (eintrag === "") {

    $("[id^=bild]").val("");
    $("[id^=vorname]").val("");
    $("[id^=nachname]").val("");
    $("[id^=job]").val("");
    $("[id^=alter]").val("");
    $("[id^=mail]").val("");

    $("#eingabeMaske form").attr("action", "javascript:anlegen()");

  } else {

    $("[id^=bild]").val(datenArray[eintrag].bild);
    $("[id^=vorname]").val(datenArray[eintrag].vorname);
    $("[id^=nachname]").val(datenArray[eintrag].nachname);
    $("[id^=job]").val(datenArray[eintrag].job);
    $("[id^=alter]").val(datenArray[eintrag].alter);
    $("[id^=emailinput]").val(datenArray[eintrag].mail);

    $("#eingabeMaske form").attr("action", "javascript:aendern(" + eintrag + ")");

  }

  $(".maske").hide();
  $("." + maske).show();
  console.log("test");

}

function lesenAusArray() {

  $("#datenMaskeZeilen").empty();
  var mitarbeiter = "";
  $.get("/team", function(data) {
    AData = data;
    for (var i = 0; i < datenArray.length; i++) {

      mitarbeiter =
        `<div class="inline">
          <div class="buttondiv">
            <button class="indivbutton aushilfe verwaltung" onclick="wechselnMaske('eingabeMaske', ${i})">
              Ändern
            </button>
            <button class="indivbutton verwaltung" onclick="löschen(${i})">
              Löschen
            </button>
          </div>
          <div id="ArrayItems">
            ${erzeugeMitarbeiterSpalten(AData[i])}
          </div>
        </div>`
      $("#datenMaskeZeilen").append(mitarbeiter);
      updateDisplay();
    }
  });
}

function erzeugeMitarbeiterSpalten(objekt) {

  var MitarbeiterSpalte = "";
  MitarbeiterSpalte = `
                      <div class="zeiltext" id="bilddiv">
                      <img id="personalimage" src="${objekt.bild}" alt="Person" width="70%" height="70%"/>
                      </div>
                      <div class="zeiltext" id="namediv">${objekt.vorname} ${objekt.nachname}</div>
                      <div class="zeiltext" id="jobdiv">${objekt.job}</div>
                      <div class="zeiltext  id="alterdiv">${objekt.alter} Jahre alt</div>
                      <div class="zeiltext" id="maildiv">${objekt.mail}</div>
                     `

  return MitarbeiterSpalte;

}

function löschen(index) {

  var confirmation = confirm(datenArray[index].vorname + " " + datenArray[index].nachname + "löschen?");
  if (confirmation) {

    $.delete("/team/" + AData[index].id, function(data) {
      lesenAusArray();
    })
  }
}

function setValidate() {

  $("#password").rules("add",
    {
      required: true,
      messages: {
        required: "Bitte geben Sie ein Passwort ein",
      }
    }
  )

  $("#username").rules("add",
    {
      required: true,
      messages: {
        required: "Bitte geben Sie einen Benutzernamen ein",
      }
    }
  )

}

function login() {

  console.log($("#user").prop("checked"));
  if ($("#loginForm").valid()) {

    var logData = {
      "user": $("#username").val(),
      "password": $("#password").val()

    };
    $.post("/login", logData, function(data) {

      if (data === true) {

        wechselnMaske("datenMaske", "");
        lesenAusArray();
        updateDisplay();

      } else {

        alert("login failed");

      }
    });

    /*if ($("#user").prop("checked")) {
      loggedstate = 1;
    }
    if ($("#aushilfe").prop("checked")) {
      loggedstate = 2;
    }
    if ($("#verwaltung").prop("checked")) {
      loggedstate = 3;
    }
    
    console.log(loggedstate);
    wechselnMaske("datenMaske", "");
    lesenAusArray();
    updateDisplay();*/

  }
}

function logout() {

  $.get("/logout", function(data) {

    if (data === true) {

      wechselnMaske("datenMaske", "");
      lesenAusArray();
      updateDisplay();

    } else {

      alert("Logout failed");

    }
  });
}

function updateDisplay() {

  $.get("service_istEingelogged", function(data) {

    if (data === true) {

      $("#loginButton").hide();
      $("#logoutButton").show();
      $(".aushilfe").show();
      $(".verwaltung").show();

    } else {

      $("#loginButton").show();
      $("#logoutButton").hide();
      $(".aushilfe").hide();
      $(".verwaltung").hide();

    }
  });

  /*
  console.log("update Display");
  $("#loginButton").show();
  $("#logoutButton").hide();
  $(".aushilfe").hide();
  $(".verwaltung").hide();
  if (loggedstate >= 1) {
    $("#loginButton").hide();
    $("#logoutButton").show();
    console.log("user");
    if (loggedstate >= 2) {
      $(".aushilfe").show();
      console.log("aushilfe");
      if (loggedstate >= 3) {
        $(".verwaltung").show();
        console.log("verwaltung");
      }
    }
  }*/

}

function Mitarbeiter(bild, vorname, nachname, job, alter, mail) {

  this.bild = bild;
  this.vorname = vorname;
  this.nachname = nachname;
  this.job = job;
  this.alter = alter;
  this.mail = mail;

}
