const airbutton = document.getElementById("airbutton");
const autocruise = document.getElementById("autocruise");
const normalbutton = document.getElementById("normal");
const pursuitbutton = document.getElementById("pursuit");
const buttonsound = document.getElementById("buttonsound");
const p1button = document.getElementById("p1");

function buttonpush() {
    buttonsound.play();
}

pursuitbutton.onclick = () => {
    changemode(pursuitbutton);

}

autocruise.onclick = () => {
    changemode(autocruise);
        say("Sie dürfen sich nun zurücklehnen.");
    recognition.stop;
}

normalbutton.onclick = () => {
    changemode(normalbutton);
    startconv();
}

airbutton.ondblclick = () => {
    userTown = prompt("Bitte gebe deine Stadt hier ein:");
    saveuser();
}

p1button.onclick = () => {
    buttonpush();
    darkmode();
}

airbutton.addEventListener("click", weather);

function darkmode() {
    let bcolor = document.getElementById("board").style.backgroundColor;
    if (bcolor == "black") {
        document.getElementById("board").style.backgroundColor = "white";
    }
    else {
        document.getElementById("board").style.backgroundColor = "black";
    }
}

function playsound(sID) {
    let s = document.getElementById("sound" + sID);
    s.play();
}

function changemode(bName) {
    normalbutton.classList.remove("activated");
    pursuitbutton.classList.remove("activated");
    autocruise.classList.remove("activated");
    normalbutton.classList.add("deactivated");
    pursuitbutton.classList.add("deactivated");
    autocruise.classList.add("deactivated");
    bName.classList.add("activated");
    buttonpush();
};