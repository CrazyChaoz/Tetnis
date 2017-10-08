var gameFischrisRekord = 0;
var gameFischrisVersuche = 2;
var gameFischrisBlocker = false;    //damit Spiel nicht 2x gestartet wird
var gameFischris_started = false;

//Spielmechanik
var gameFischrisBloeckVorhanden = [
    [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false],
    [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false],
    [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false],
    [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false],
    [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false],
    [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false],
    [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false],
    [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false],
    [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false],
    [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false]
];
var gameFischrisBloecke = [
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
];  //beinhaltet die Blocknummern
var gameFischrisBlockX = [];
var gameFischrisBlockY = [];
var gameFischrisBlockNumber = 0;
var gameFischrisStoneType = 0;
var gameFischrisStoneSpeed = 500;

//für Rotierung
var gameFischrisRotateBlocknumbers = [
    [0, 0, 0],
    [0, 0, 0],
    [0, 0, 0]
];
var gameFischrisRotateX = [
    [9, 9, 9],
    [9, 9, 9],
    [9, 9, 9]
];
var gameFischrisRotateY = [
    [9, 9, 9],
    [9, 9, 9],
    [9, 9, 9]
];
var gameFischrisLineOrientation = 90;

//Special-Items
var gameFischrisOnlyLines = false;
var gameFischrisSlowSpeed = false;

//Stats
var gameFischrisPoints = 0;
var gameFischrisLevel = 1;

//Steuerung
var gameFischrisLetDown = true; //muss Global, wegen der Dropdown Funktion, sein
var gameFischrisDownPressed = false;
var gameFischrisLeftPressed = false;
var gameFischrisRightPressed = false;
var gameFischrisRotatePressed = false;
var gameFischrisMoveDownInterval;
var gameFischrisMoveLeftInterval;
var gameFischrisMoveLeftTimeout;
var gameFischrisMoveRightInterval;
var gameFischrisMoveRightTimeout;
var gameFischrisMoveDownSpeedInterval;

// *************************************

function startFischris(event) {
    if(gameFischrisVersuche > 0 && gameFischrisBlocker === false) {
        document.getElementById("gameFischris_controlErklaerung").style.display = "none";
        gameFischrisBlocker = true;
        gameFischris_started = true;

        gameFischrisCreateStone(event);
        gameFischrisMoveDownSpeedInterval = setInterval(gameFischrisMoveDown, 500, event);
    }
}

//***** Spielmechanik *****
function gameFischrisCheckForLines(event) {
    var entfernen = false;
    var getItem = false;

    for(var y = 0; y < 20; y++) {
        entfernen = false;
        for(var x = 0; x < 10; x++) {
            if(gameFischrisBloeckVorhanden[x][y] === true) {
                entfernen = true;
            }
            else {
                entfernen = false;
                x = 10;
            }
        }

        //wenn Linie vorhanden
        if(entfernen === true) {
            gameFischrisPoints++;
            document.getElementById("gameFischris_points").innerHTML = gameFischrisPoints.toString();
            gameFischrisCheckLevel(event);

            for(var i = 0; i < 10; i++) {
                //auf Fisch im Block prüfen
                if(document.getElementById("block" + gameFischrisBloecke[i][y]).style.backgroundImage === "url(\"fisch.svg\")") {
                    gameFischrisPoints++;
                    document.getElementById("gameFischris_points").innerHTML = gameFischrisPoints.toString();
                    gameFischrisCheckLevel(event);
                }

                //auf Special-Item im Block prüfen
                if(document.getElementById("block" + gameFischrisBloecke[i][y]).style.backgroundImage === "url(\"specialItem.svg\")") {
                    getItem = true;
                }

                //Blöcke der Linie entfernen
                document.getElementById("gameFischris_spielfeldContent").removeChild(document.getElementById("block" + gameFischrisBloecke[i][y]));
                gameFischrisBloecke[i][y] = 0;
                gameFischrisBloeckVorhanden[i][y] = false;
            }
            if(y > 0) {
                gameFischrisMoveAllBlocksDown(y, event);
            }

            if(getItem === true) {
                gameFischrisGetItem(event);
            }
        }
    }
}
function gameFischrisCheckGameOver(event) {
    var gameover = false;

    for(var i = 0; i < 10; i++) {
        if(gameFischrisBloeckVorhanden[i][0] === true) {
            gameover = true;
            i = 10; //Schleife abbrechen
        }
    }

    if(gameover === true) {
        return gameover;
    }
    else {
        return gameover;
    }
}
function gameFischrisCheckLevel(event) {
    switch(gameFischrisPoints) {
        case 5:
            gameFischrisChangeLevel(450, event);
            break;
        case 10:
            gameFischrisChangeLevel(400, event);
            break;
        case 15:
            gameFischrisChangeLevel(350, event);
            break;
        case 20:
            gameFischrisChangeLevel(300, event);
            break;
        case 25:
            gameFischrisChangeLevel(250, event);
            break;
        case 30:
            gameFischrisChangeLevel(200, event);
            break;
        case 35:
            gameFischrisChangeLevel(175, event);
            break;
        case 40:
            gameFischrisChangeLevel(150, event);
            break;
        case 45:
            gameFischrisChangeLevel(125, event);
            break;
        case 50:
            gameFischrisChangeLevel(100, event);
            break;
    }
}
function gameFischrisChangeLevel(speed, event) {
    gameFischrisLevel++;
    document.getElementById("gameFischris_level").innerHTML = gameFischrisLevel.toString();

    //wenn Special-Item SlowSpeed aktiv, Speed nicht ändern (nur globale Variable)
    gameFischrisStoneSpeed = speed;
    if(gameFischrisSlowSpeed === false) {
        clearInterval(gameFischrisMoveDownSpeedInterval);
        gameFischrisMoveDownSpeedInterval = setInterval(gameFischrisMoveDown, speed, event);
    }
}
function gameFischrisCheckHighscore(event) {
    if(gameFischrisPoints > gameFischrisRekord) {
        gameFischrisRekord = gameFischrisPoints;
        document.getElementById("gameFischris_rekord").innerHTML = "Rekord: " + gameFischrisRekord;
    }
}

