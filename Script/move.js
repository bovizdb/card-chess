async function move(x1, y1, x2, y2) {
    // console.log("Move:", x1, y1, "to", x2, y2);
    let first, second;
    if (x1 == -1) {
        if (y1 == 0) {
            first = swapCardRed;
        }
        else {
            first = swapCardBlue;
        }
    }
    else {
        first = board[x1][y1];
    }
    if (x2 == -1) {
        if (y2 == 0) {
            second = swapCardRed;
        }
        else {
            second = swapCardBlue;
        }
    }
    else {
        second = board[x2][y2];
    }
    if (second == "000") {
        board[x1][y1] = "000";
        board[x2][y2] = first;
    }
    else if (first == swapCardRed || first == swapCardBlue) {
        board[x2][y2] = first;
        if (first == swapCardRed) {
            swapCardRed = second;
        }
        else {
            swapCardBlue = second;
        }
    }
    else if (second == swapCardRed || second == swapCardBlue) {
        board[x1][y1] = second;
        if (second == swapCardRed) {
            swapCardRed = first;
        }
        else {
            swapCardBlue = first;
        }
    }
    else if (first[0] == second[0]) {
        board[x1][y1] = second;
        board[x2][y2] = first;
    }
    else if ((first == "r12" || first == "b12") && y1 == y2) {
        visible[second] = 1;
    }
    else if (second == "r01" || second == "b01") {
        if (first == "r13") {
            document.getElementById(first).style.backgroundColor = "rgb(180, 0, 0)";
            document.getElementById(second).style.backgroundColor = "rgb(0, 180, 0)";
            gameOver("blue");
        }
        else if (first == "b13") {
            document.getElementById(first).style.backgroundColor = "rgb(180, 0, 0)";
            document.getElementById(second).style.backgroundColor = "rgb(0, 180, 0)";
            gameOver("red");
        }
        else {
            await  capture(x1, y1);
            await capture(x2, y2);
            board[x1][y1] = "000";
            board[x2][y2] = "000";
        }
    }
    else if (second == "r02" || second == "b02") {
        if (second == "r02" && lifeRed2 == 1 && first != "b02") {
            lifeRed2 = 0;
        }
        else if (second == "b02" && lifeBlue2 == 1 && first != "r02") {
            lifeBlue2 = 0;
        }
        else {
            await capture(x2, y2);
            board[x1][y1] = "000";
            board[x2][y2] = first;
        }
    }
    else if (second == "r13" || second == "b13") {
        if (first == "r13" || first == "b13") {
            document.getElementById(first).style.backgroundColor = "rgb(255, 180, 0)";
            document.getElementById(second).style.backgroundColor = "rgb(255, 180, 0)";
            gameOver("draw");
        }
        else if (first == "r12" || first == "r11" || first == "r10") {
            document.getElementById(first).style.backgroundColor = "rgb(0, 180, 0)";
            document.getElementById(second).style.backgroundColor = "rgb(180, 0, 0)";
            gameOver("red");
        }
        else if (first == "b12" || first == "b11" || first == "b10") {
            document.getElementById(first).style.backgroundColor = "rgb(0, 180, 0)";
            document.getElementById(second).style.backgroundColor = "rgb(180, 0, 0)";
            gameOver("blue");
        }
        else {
            await capture(x1, y1);
            board[x1][y1] = "000";
        }
    }
    else {
        if (Number(first.slice(1)) == Number(second.slice(1))) {
            await capture(x1, y1);
            await capture(x2, y2);
            board[x1][y1] = "000";
            board[x2][y2] = "000";
        }
        else if (Number(first.slice(1)) > Number(second.slice(1))) {
            await capture(x2, y2);
            board[x1][y1] = "000";
            board[x2][y2] = first;
        }
        else if (Number(first.slice(1)) < Number(second.slice(1))) {
            await capture(x1, y1);
            board[x1][y1] = "000";
        }
    }
    refresh();
}