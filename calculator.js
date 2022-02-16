var actionFieldValue = ""; // Skaiciu reiksme esanti skaiciuotuvo veiksmu lange
var firstActionNumbers = 0; // Susikuriami kintamieji laikyti dviem veiksmu skaiciams su kuriais bus operuojama
var secondActionNumbers = 0;
var action = ""; // Kintamasis i kuri bus priskiriamas veiksmo pavadinimas po kiekvieno veiksmo mygtuko paspaudimo (+,-,x,/)
var actionField;
var negativeNumber = false; // Kitamasis nusakantis ar skaicius veiksmu lange yra neigiamas 

function pressNumber(number) { //Funkcija kvieciama kiekviena kart spaudziant skaiciaus mygtuka, kvieciant paduodamas skaicius "number"
    actionField = document.getElementById("actionField");
    if (actionFieldValue.length < 8) {
        if (number === 0 && actionFieldValue === "") { //Tikrinama ar spaudziant skaiciu 0 veiksmu lango reiksme yra tuscia, jei ji tuscia tada 0 nededamas i veiksmu reiksmiu kintamaji,
            actionFieldValue = ""; // nes nera tokiu skaiciu 01, 02, 03...
        } else {
            actionFieldValue = actionFieldValue + number.toString(); // Kitu atveju i veiksmu reiksmiu kintmaji yra idedama reiksme kuri susideda is jau turimos 
            actionField.innerHTML = actionFieldValue; // reiksmes ir naujai ivestos reiksmes (2 stringai sudedami i viena)
        }
    }
}

function pressC() {
    if (actionFieldValue !== "") { // Nunulinamos veiksmu reiksmes ir isvalomas skaiciuotuvo ekranas
        actionFieldValue = "";
        actionField.innerHTML = 0;
    }
}

function pressComma() { // Spaudziant kableli tikrinama ar veiksmu reiksmiu kintamasis yra tuscias, tokiu atveju pries kableli yra padedamas 0
    if (actionFieldValue === "") {
        actionFieldValue = "0.";
        actionField.innerHTML = actionFieldValue;
    }

    if (!actionFieldValue.includes(".")) { // Jei kablelis nera panaudotas reiksmiu kintamajame, formuojamas, kur po i stringo gala pridedamas kablelis
        actionFieldValue = actionFieldValue + ".";
        actionField.innerHTML = actionFieldValue;
    }
}

function actionButtonPressed(actionName) { // Kiekvieno veiksmo (+,-,x,/) paspaudimo metu yra gaunamas veiksmo pavadinimas
    if (actionFieldValue.includes(".")) { // Jei veiksmu stringas turi kableli, tada stringas konvertuojamas i Float duomenu tipa
        firstActionNumbers = parseFloat(actionFieldValue)
    } else {
        firstActionNumbers = parseInt(actionFieldValue); // jei kablelio nera, tuomet stringas konvertuojamas i Integer tipa.
    }
    actionFieldValue = ""; // Isvalomas veiksmu reiksmiu kintamasis
    action = actionName; // Priskiriamas veiksmo pavadinimas auksciau apibreztam kintamajam
}

function percentage() { // tam kad skaiciuoti procenta reikalinga ivesti skaiciu, paspausti koki nors veiksma (+,-,x,/), 
    if (actionFieldValue.includes(".")) { //  tuomet irasyti procento reiksme paspausti procento zenkla ir paspausti lygu
        secondActionNumbers = parseFloat(actionFieldValue); // Procento reiksme dedama i antro veiksmo kintamaji 
    } else {
        secondActionNumbers = parseInt(actionFieldValue);
    }

    actionFieldValue = (firstActionNumbers / 100 * secondActionNumbers).toFixed(2).toString(); //paskaiciavus skaiciaus procenta, skaiciu po kalbelio kiekis apribojamas iki 2 ir skaicius konvertuojamas i stringa
    actionField.innerHTML = actionFieldValue;
}

function plusMinus() { // Ivesto skaiciaus reiksme keiciama teigiama arba neigiama (+/- mygtukas)
    if (!negativeNumber && (actionFieldValue !== "0" || actionFieldValue !== "")) { // Tikrinam ar kintamasis negativeNumber yra false ir veiksmu reiksmiu kintamasis nera 0 arba nera tuscias
        actionFieldValue = "-" + actionFieldValue; // Jei salygos tenkinamos tada formuojamas stringas i prieki pridedant minusa ir negativeNumber reiksme pakeiciama i true
        negativeNumber = true;
    } else if (negativeNumber) { // Jei skaicius jau yra minusinis, imamas stringas praleidziant minuso zenkla (stringas imamas nuo antro jo simbolio, minusas lieka pirmas simbolis)
        actionFieldValue = actionFieldValue.substring(1);
        negativeNumber = false;
    }

    actionField.innerHTML = actionFieldValue;
}

function equal() { // Lygybes mygtuko paspaudimas
    var result = 0;
    if (firstActionNumbers.length !== 0) { // Tikrinama ar pirmo veiksmo skaiciaus ilgis nera 0 (ar jis yra uzsettintas)
        if (actionFieldValue.includes(".")) {
            secondActionNumbers = parseFloat(actionFieldValue); // Settinamas antras veiksmo skaicius
        } else {
            secondActionNumbers = parseInt(actionFieldValue);
        }
    }

    if (firstActionNumbers.length !== 0 && secondActionNumbers.length !== 0) { // Jei abu veiksmu skaiciai nera tusti, pagal veiksmo pavadinima atliekami aritmetiniai veiksmai
        if (action === "addition") {
            actionField.innerHTML = firstActionNumbers + secondActionNumbers;
            actionFieldValue = firstActionNumbers + secondActionNumbers;
        } else if (action === "subtraction") {
            actionField.innerHTML = firstActionNumbers - secondActionNumbers;
            actionFieldValue = firstActionNumbers - secondActionNumbers;
        } else if (action === "multiplication") {
            result = firstActionNumbers * secondActionNumbers;
        } else if (action === "division") {
            result = firstActionNumbers / secondActionNumbers;
        }
    }

    if ((action === "multiplication" || action === "division") && result % 1 !== 0) { // Po daugybos ir dalybos veiksmu apribojami skaiciai po kablelio, tam kad skaiciai po kablelio nebutu begaliniai
        actionField.innerHTML = result.toFixed(2);
        actionFieldValue = result.toFixed(2);
    } else if ((action === "multiplication" || action === "division") && result % 1 === 0) {
        actionField.innerHTML = result;
        actionFieldValue = result;
    }
}