function gameFischrisMoveAllBlocksDown(startPoint, event) {
    for(var y = startPoint; y > 0; y--) {
        for(var x = 0; x < 10; x++) {
            gameFischrisBloecke[x][y] = gameFischrisBloecke[x][y-1];
            gameFischrisBloeckVorhanden[x][y] = gameFischrisBloeckVorhanden[x][y-1];
            if(gameFischrisBloecke[x][y] !== 0) {
                var blockY = document.getElementById("block" + gameFischrisBloecke[x][y]).style.top;
                document.getElementById("block" + gameFischrisBloecke[x][y]).style.top = (parseInt(blockY.substring(0, blockY.indexOf("px"))) + 20) + "px";
            }
        }
    }
}
function gameFischrisReset(event) {
    var block;

    if(window.innerWidth > 972) {
        document.getElementById("gameFischris_controlErklaerung").style.display = "inline";
    }
    gameFischris_started = false;
    gameFischrisBlocker = false;

    //Steine entfernen
    for(var i = gameFischrisBlockNumber; i > 0; i--) {
        block = document.getElementById("block" + i);
        if(block !== null) {
            block.parentNode.removeChild(block);
        }
    }

    //Steuerung resetten
    clearInterval(gameFischrisMoveDownInterval);
    clearInterval(gameFischrisMoveLeftInterval);
    clearInterval(gameFischrisMoveLeftTimeout);
    clearInterval(gameFischrisMoveRightInterval);
    clearInterval(gameFischrisMoveRightTimeout);
    clearInterval(gameFischrisMoveDownSpeedInterval);

    gameFischrisLetDown = true;
    gameFischrisDownPressed = false;
    gameFischrisLeftPressed = false;
    gameFischrisRightPressed = false;
    gameFischrisRotatePressed = false;

    //Spielmechanik resetten
    gameFischrisBloeckVorhanden = [
        [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false],
        [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false],
        [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false],
        [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false],
        [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false],
        [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false],
        [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false],
        [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false],
        [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false],
        [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false]
    ];
    gameFischrisBloecke = [
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
    ];
    gameFischrisBlockX = [];
    gameFischrisBlockY = [];
    gameFischrisBlockNumber = 0;
    gameFischrisStoneType = 0;

    gameFischrisRotateBlocknumbers = [
        [0, 0, 0],
        [0, 0, 0],
        [0, 0, 0]
    ];
    gameFischrisRotateX = [
        [9, 9, 9],
        [9, 9, 9],
        [9, 9, 9]
    ];
    gameFischrisRotateY = [
        [9, 9, 9],
        [9, 9, 9],
        [9, 9, 9]
    ];
    gameFischrisLineOrientation = 90;

    //Special-Items
    gameFischrisOnlyLines = false;

    //Punkte resetten
    gameFischrisPoints = 0;
    gameFischrisLevel = 1;
    document.getElementById("gameFischris_points").innerHTML = "0";
    document.getElementById("gameFischris_level").innerHTML = "1";
}

//Steinerstellung
function gameFischrisCreateStone(event) {
    //Dreh-Arrays zurücksetzen
    gameFischrisRotateBlocknumbers = [
        [0, 0, 0],
        [0, 0, 0],
        [0, 0, 0]
    ];
    gameFischrisRotateX = [
        [9, 9, 9],
        [9, 9, 9],
        [9, 9, 9]
    ];
    gameFischrisRotateY = [
        [9, 9, 9],
        [9, 9, 9],
        [9, 9, 9]
    ];
    gameFischrisLineOrientation = 90;

    gameFischrisStoneType = Math.floor(Math.random()*7);    //0-6
    if(gameFischrisOnlyLines === true) {
        gameFischrisStoneType = 0;
    }
    switch(gameFischrisStoneType) {
        case 0:
            gameFischrisCreateLine(event);
            break;
        case 1:
            gameFischrisCreateBlock(event);
            break;
        case 2:
            gameFischrisCreateL(event);
            break;
        case 3:
            gameFischrisCreateTurnedL(event);
            break;
        case 4:
            gameFischrisCreateT(event);
            break;
        case 5:
            gameFischrisCreateUpStairs(event);
            break;
        case 6:
            gameFischrisCreateDownStairs(event);
            break;
    }
}
function gameFischrisCreateSingleBlock(event) {
	gameFischrisBlockNumber++;
	var div = document.createElement("div");
	div.setAttribute("id", "block" + gameFischrisBlockNumber);
	div.style.position = "absolute";
	div.style.width = "20px";
	div.style.height = "20px";
	div.style.boxShadow = "inset 0 0 5px rgba(0, 0, 0, 0.2)";

	//5% Chance, dass der Block einen Fisch enthält
	var chance = Math.floor(Math.random()*20+1);    //1-20
    if(chance === 1) {
        div.style.backgroundImage = "url(\"fisch.svg\")";
    }

    //2% Chance, dass der Block ein Item enthält
    chance = Math.floor(Math.random()*100+1);    //1-100
    if(chance === 1 && gameFischrisOnlyLines === false) {
        div.style.backgroundImage = "url(\"specialItem.svg\")";
    }

    return div;
}

