var stext = "";
const sprachanim = document.getElementById("sprachanim");
var userName = localStorage.getItem("Benutzer");
var userTown = localStorage.getItem("user-Town");
const screenbreite = window.screen.width;
const englishweather = ["fog", "clear sky", "scattered clouds", "few clouds", "broken clouds", "snow", "overcast clouds", "mist", "haze", "light rain", "rainy", "moderate rain", "light intensity drizzle", "light snow"];
const deutschweather = ["nebelig", "klar", "vereinzelnt bewölkt", "wolkig", "aufgelockert bewölkt", "schneebedeckt", "bedeckte Wolken", "nebelig", "düster", "leicht regnerisch", "regnerisch", "mäßiger Regen", "niselig", "schneelich"];

//init things ._.
var synth = window.SpeechSynthesis;
var msg = new SpeechSynthesisUtterance();
var recognition = new webkitSpeechRecognition() || new SpeechRecognition();

window.onerror = (event) => {
    console.error(event.error);
}


//onload
window.onload = () => {
    loaduserdata();
    say("Willkommen " + userName);
    navigator.mediaDevices.getUserMedia({ audio: true })
        .then(function (stream) {
            console.log('Mikrofon erlaubt.')
        })
        .catch(function (err) {
            console.log('Mikrofon nicht erlaubt.')
        })

    if (!localStorage.Benutzer) {
        namechange();
    }
    if (screenbreite < 452) {
        sprachanim.setAttribute("diasbled",true);
    }
};

function admin() {
     document.getElementById("debugDiv").style.display =""
}

function back() {
    document.getElementById("start").style.display = "none";
}

//save function
function saveuser() {
    localStorage.setItem("Benutzer", userName);
    localStorage.setItem("user-Town", userTown);
};

function loaduserdata() {
    console.log(userName);
    console.log(userTown);
}

//keine Benutzerdaten vorhanden
function namechange() {
    userName = prompt("Bitte gebe deinen namen ein:");
    if (userName != null) {
        say("Willkommen " + userName);
        saveuser();
    }
    else {
        say("Du hast keinen Namen eingegeben. Bitte gebe deinen Namen ein!");
        namechange();
    }
}

//Sprachanim
msg.onend = () => { sprachanim.classList.add("stopanim") };

//Kommunikation mit Benutzer
function say(stext) {
   // sprachanim.classList.remove("stopanim");
    if (screenbreite > 452) {
        msg.text = stext;
        window.speechSynthesis.speak(msg);
    }
    else {
        alert(stext);
    }
}
function startconv() {
const satz = ["hallo", "test", "wie geht es dir", "kitt", "hilfe", "wie", "fehler", "freut mich", "offline", "tschüss", "englisch", "hörst du mich"]
const antwort = ["Hallo", "Erfolgreich", "Naja, den Umständen entsprechend.", "ja?", "Wie kann ich ihnen helfen?", "Was wie?", "Verstehe nicht was Sie meinen. Mir geht es prächtig!", "Freut mich, dass es dich freut!", "Gehe offline. Bis später!", 'Alles klar. Bin mal weg. Bis später ', "Kann ich. Wenn Sie mit mir englisch sprechen wollen, drücken Sie die Taste S1.", "Klar und deutlich!"]
changemode(normalbutton);
    let prompt1 = prompt("Wie kann ich ihnen helfen?");
    if (prompt1 === null) {
        changemode(autocruise);
        say("Sie dürfen sich nun zurücklehnen.");
        return;
    }
    else if (prompt1 == "wetter") {
        weather();
        return;
    } else {
        for (let i = 0; i < satz.length; i++) {
            if (prompt1 == satz[i]) {
                alert(antwort[i]);
            }
        }
    }
    startconv();
}

function weather() {
    if (userTown == "null" || userTown == undefined || userTown == "") {
        userTown = prompt("Bitte gebe deine Stadt hier ein:");
        saveuser();
    }
    else {
        fetch('https://api.openweathermap.org/data/2.5/weather?q=' + userTown + '&appid=50a7aa80fa492fa92e874d23ad061374')
            .then(response => response.json())
            .then(data => {
                var tempValue = data['main']['temp'];
                var nameValue = data['name'];
                var descValue = data['weather'][0]['description'];
                var len = englishweather.length;
                for (let i = 0; i < len; i++) {
                    if (descValue == englishweather[i]) {
                        say(`In ${nameValue} ist es ${deutschweather[i]}`);
                        console.log(`In ${nameValue} ist es ${deutschweather[i]}`);
                        changemode(autocruise);
                    }
                }
            })
    }
    return;
}

function resetapp() {
    let text;
    if (confirm("Sind Sie sicher, dass Sie die App zurücksetzen möchten?") == true) {
        text = "ACHTUNG: App wird zurückgesetz!"
        sessionStorage.clear();
        window.close();
    }
    else {
        text = "Reset abgebrochen."
    }
}
function changebackcolor(bgcolor) {
    let bcolor = document.getElementById("board").style.backgroundColor;
    if (bgcolor == "white") {
        document.getElementById("board").style.backgroundColor = "white";
    }
    else if (bgcolor == "black") {
        document.getElementById("board").style.backgroundColor = "black";
    }
    else if (bcolor == "white") {
        document.getElementById("board").style.backgroundColor = "black";
    }
    else if (bcolor == "black") {
        document.getElementById("board").style.backgroundColor = "white";
    }
}
