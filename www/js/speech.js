
recognition.onerror =(event) =>{
    console.log('Fehler: ' + event.error);
    say("FEHLER: " + event.errror);
    alert("FEHLER: " + event.error);
    console.log('Additional information: ' + event.message);

};