function gameFischrisCreateLine(event) {
    //1. Block
    var block1 = gameFischrisCreateSingleBlock(event);
    block1.style.backgroundColor = "dodgerblue";
    block1.style.left = "60px";
    block1.style.top = "0";
    gameFischrisBlockX[0] = 60;
    gameFischrisBlockY[0] = 0;

    //2. Block
    var block2 = gameFischrisCreateSingleBlock(event);
    block2.style.backgroundColor = "dodgerblue";
    block2.style.left = "80px";
    block2.style.top = "0";
    gameFischrisBlockX[1] = 80;
    gameFischrisBlockY[1] = 0;

    //3. Block
    var block3 = gameFischrisCreateSingleBlock(event);
    block3.style.backgroundColor = "dodgerblue";
    block3.style.left = "100px";
    block3.style.top = "0";
    gameFischrisBlockX[2] = 100;
    gameFischrisBlockY[2] = 0;

    //4. Block
    var block4 = gameFischrisCreateSingleBlock(event);
    block4.style.backgroundColor = "dodgerblue";
    block4.style.left = "120px";
    block4.style.top = "0";
    gameFischrisBlockX[3] = 120;
    gameFischrisBlockY[3] = 0;

    var spielfeldContent = document.getElementById("gameFischris_spielfeldContent");
    spielfeldContent.appendChild(block1);
    spielfeldContent.appendChild(block2);
    spielfeldContent.appendChild(block3);
    spielfeldContent.appendChild(block4);
}
function gameFischrisCreateBlock(event) {
    //1. Block
    var block1 = gameFischrisCreateSingleBlock(event);
    block1.style.backgroundColor = "yellow";
    block1.style.left = "80px";
    block1.style.top = "0";
    gameFischrisBlockX[0] = 80;
    gameFischrisBlockY[0] = 0;

    //2. Block
    var block2 = gameFischrisCreateSingleBlock(event);
    block2.style.backgroundColor = "yellow";
    block2.style.left = "100px";
    block2.style.top = "0";
    gameFischrisBlockX[1] = 100;
    gameFischrisBlockY[1] = 0;

    //3. Block
    var block3 = gameFischrisCreateSingleBlock(event);
    block3.style.backgroundColor = "yellow";
    block3.style.left = "80px";
    block3.style.top = "20px";
    gameFischrisBlockX[2] = 80;
    gameFischrisBlockY[2] = 20;

    //4. Block
    var block4 = gameFischrisCreateSingleBlock(event);
    block4.style.backgroundColor = "yellow";
    block4.style.left = "100px";
    block4.style.top = "20px";
    gameFischrisBlockX[3] = 100;
    gameFischrisBlockY[3] = 20;

    var spielfeldContent = document.getElementById("gameFischris_spielfeldContent");
    spielfeldContent.appendChild(block1);
    spielfeldContent.appendChild(block2);
    spielfeldContent.appendChild(block3);
    spielfeldContent.appendChild(block4);
}
function gameFischrisCreateL(event) {
    //1. Block
    var block1 = gameFischrisCreateSingleBlock(event);
    block1.style.backgroundColor = "orange";
    block1.style.left = "100px";
    block1.style.top = "0";
    gameFischrisBlockX[0] = 100;
    gameFischrisBlockY[0] = 0;
    gameFischrisRotateBlocknumbers[2][0] = gameFischrisBlockNumber;
    gameFischrisRotateX[2][0] = 0;
    gameFischrisRotateY[2][0] = 0;

    //2. Block
    var block2 = gameFischrisCreateSingleBlock(event);
    block2.style.backgroundColor = "orange";
    block2.style.left = "60px";
    block2.style.top = "20px";
    gameFischrisBlockX[1] = 60;
    gameFischrisBlockY[1] = 20;
    gameFischrisRotateBlocknumbers[0][1] = gameFischrisBlockNumber;
    gameFischrisRotateX[0][1] = 1;
    gameFischrisRotateY[0][1] = 1;

    //3. Block
    var block3 = gameFischrisCreateSingleBlock(event);
    block3.style.backgroundColor = "orange";
    block3.style.left = "80px";
    block3.style.top = "20px";
    gameFischrisBlockX[2] = 80;
    gameFischrisBlockY[2] = 20;
    gameFischrisRotateBlocknumbers[1][1] = gameFischrisBlockNumber;
    gameFischrisRotateX[1][1] = 2;
    gameFischrisRotateY[1][1] = 2;

    //4. Block
    var block4 = gameFischrisCreateSingleBlock(event);
    block4.style.backgroundColor = "orange";
    block4.style.left = "100px";
    block4.style.top = "20px";
    gameFischrisBlockX[3] = 100;
    gameFischrisBlockY[3] = 20;
    gameFischrisRotateBlocknumbers[2][1] = gameFischrisBlockNumber;
    gameFischrisRotateX[2][1] = 3;
    gameFischrisRotateY[2][1] = 3;

    var spielfeldContent = document.getElementById("gameFischris_spielfeldContent");
    spielfeldContent.appendChild(block1);
    spielfeldContent.appendChild(block2);
    spielfeldContent.appendChild(block3);
    spielfeldContent.appendChild(block4);
}
function gameFischrisCreateTurnedL(event) {
    //1. Block
    var block1 = gameFischrisCreateSingleBlock(event);
    block1.style.backgroundColor = "blue";
    block1.style.left = "60px";
    block1.style.top = "0";
    gameFischrisBlockX[0] = 60;
    gameFischrisBlockY[0] = 0;
    gameFischrisRotateBlocknumbers[0][0] = gameFischrisBlockNumber;
    gameFischrisRotateX[0][0] = 0;
    gameFischrisRotateY[0][0] = 0;

    //2. Block
    var block2 = gameFischrisCreateSingleBlock(event);
    block2.style.backgroundColor = "blue";
    block2.style.left = "60px";
    block2.style.top = "20px";
    gameFischrisBlockX[1] = 60;
    gameFischrisBlockY[1] = 20;
    gameFischrisRotateBlocknumbers[0][1] = gameFischrisBlockNumber;
    gameFischrisRotateX[0][1] = 1;
    gameFischrisRotateY[0][1] = 1;

    //3. Block
    var block3 = gameFischrisCreateSingleBlock(event);
    block3.style.backgroundColor = "blue";
    block3.style.left = "80px";
    block3.style.top = "20px";
    gameFischrisBlockX[2] = 80;
    gameFischrisBlockY[2] = 20;
    gameFischrisRotateBlocknumbers[1][1] = gameFischrisBlockNumber;
    gameFischrisRotateX[1][1] = 2;
    gameFischrisRotateY[1][1] = 2;

    //4. Block
    var block4 = gameFischrisCreateSingleBlock(event);
    block4.style.backgroundColor = "blue";
    block4.style.left = "100px";
    block4.style.top = "20px";
    gameFischrisBlockX[3] = 100;
    gameFischrisBlockY[3] = 20;
    gameFischrisRotateBlocknumbers[2][1] = gameFischrisBlockNumber;
    gameFischrisRotateX[2][1] = 3;
    gameFischrisRotateY[2][1] = 3;

    var spielfeldContent = document.getElementById("gameFischris_spielfeldContent");
    spielfeldContent.appendChild(block1);
    spielfeldContent.appendChild(block2);
    spielfeldContent.appendChild(block3);
    spielfeldContent.appendChild(block4);
}
function gameFischrisCreateT(event) {
    //1. Block
    var block1 = gameFischrisCreateSingleBlock(event);
    block1.style.backgroundColor = "rebeccapurple";
    block1.style.left = "80px";
    block1.style.top = "0";
    gameFischrisBlockX[0] = 80;
    gameFischrisBlockY[0] = 0;
    gameFischrisRotateBlocknumbers[1][0] = gameFischrisBlockNumber;
    gameFischrisRotateX[1][0] = 0;
    gameFischrisRotateY[1][0] = 0;

    //2. Block
    var block2 = gameFischrisCreateSingleBlock(event);
    block2.style.backgroundColor = "rebeccapurple";
    block2.style.left = "60px";
    block2.style.top = "20px";
    gameFischrisBlockX[1] = 60;
    gameFischrisBlockY[1] = 20;
    gameFischrisRotateBlocknumbers[0][1] = gameFischrisBlockNumber;
    gameFischrisRotateX[0][1] = 1;
    gameFischrisRotateY[0][1] = 1;

    //3. Block
    var block3 = gameFischrisCreateSingleBlock(event);
    block3.style.backgroundColor = "rebeccapurple";
    block3.style.left = "80px";
    block3.style.top = "20px";
    gameFischrisBlockX[2] = 80;
    gameFischrisBlockY[2] = 20;
    gameFischrisRotateBlocknumbers[1][1] = gameFischrisBlockNumber;
    gameFischrisRotateX[1][1] = 2;
    gameFischrisRotateY[1][1] = 2;

    //4. Block
    var block4 = gameFischrisCreateSingleBlock(event);
    block4.style.backgroundColor = "rebeccapurple";
    block4.style.left = "100px";
    block4.style.top = "20px";
    gameFischrisBlockX[3] = 100;
    gameFischrisBlockY[3] = 20;
    gameFischrisRotateBlocknumbers[2][1] = gameFischrisBlockNumber;
    gameFischrisRotateX[2][1] = 3;
    gameFischrisRotateY[2][1] = 3;

    var spielfeldContent = document.getElementById("gameFischris_spielfeldContent");
    spielfeldContent.appendChild(block1);
    spielfeldContent.appendChild(block2);
    spielfeldContent.appendChild(block3);
    spielfeldContent.appendChild(block4);
}
function gameFischrisCreateUpStairs(event) {
    //1. Block
    var block1 = gameFischrisCreateSingleBlock(event);
    block1.style.backgroundColor = "#6fdd00";
    block1.style.left = "80px";
    block1.style.top = "0";
    gameFischrisBlockX[0] = 80;
    gameFischrisBlockY[0] = 0;
    gameFischrisRotateBlocknumbers[1][0] = gameFischrisBlockNumber;
    gameFischrisRotateX[1][0] = 0;
    gameFischrisRotateY[1][0] = 0;

    //2. Block
    var block2 = gameFischrisCreateSingleBlock(event);
    block2.style.backgroundColor = "#6fdd00";
    block2.style.left = "100px";
    block2.style.top = "0";
    gameFischrisBlockX[1] = 100;
    gameFischrisBlockY[1] = 0;
    gameFischrisRotateBlocknumbers[2][0] = gameFischrisBlockNumber;
    gameFischrisRotateX[2][0] = 1;
    gameFischrisRotateY[2][0] = 1;

    //3. Block
    var block3 = gameFischrisCreateSingleBlock(event);
    block3.style.backgroundColor = "#6fdd00";
    block3.style.left = "60px";
    block3.style.top = "20px";
    gameFischrisBlockX[2] = 60;
    gameFischrisBlockY[2] = 20;
    gameFischrisRotateBlocknumbers[0][1] = gameFischrisBlockNumber;
    gameFischrisRotateX[0][1] = 2;
    gameFischrisRotateY[0][1] = 2;

    //4. Block
    var block4 = gameFischrisCreateSingleBlock(event);
    block4.style.backgroundColor = "#6fdd00";
    block4.style.left = "80px";
    block4.style.top = "20px";
    gameFischrisBlockX[3] = 80;
    gameFischrisBlockY[3] = 20;
    gameFischrisRotateBlocknumbers[1][1] = gameFischrisBlockNumber;
    gameFischrisRotateX[1][1] = 3;
    gameFischrisRotateY[1][1] = 3;

    var spielfeldContent = document.getElementById("gameFischris_spielfeldContent");
    spielfeldContent.appendChild(block1);
    spielfeldContent.appendChild(block2);
    spielfeldContent.appendChild(block3);
    spielfeldContent.appendChild(block4);
}
function gameFischrisCreateDownStairs(event) {
    //1. Block
    var block1 = gameFischrisCreateSingleBlock(event);
    block1.style.backgroundColor = "red";
    block1.style.left = "60px";
    block1.style.top = "0";
    gameFischrisBlockX[0] = 60;
    gameFischrisBlockY[0] = 0;
    gameFischrisRotateBlocknumbers[0][0] = gameFischrisBlockNumber;
    gameFischrisRotateX[0][0] = 0;
    gameFischrisRotateY[0][0] = 0;

    //2. Block
    var block2 = gameFischrisCreateSingleBlock(event);
    block2.style.backgroundColor = "red";
    block2.style.left = "80px";
    block2.style.top = "0";
    gameFischrisBlockX[1] = 80;
    gameFischrisBlockY[1] = 0;
    gameFischrisRotateBlocknumbers[1][0] = gameFischrisBlockNumber;
    gameFischrisRotateX[1][0] = 1;
    gameFischrisRotateY[1][0] = 1;

    //3. Block
    var block3 = gameFischrisCreateSingleBlock(event);
    block3.style.backgroundColor = "red";
    block3.style.left = "80px";
    block3.style.top = "20px";
    gameFischrisBlockX[2] = 80;
    gameFischrisBlockY[2] = 20;
    gameFischrisRotateBlocknumbers[1][1] = gameFischrisBlockNumber;
    gameFischrisRotateX[1][1] = 2;
    gameFischrisRotateY[1][1] = 2;

    //4. Block
    var block4 = gameFischrisCreateSingleBlock(event);
    block4.style.backgroundColor = "red";
    block4.style.left = "100px";
    block4.style.top = "20px";
    gameFischrisBlockX[3] = 100;
    gameFischrisBlockY[3] = 20;
    gameFischrisRotateBlocknumbers[2][1] = gameFischrisBlockNumber;
    gameFischrisRotateX[2][1] = 3;
    gameFischrisRotateY[2][1] = 3;

    var spielfeldContent = document.getElementById("gameFischris_spielfeldContent");
    spielfeldContent.appendChild(block1);
    spielfeldContent.appendChild(block2);
    spielfeldContent.appendChild(block3);
    spielfeldContent.appendChild(block4);
}

