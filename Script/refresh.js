async function refresh() {
    // console.log(JSON.stringify(board).replace(/],/g,"]\n").slice(1,-1));

    promotionFlag = false;
    turn++;
    selected = [-1, -1];
    availableFields = [];
    remove();

    capturedRed.forEach(async card => {
        images[card].style.display = "block";
        images[card].style.zIndex = 26+capturedRed.indexOf(card);
        if (Math.floor(images[card].style.left.slice(0, -2)) != Math.floor(positions["red-deck"].x + capturedRed.indexOf(card)*(cardWidth/4)) || Math.floor(images[card].style.top.slice(0, -2)) != Math.floor(positions["red-deck"].y)) {
            await slideAnimation(card, positions["red-deck"].x + capturedRed.indexOf(card)*(cardWidth/4), positions["red-deck"].y);
        }
    });
    capturedBlue.forEach(async card => {
        images[card].style.display = "block";
        images[card].style.zIndex = 26+capturedBlue.indexOf(card);
        if (Math.floor(images[card].style.left.slice(0, -2)) != Math.floor(positions["blue-deck"].x + capturedBlue.indexOf(card)*(cardWidth/4)) || Math.floor(images[card].style.top.slice(0, -2)) != Math.floor(positions["blue-deck"].y)) {
            await slideAnimation(card, positions["blue-deck"].x + capturedBlue.indexOf(card)*(cardWidth/4), positions["blue-deck"].y);
        }
    });

    let duration = turn == 0 ? 100 : 500;
    images[swapCardRed].style.display = "block";
    await slideAnimation(swapCardBlue, positions["-1,1"].x, positions["-1,1"].y, duration=duration);

    for (let i = 0; i < 6; i++) {
        for (let j = 0; j < 4; j++) {
            if (board[i][j] != "000") {
                images[board[i][j]].style.display = "block";
            }

            if (board[i][j] != "000" && (Math.floor(images[board[i][j]].style.left.slice(0, -2)) != Math.floor(positions[i+','+j].x) || Math.floor(images[board[i][j]].style.top.slice(0, -2)) != Math.floor(positions[i+','+j].y))) {
                await slideAnimation(board[i][j], positions[i+','+j].x, positions[i+','+j].y, duration=duration);
            }
            if (i == 0) {
                if (board[i][j][0] == 'r') {
                    if (board[i][j] == "r13") {
                        document.getElementById("r13").style.backgroundColor = "rgb(0, 180, 0)";
                        gameOver("red");
                    }
                    else {
                        promote(i, j);
                        return;
                    }
                }
            }
            else if (i == 5) {
                if (board[i][j][0] == 'b') {
                    if (board[i][j] == "b13") {
                        document.getElementById("b13").style.backgroundColor = "rgb(0, 180, 0)";
                        gameOver("blue");
                    }
                    else {
                        promote(i, j);
                        return;
                    }
                }
            }
        }
    }
    images[swapCardBlue].style.display = "block";
    await slideAnimation(swapCardRed, positions["-1,0"].x, positions["-1,0"].y, duration=duration);
    if (gameOverFlag) {
        return;
    }
    deselect();
    remove();
    if (turn == 0) {
        positions["red-deck"] = {x: window.innerWidth/2 - 2.5*cardWidth, y: window.innerHeight/2 - 4.5*cardHeight};
    }
    if (turn % 2 == 1) {
        let fs = "", sc = "";
        while(true) {
            let rand = Math.floor(Math.random() * 13);
            if (rand == 12) {
                fs = swapCardBlue;
            } else {
                fs = blueCards[rand];
            }
            fs = getCoords(fs);
            if (fs[1] != -1) {
                if (fs[0] < 5 && board[fs[0]+1][fs[1]][0] != 'b') {
                    if (Math.random() < 0.8) {
                        break;
                    }
                } else if (Math.random() < 0.02) {
                    break;
                }
            }
        }
        await new Promise(resolve => setTimeout(resolve, 1000));
        select(fs[0], fs[1], bot=true);
        await new Promise(resolve => setTimeout(resolve, 1000));
        while(true) {
            sc = availableFields[Math.floor(Math.random() * availableFields.length)];
            if (sc[0] != -1 && board[sc[0]][sc[1]][0] == 'r' && Number(board[sc[0]][sc[1]].slice(1)) > Number(board[fs[0]][fs[1]].slice(1))) {
                continue;
            }
            if (fs[0] < sc[0]) {
                if (Math.random() < 0.8) {
                    break;
                }
            } else if (Math.random() < 0.02) {
                break;
            }
        }
        select(sc[0], sc[1], bot=true);
        remove();
    }
}

function getCoords(card) {
    // console.log(card);
    if (card == swapCardRed) {
        return [-1, 0];
    }
    if (card == swapCardBlue) {
        return [-1, 1];
    }
    for (let i = 0; i < 6; i++) {
        for (let j = 0; j < 4; j++) {
            if (board[i][j] == card) {
                return [i, j];
            }
        }
    }
    return [-1, -1];
}

function selectRandom() {
    let rand = Math.floor(Math.random() * 26);
    if (rand == 24) {
        rand = [-1, 0];
    }
    else if (rand == 25) {
        rand = [-1, 1];
    }
    else {
        rand = [Math.floor(rand/4), rand%4];
    }
    return rand;
}