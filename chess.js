var canvas;
var ctx;
var row = 20;
var boardWidth = 600;

var leftMargin = 30;
var topMargin = 30;
var lineLength = (boardWidth - leftMargin * 2);
var blockWidth = lineLength / (row - 1);

var chess = new Array(row)
var role = 0;
var gameStatus = 0;

function start() {
    initChess();
    role = 1;
    gameStatus = 1;
    canvas = document.getElementById("chess");
    ctx = canvas.getContext("2d");
    clearBoard();
    drawBoard();
}

function initChess() {
    for (var i = 0; i < row; i++) {
        chess[i] = new Array(row)
        for (var j = 0; j < row; j++) {
            chess[i][j] = 0;
        }
    }
}

function drawBoard() {
    ctx.beginPath()
    var x = leftMargin;
    var y = topMargin;
    for (var i = 0; i < row; i++) {
        ctx.moveTo(x, y);
        ctx.lineTo(x + lineLength, y);
        y += blockWidth;
    }
    x = leftMargin;
    y = topMargin;
    for (var i = 0; i < row; i++) {
        ctx.moveTo(x, y)
        ctx.lineTo(x, y + lineLength)
        x += blockWidth;
    }
    ctx.stroke();
}

function clearBoard() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}

function drawAllChess() {
    for (var i = 0; i < row; i++) {
        for (var j = 0; j < row; j++) {
            if (chess[i][j] != 0) {
                drawOneChess(i, j, chess[i][j])
            }
        }
    }
}

function drawOneChess(x, y, role) {
    var chessX = x * blockWidth + leftMargin;
    var chessY = y * blockWidth + topMargin;
    var r = blockWidth / 2 - 1;
    var color = role == 1 ? "#000000" : "#FFFFFF";
    ctx.beginPath();
    ctx.arc(chessX, chessY, r, 0, Math.PI * 2, true);
    ctx.closePath();
    ctx.fillStyle = "#000000";
    ctx.stroke();
    ctx.fillStyle = color;
    ctx.fill();
}

function drawCanvas() {
    ctx.fillStyle = "#FF0000";
    ctx.beginPath();
    ctx.arc(70, 18, 15, 0, Math.PI * 2, true);
    ctx.closePath();
    ctx.fill();
}

function putAChess(event) {
    if (gameStatus == 0) {
        alert("Please start game first");
        return;
    }
    var bbox = canvas.getBoundingClientRect();
    var x = event.clientX - bbox.left;
    var y = event.clientY - bbox.top;

    x = x - leftMargin + blockWidth / 2;
    y = y - topMargin + blockWidth / 2;

    x = Math.floor(x / blockWidth);
    y = Math.floor(y / blockWidth);
    console.log("x=" + x + ", y=" + y)

    if (chess[x][y] != 0) {
        alert("Not allowd to put chess here");
        return;
    }
    chess[x][y] = role;

    clearBoard();
    drawBoard();
    drawAllChess();

    if (checkWinner(x, y, role)) {
        if (role == 1) {
            alert("Black Role Win!")
        } else{
            alert("White Role Win!")
        }
        gameStatus = 0;
    }
    role = role % 2 + 1;
}

function checkWinner(x, y, role) {
    var cnt = 1;
    for (var i = x - 1; i >= 0 && chess[i][y] == role; i--) {
        cnt++;
    }
    for (var i = x + 1; i < row && chess[i][y] == role; i++) {
        cnt++;
    }
    if (cnt == 5) {
        return true;
    }

    cnt = 1;
    for (var i = y - 1; i >= 0 && chess[x][i] == role; i--) {
        cnt++;
    }
    for (var i = y + 1; i < row && chess[x][i] == role; i++) {
        cnt++;
    }
    if (cnt == 5) {
        return true;
    }

    cnt = 1;
    for (var i = x - 1, j = y - 1; i >= 0 && j >= 0 && chess[i][j] == role; i-- , j--) {
        cnt++;
    }
    for (var i = x + 1, j = y + 1; i < row && j < row && chess[i][j] == role; i++ , j++) {
        cnt++;
    }
    if (cnt == 5) {
        return true;
    }

    cnt = 1;
    for (var i = x - 1, j = y + 1; i >= 0 && j < row && chess[i][j] == role; i-- , j++) {
        cnt++;
    }
    for (var i = x + 1, j = y - 1; i < row && j > 0 && chess[i][j] == role; i++ , j--) {
        cnt++;
    }
    if (cnt == 5) {
        return true;
    }

    return false;
}