//Rotierung
function gameFischrisRotate(event) {
    if(gameFischrisStoneType === 0) {
        gameFischrisRotateLine(event);
    }
    else if(gameFischrisStoneType !== 1) {
        gameFischrisRotate3x3(event);
    }
}
function gameFischrisRotateLine(event) {
    var letRotate = true;
    var blockNumberTMP = gameFischrisBlockNumber;

    //Mögliche Rotierung überprüfen
    switch(gameFischrisLineOrientation) {
        case 90:
            //1. Block
            if((gameFischrisBlockX[0]+40)/20 > 9) {
                letRotate = false;
            }
            else if(!((gameFischrisBlockY[0]-20) < 380 && gameFischrisBloeckVorhanden[(gameFischrisBlockX[0]+40)/20][(gameFischrisBlockY[0]-20)/20] === false)) {
                letRotate = false;
            }
            //2. Block
            if((gameFischrisBlockX[1]+20)/20 > 9) {
                letRotate = false;
            }
            else if(!(gameFischrisBlockY[1] < 380 && gameFischrisBloeckVorhanden[(gameFischrisBlockX[1]+20)/20][gameFischrisBlockY[1]/20] === false)) {
                letRotate = false;
            }
            //3. Block
            if(!((gameFischrisBlockY[2]+20) < 380 && gameFischrisBloeckVorhanden[gameFischrisBlockX[2]/20][(gameFischrisBlockY[2]+20)/20] === false)) {
                letRotate = false;
            }
            //4. Block
            if((gameFischrisBlockX[3]-20)/20 < 0) {
                letRotate = false;
            }
            else if(!((gameFischrisBlockY[3]+40) < 380 && gameFischrisBloeckVorhanden[(gameFischrisBlockX[3]-20)/20][(gameFischrisBlockY[3]+40)/20] === false)) {
                letRotate = false;
            }
            break;
        case 180:
            //1. Block
            if((gameFischrisBlockX[0]+20)/20 > 9) {
                letRotate = false;
            }
            else if(!((gameFischrisBlockY[0]+40) < 380 && gameFischrisBloeckVorhanden[(gameFischrisBlockX[0]+20)/20][(gameFischrisBlockY[0]+40)/20] === false)) {
                letRotate = false;
            }
            //2. Block
            if(!((gameFischrisBlockY[1]+20) < 380 && gameFischrisBloeckVorhanden[gameFischrisBlockX[1]/20][(gameFischrisBlockY[1]+20)/20] === false)) {
                letRotate = false;
            }
            //3. Block
            if((gameFischrisBlockX[2]-20)/20 < 0) {
                letRotate = false;
            }
            else if(!(gameFischrisBlockY[2] < 380 && gameFischrisBloeckVorhanden[(gameFischrisBlockX[2]-20)/20][gameFischrisBlockY[2]/20] === false)) {
                letRotate = false;
            }
            //4. Block
            if((gameFischrisBlockX[3]-40)/20 < 0) {
                letRotate = false;
            }
            else if(!((gameFischrisBlockY[3]-20) < 380 && gameFischrisBloeckVorhanden[(gameFischrisBlockX[3]-40)/20][(gameFischrisBlockY[3]-20)/20] === false)) {
                letRotate = false;
            }
            break;
        case 270:
            //1. Block
            if((gameFischrisBlockX[0]-40)/20 < 0) {
                letRotate = false;
            }
            else if(!((gameFischrisBlockY[0]+20) < 380 && gameFischrisBloeckVorhanden[(gameFischrisBlockX[0]-40)/20][(gameFischrisBlockY[0]+20)/20] === false)) {
                letRotate = false;
            }
            //2. Block
            if((gameFischrisBlockX[1]-20)/20 < 0) {
                letRotate = false;
            }
            else if(!(gameFischrisBlockY[1] < 380 && gameFischrisBloeckVorhanden[(gameFischrisBlockX[1]-20)/20][gameFischrisBlockY[1]/20] === false)) {
                letRotate = false;
            }
            //3. Block
            if(!((gameFischrisBlockY[2]-20) < 380 && gameFischrisBloeckVorhanden[gameFischrisBlockX[2]/20][(gameFischrisBlockY[2]-20)/20] === false)) {
                letRotate = false;
            }
            //4. Block
            if((gameFischrisBlockX[3]+20)/20 > 9) {
                letRotate = false;
            }
            else if(!((gameFischrisBlockY[3]-40) < 380 && gameFischrisBloeckVorhanden[(gameFischrisBlockX[3]+20)/20][(gameFischrisBlockY[3]-40)/20] === false)) {
                letRotate = false;
            }
            break;
        case 360:
            //1. Block
            if((gameFischrisBlockX[0]-20)/20 < 0) {
                letRotate = false;
            }
            else if(!((gameFischrisBlockY[0]-40) < 380 && gameFischrisBloeckVorhanden[(gameFischrisBlockX[0]-20)/20][(gameFischrisBlockY[0]-40)/20] === false)) {
                letRotate = false;
            }
            //2. Block
            if(!((gameFischrisBlockY[1]-20) < 380 && gameFischrisBloeckVorhanden[gameFischrisBlockX[1]/20][(gameFischrisBlockY[1]-20)/20] === false)) {
                letRotate = false;
            }
            //3. Block
            if((gameFischrisBlockX[2]+20)/20 > 9) {
                letRotate = false;
            }
            else if(!(gameFischrisBlockY[2] < 380 && gameFischrisBloeckVorhanden[(gameFischrisBlockX[2]+20)/20][gameFischrisBlockY[2]/20] === false)) {
                letRotate = false;
            }
            //4. Block
            if((gameFischrisBlockX[3]+40)/20 > 9) {
                letRotate = false;
            }
            else if(!((gameFischrisBlockY[3]+20) < 380 && gameFischrisBloeckVorhanden[(gameFischrisBlockX[3]+40)/20][(gameFischrisBlockY[3]+20)/20] === false)) {
                letRotate = false;
            }
            break;
    }

    //Rotierung
    if(letRotate === true) {
        switch(gameFischrisLineOrientation) {
            case 90:
                gameFischrisLineOrientation = 180;
                //1. Block
                gameFischrisBlockX[0] += 40;
                gameFischrisBlockY[0] -= 20;
                //2. Block
                gameFischrisBlockX[1] += 20;
                //3. Block
                gameFischrisBlockY[2] += 20;
                //4. Block
                gameFischrisBlockX[3] -= 20;
                gameFischrisBlockY[3] += 40;
                break;
            case 180:
                gameFischrisLineOrientation = 270;
                //1. Block
                gameFischrisBlockX[0] += 20;
                gameFischrisBlockY[0] += 40;
                //2. Block
                gameFischrisBlockY[1] += 20;
                //3. Block
                gameFischrisBlockX[2] -= 20;
                //4. Block
                gameFischrisBlockX[3] -= 40;
                gameFischrisBlockY[3] -= 20;
                break;
            case 270:
                gameFischrisLineOrientation = 360;
                //1. Block
                gameFischrisBlockX[0] -= 40;
                gameFischrisBlockY[0] += 20;
                //2. Block
                gameFischrisBlockX[1] -= 20;
                //3. Block
                gameFischrisBlockY[2] -= 20;
                //4. Block
                gameFischrisBlockX[3] += 20;
                gameFischrisBlockY[3] -= 40;
                break;
            case 360:
                gameFischrisLineOrientation = 90;
                //1. Block
                gameFischrisBlockX[0] -= 20;
                gameFischrisBlockY[0] -= 40;
                //2. Block
                gameFischrisBlockY[1] -= 20;
                //3. Block
                gameFischrisBlockX[2] += 20;
                //4. Block
                gameFischrisBlockX[3] += 40;
                gameFischrisBlockY[3] += 20;
                break;
        }

        //1. Block
        blockNumberTMP = gameFischrisBlockNumber-3;
        document.getElementById("block" + blockNumberTMP).style.left = gameFischrisBlockX[0] + "px";
        document.getElementById("block" + blockNumberTMP).style.top = gameFischrisBlockY[0] + "px";

        //2. Block
        blockNumberTMP = gameFischrisBlockNumber-2;
        document.getElementById("block" + blockNumberTMP).style.left = gameFischrisBlockX[1] + "px";
        document.getElementById("block" + blockNumberTMP).style.top = gameFischrisBlockY[1] + "px";

        //3. Block
        blockNumberTMP = gameFischrisBlockNumber-1;
        document.getElementById("block" + blockNumberTMP).style.left = gameFischrisBlockX[2] + "px";
        document.getElementById("block" + blockNumberTMP).style.top = gameFischrisBlockY[2] + "px";

        //4. Block
        blockNumberTMP = gameFischrisBlockNumber;
        document.getElementById("block" + blockNumberTMP).style.left = gameFischrisBlockX[3] + "px";
        document.getElementById("block" + blockNumberTMP).style.top = gameFischrisBlockY[3] + "px";
    }
}
function gameFischrisRotate3x3(event) {
    var letRotate = true;
    var rotateBlocknumbersTMP = [
        [0, 0, 0],
        [0, 0, 0],
        [0, 0, 0]
    ];
    var rotateXTMP = [
        [0, 0, 0],
        [0, 0, 0],
        [0, 0, 0]
    ];
    var rotateYTMP = [
        [0, 0, 0],
        [0, 0, 0],
        [0, 0, 0]
    ];

    //Mögliche Rotierung überprüfen
    for(var iC = 0; iC < 3; iC++) {
        for(var jC = 0; jC < 3; jC++) {
            if(gameFischrisRotateBlocknumbers[iC][jC] !== 0) {
                switch(iC.toString() + jC.toString()) {
                    //alle 8 möglichen Steinposition (Mitte weggelassen - kann man nicht drehen)
                    case "01":
                        //Erstes if braucht man, um eine undefined Meldung zu verhindern.
                        //Else if prüft nämlich ob Nachbarblöcke existieren und somit auch einen Array mit dem Index -1 oder 10.
                        //Der Index -1 ist logischerweise immer undefined und der Index 10 wurde nie definiert.
                        if((gameFischrisBlockX[gameFischrisRotateX[iC][jC]]+20)/20 > 9) {
                            letRotate = false;
                        }
                        else if(!((gameFischrisBlockY[gameFischrisRotateY[iC][jC]]-20) < 380 && gameFischrisBloeckVorhanden[(gameFischrisBlockX[gameFischrisRotateX[iC][jC]]+20)/20][(gameFischrisBlockY[gameFischrisRotateY[iC][jC]]-20)/20] === false)) {
                            letRotate = false;
                        }
                        break;
                    case "10":
                        if((gameFischrisBlockX[gameFischrisRotateX[iC][jC]]+20)/20 > 9) {
                            letRotate = false;
                        }
                        else if(!((gameFischrisBlockY[gameFischrisRotateY[iC][jC]]+20) < 380 && gameFischrisBloeckVorhanden[(gameFischrisBlockX[gameFischrisRotateX[iC][jC]]+20)/20][(gameFischrisBlockY[gameFischrisRotateY[iC][jC]]+20)/20] === false)) {
                            letRotate = false;
                        }
                        break;
                    case "21":
                        if((gameFischrisBlockX[gameFischrisRotateX[iC][jC]]-20)/20 < 0) {
                            letRotate = false;
                        }
                        else if(!((gameFischrisBlockY[gameFischrisRotateY[iC][jC]]+20) < 380 && gameFischrisBloeckVorhanden[(gameFischrisBlockX[gameFischrisRotateX[iC][jC]]-20)/20][(gameFischrisBlockY[gameFischrisRotateY[iC][jC]]+20)/20] === false)) {
                            letRotate = false;
                        }
                        break;
                    case "12":
                        if((gameFischrisBlockX[gameFischrisRotateX[iC][jC]]-20)/20 < 0) {
                            letRotate = false;
                        }
                        else if(!((gameFischrisBlockY[gameFischrisRotateY[iC][jC]]-20) < 380 && gameFischrisBloeckVorhanden[(gameFischrisBlockX[gameFischrisRotateX[iC][jC]]-20)/20][(gameFischrisBlockY[gameFischrisRotateY[iC][jC]]-20)/20] === false)) {
                            letRotate = false;
                        }
                        break;
                    case "00":
                        if((gameFischrisBlockX[gameFischrisRotateX[iC][jC]]+40)/20 > 9) {
                            letRotate = false;
                        }
                        else if(!(gameFischrisBlockY[gameFischrisRotateY[iC][jC]] < 380 && gameFischrisBloeckVorhanden[(gameFischrisBlockX[gameFischrisRotateX[iC][jC]]+40)/20][gameFischrisBlockY[gameFischrisRotateY[iC][jC]]/20] === false)) {
                            letRotate = false;
                        }
                        break;
                    case "20":
                        if(!((gameFischrisBlockY[gameFischrisRotateY[iC][jC]]+40) < 380 && gameFischrisBloeckVorhanden[gameFischrisBlockX[gameFischrisRotateX[iC][jC]]/20][(gameFischrisBlockY[gameFischrisRotateY[iC][jC]]+40)/20] === false)) {
                            letRotate = false;
                        }
                        break;
                    case "22":
                        if((gameFischrisBlockX[gameFischrisRotateX[iC][jC]]-40)/20 < 0) {
                            letRotate = false;
                        }
                        else if(!(gameFischrisBlockY[gameFischrisRotateY[iC][jC]] < 380 && gameFischrisBloeckVorhanden[(gameFischrisBlockX[gameFischrisRotateX[iC][jC]]-40)/20][gameFischrisBlockY[gameFischrisRotateY[iC][jC]]/20] === false)) {
                            letRotate = false;
                        }
                        break;
                    case "02":
                        if(!((gameFischrisBlockY[gameFischrisRotateY[iC][jC]]-40) < 380 && gameFischrisBloeckVorhanden[gameFischrisBlockX[gameFischrisRotateX[iC][jC]]/20][(gameFischrisBlockY[gameFischrisRotateY[iC][jC]]-40)/20] === false)) {
                            letRotate = false;
                        }
                        break;
                }
            }
        }
    }

    //Rotierung
    if(letRotate === true) {
        for(var i = 0; i < 3; i++) {
            for(var j = 0; j < 3; j++) {
                if(gameFischrisRotateBlocknumbers[i][j] !== 0) {
                    switch(i.toString() + j.toString()) {
                        //alle 8 möglichen Steinposition (Mitte weggelassen - kann man nicht drehen)
                        case "01":
                            gameFischrisBlockX[gameFischrisRotateX[i][j]] += 20;
                            gameFischrisBlockY[gameFischrisRotateY[i][j]] -= 20;
                            break;
                        case "10":
                            gameFischrisBlockX[gameFischrisRotateX[i][j]] += 20;
                            gameFischrisBlockY[gameFischrisRotateY[i][j]] += 20;
                            break;
                        case "21":
                            gameFischrisBlockX[gameFischrisRotateX[i][j]] -= 20;
                            gameFischrisBlockY[gameFischrisRotateY[i][j]] += 20;
                            break;
                        case "12":
                            gameFischrisBlockX[gameFischrisRotateX[i][j]] -= 20;
                            gameFischrisBlockY[gameFischrisRotateY[i][j]] -= 20;
                            break;
                        case "00":
                            gameFischrisBlockX[gameFischrisRotateX[i][j]] += 40;
                            break;
                        case "20":
                            gameFischrisBlockY[gameFischrisRotateY[i][j]] += 40;
                            break;
                        case "22":
                            gameFischrisBlockX[gameFischrisRotateX[i][j]] -= 40;
                            break;
                        case "02":
                            gameFischrisBlockY[gameFischrisRotateY[i][j]] -= 40;
                            break;
                    }
                    document.getElementById("block" + gameFischrisRotateBlocknumbers[i][j]).style.left = gameFischrisBlockX[gameFischrisRotateX[i][j]] + "px";
                    document.getElementById("block" + gameFischrisRotateBlocknumbers[i][j]).style.top = gameFischrisBlockY[gameFischrisRotateY[i][j]] + "px";
                }
            }
        }

        //Arrays ebenfalls drehen
        rotateBlocknumbersTMP[0][0] = gameFischrisRotateBlocknumbers[0][2];
        rotateBlocknumbersTMP[0][1] = gameFischrisRotateBlocknumbers[1][2];
        rotateBlocknumbersTMP[0][2] = gameFischrisRotateBlocknumbers[2][2];
        rotateBlocknumbersTMP[1][0] = gameFischrisRotateBlocknumbers[0][1];
        rotateBlocknumbersTMP[1][2] = gameFischrisRotateBlocknumbers[2][1];
        rotateBlocknumbersTMP[2][0] = gameFischrisRotateBlocknumbers[0][0];
        rotateBlocknumbersTMP[2][1] = gameFischrisRotateBlocknumbers[1][0];
        rotateBlocknumbersTMP[2][2] = gameFischrisRotateBlocknumbers[2][0];
        gameFischrisRotateBlocknumbers = rotateBlocknumbersTMP.slice();

        rotateXTMP[0][0] = gameFischrisRotateX[0][2];
        rotateXTMP[0][1] = gameFischrisRotateX[1][2];
        rotateXTMP[0][2] = gameFischrisRotateX[2][2];
        rotateXTMP[1][0] = gameFischrisRotateX[0][1];
        rotateXTMP[1][2] = gameFischrisRotateX[2][1];
        rotateXTMP[2][0] = gameFischrisRotateX[0][0];
        rotateXTMP[2][1] = gameFischrisRotateX[1][0];
        rotateXTMP[2][2] = gameFischrisRotateX[2][0];
        gameFischrisRotateX = rotateXTMP.slice();

        rotateYTMP[0][0] = gameFischrisRotateY[0][2];
        rotateYTMP[0][1] = gameFischrisRotateY[1][2];
        rotateYTMP[0][2] = gameFischrisRotateY[2][2];
        rotateYTMP[1][0] = gameFischrisRotateY[0][1];
        rotateYTMP[1][2] = gameFischrisRotateY[2][1];
        rotateYTMP[2][0] = gameFischrisRotateY[0][0];
        rotateYTMP[2][1] = gameFischrisRotateY[1][0];
        rotateYTMP[2][2] = gameFischrisRotateY[2][0];
        gameFischrisRotateY = rotateYTMP.slice();
    }
}

