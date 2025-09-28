async function promote(x, y) {
    remove();
    promoted = "";
    promotionFlag = true;
    if (board[x][y][0] == 'r' && capturedRed.length == 0) {
        promoted = board[x][y];
    }
    else if (board[x][y][0] == 'b' && capturedBlue.length == 0) {
        promoted = board[x][y];
    }
    else {
        if (board[x][y][0] == 'r') {
            ids.forEach(id => {
                if (!capturedRed.includes(id)) {
                    images[id].style.display = "none";
                }
            });
            for (let i = 0; i < capturedRed.length; i++) {
                let a = Math.floor(i/4);
                let b = i%4;
                images[capturedRed[i]].addEventListener('click', function() {select(a, b);}, { once : true });
                await slideAnimation(capturedRed[i], positions[a+','+b].x, positions[a+','+b].y, duration=300);
            }
        }
        else {
            ids.forEach(id => {
                if (!capturedBlue.includes(id)) {
                    images[id].style.display = "none";
                }
            });
            let highestCard = capturedBlue[0];
            for (let i = 0; i < capturedBlue.length; i++) {
                let a = Math.floor(i/4);
                let b = i % 4;
                if (Math.floor(capturedBlue[i].slice(1)) > Math.floor(highestCard.slice(1))) {
                    highestCard = capturedBlue[i];
                }
                await slideAnimation(capturedBlue[i], positions[a+','+b].x, positions[a+','+b].y, duration=300);
            }
            await new Promise(resolve => setTimeout(resolve, 2000));
            promoted = highestCard;
        }
    }
    while (promoted == "") {
        await new Promise(resolve => setTimeout(resolve, 300));
        await waitForClick();
    }
    await selectAnimation(promoted);
    if (board[x][y][0] == 'r') {
        let flag = false;
        for (let i = 5; i >= 0; i--) {
            if (board[i][y] == "000")
            {
                flag = true;
                board[i][y] = promoted;
                break;
            }
        }
        if (flag) {
            for (let i = 0; i < capturedRed.length; i++) {
                if (capturedRed[i] == promoted) {
                    capturedRed.splice(i, 1);
                    break;
                }
            }
        }
        if (promoted != board[x][y]) {
            await capture(x, y);
        }
    }
    else {
        let flag = false;
        for (let i = 0; i < 6; i++) {
            if (board[i][y] == "000") {
                flag = true;
                board[i][y] = promoted;
                break;
            }
        }
        if (flag) {
            for (let i = 0; i < capturedBlue.length; i++) {
                if (capturedBlue[i] == promoted) {
                    capturedBlue.splice(i, 1);
                    break;
                }
            }
        }
        if (promoted != board[x][y]) {
            await capture(x, y);
        }
    }
    board[x][y] = "000";
    promotionFlag = false;
    turn--;
    refresh();
}

function waitForClick() {
    return new Promise(resolve => {
        document.addEventListener('click', () => {
            resolve();
        }, { once : true });
    });
}