//Special-Item
function gameFischrisGetItem(event) {
    var itemID = Math.floor((Math.random()*3)+1);

    //Item-Auswahl
    switch(itemID) {
        case 1:
            gameFischrisOnlyLines = true;
            window.setTimeout(function () {
                gameFischrisOnlyLines = false;
            }, 20000);

            break;

        case 2:
            gameFischrisRemoveLines(16, event);

            break;

        case 3:
            gameFischrisSlowSpeed = true;
            clearInterval(gameFischrisMoveDownSpeedInterval);
            gameFischrisMoveDownSpeedInterval = setInterval(gameFischrisMoveDown, 500, event);

            window.setTimeout(function () {
                gameFischrisSlowSpeed = false;
                clearInterval(gameFischrisMoveDownSpeedInterval);
                gameFischrisMoveDownSpeedInterval = setInterval(gameFischrisMoveDown, gameFischrisStoneSpeed, event);
            }, 20000);

            break;
    }
}
function gameFischrisRemoveLines(startPoint, event) {
    for(var y = startPoint; y < 20; y++) {
        for(var x = 0; x < 10; x++) {
            if(gameFischrisBloecke[x][y] !== 0) {
                document.getElementById("gameFischris_spielfeldContent").removeChild(document.getElementById("block" + gameFischrisBloecke[x][y]));
                gameFischrisBloecke[x][y] = 0;
                gameFischrisBloeckVorhanden[x][y] = false;
            }
        }
        if(y > 0) {
            gameFischrisMoveAllBlocksDown(y, event);
        }
    }
}

//Bewegungen
function gameFischrisMoveDown(event) {
    gameFischrisLetDown = true;
    var blockNumberTMP = gameFischrisBlockNumber;

    //vor runterschieben, Kollision überprüfen
    for(var i = 0; i < 4; i++) {    //[gameFischrisBlockY[i]/20+1] --> 1 Block darunter
        if(!(gameFischrisBlockY[i] < 380 && gameFischrisBloeckVorhanden[gameFischrisBlockX[i]/20][gameFischrisBlockY[i]/20+1] === false)) {
            gameFischrisLetDown = false;
        }
    }

    //Stein bei keiner Kollision runterschieben
    if(gameFischrisLetDown === true) {
        for(var j = 0; j < 4; j++) {
            gameFischrisBlockY[j] += 20;
            blockNumberTMP = gameFischrisBlockNumber-3+j; //die letzten 4 Blöcke
            document.getElementById("block" + blockNumberTMP).style.top = gameFischrisBlockY[j] + "px";
        }
    }
    else {
        for(var k = 0; k < 4; k++) {
            gameFischrisBloeckVorhanden[gameFischrisBlockX[k]/20][gameFischrisBlockY[k]/20] = true;
            gameFischrisBloecke[gameFischrisBlockX[k]/20][gameFischrisBlockY[k]/20] = gameFischrisBlockNumber-3+k;
        }
        gameFischrisCheckForLines(event);
        if(gameFischrisCheckGameOver(event) === false) {
            gameFischrisCreateStone(event);
        }
        else {
            gameFischrisCheckHighscore(event);
            gameFischrisReset(event);
        }
    }
}
function gameFischrisMoveLeft(event) {
    var letLeft = true;
    var blockNumberTMP = gameFischrisBlockNumber;

    for(var i = 0; i < 4; i++) {
        if(!(gameFischrisBlockX[i] > 0 && gameFischrisBloeckVorhanden[gameFischrisBlockX[i]/20-1][gameFischrisBlockY[i]/20] === false)) {
            letLeft = false;
        }
    }

    if(letLeft === true) {
        for(var j = 0; j < 4; j++) {
            gameFischrisBlockX[j] -= 20;
            blockNumberTMP = gameFischrisBlockNumber-3+j; //die letzten 4 Blöcke
            document.getElementById("block" + blockNumberTMP).style.left = gameFischrisBlockX[j] + "px";
        }
    }
}
function gameFischrisMoveRight(event) {
    var letRight = true;
    var blockNumberTMP = gameFischrisBlockNumber;

    for(var i = 0; i < 4; i++) {
        if(!(gameFischrisBlockX[i] < 180 && gameFischrisBloeckVorhanden[gameFischrisBlockX[i]/20+1][gameFischrisBlockY[i]/20] === false)) {
            letRight = false;
        }
    }

    if(letRight === true) {
        for (var j = 0; j < 4; j++) {
            gameFischrisBlockX[j] += 20;
            blockNumberTMP = gameFischrisBlockNumber-3+j; //die letzten 4 Blöcke
            document.getElementById("block" + blockNumberTMP).style.left = gameFischrisBlockX[j] + "px";
        }
    }
}
function gameFischrisDropDown(event) {
    while(gameFischrisLetDown === true) {
        gameFischrisMoveDown(event);
    }
}

//***** Steuerung *****

//Tastatur
document.addEventListener("keydown", function(e) {
    if(gameFischris_started === true) {
        //damit man mit Pfeiltasten nicht scrollen kann
        if(e.keyCode === 40) {
            e.preventDefault();
        }
        if(e.keyCode === 38) {
            e.preventDefault();
        }

        if(gameFischrisDownPressed === false) {
            if(e.keyCode === 40 || e.keyCode === 83){
                e.preventDefault();
                gameFischrisDownPressed = true;
                gameFischrisMoveDown(e);
                gameFischrisMoveDownInterval = window.setInterval(gameFischrisMoveDown, 75, e);
            }
        }
        if(gameFischrisLeftPressed === false) {
            if(e.keyCode === 37 || e.keyCode === 65){
                e.preventDefault();
                gameFischrisLeftPressed = true;
                gameFischrisMoveLeft(e);
                gameFischrisMoveLeftTimeout = window.setTimeout(function(e) {
                    gameFischrisMoveLeftInterval = window.setInterval(gameFischrisMoveLeft, 50, e);
                }, 200);
            }
        }
        if(gameFischrisRightPressed === false) {
            if(e.keyCode === 39 || e.keyCode === 68){
                e.preventDefault();
                gameFischrisRightPressed = true;
                gameFischrisMoveRight(e);
                gameFischrisMoveRightTimeout = window.setTimeout(function(e) {
                    gameFischrisMoveRightInterval = window.setInterval(gameFischrisMoveRight, 50, e);
                }, 200);
            }
        }
        if(gameFischrisRotatePressed === false) {
            if(e.keyCode === 38 || e.keyCode === 87){
                e.preventDefault();
                gameFischrisRotatePressed = true;
                gameFischrisRotate(e);
            }
        }
        if(e.keyCode === 32){
            e.preventDefault();
            gameFischrisDropDown(e);
        }
    }
});
document.addEventListener("keyup", function(e) {
    if(gameFischris_started === true) {
        if(e.keyCode === 40 || e.keyCode === 83) {
            e.preventDefault();
            clearInterval(gameFischrisMoveDownInterval);
            gameFischrisDownPressed = false;
        }
        if(e.keyCode === 37 || e.keyCode === 65) {
            e.preventDefault();
            clearTimeout(gameFischrisMoveLeftTimeout);
            clearInterval(gameFischrisMoveLeftInterval);
            gameFischrisLeftPressed = false;
        }
        if(e.keyCode === 39 || e.keyCode === 68) {
            e.preventDefault();
            clearTimeout(gameFischrisMoveRightTimeout);
            clearInterval(gameFischrisMoveRightInterval);
            gameFischrisRightPressed = false;
        }
        if(e.keyCode === 38 || e.keyCode === 87){
            e.preventDefault();
            gameFischrisRotatePressed = false;
        }
    }
});