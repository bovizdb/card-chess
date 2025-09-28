async function select(x, y, bot=false) {
    // console.log("Select:", x, y, "Bot:", bot);
    if (gameOverFlag) {
        return;
    }
    if (promotionFlag) {
        if (turn % 2 == 1 && x*4 + y < capturedRed.length) {
            promoted = capturedRed[x*4+y];
        }
        else if (turn % 2 == 0 && x*4 + y < capturedBlue.length) {
            promoted = capturedBlue[x*4+y];
        }
    }
    else if (turn % 2 == 0) {
        if (selected[0] == -1 && selected[1] == -1) {
            if (x == -1 && y == 0) {
                remove();
                deselect();
                selected = [-1, 0];
                selectAnimation(swapCardRed);
                availables(x, y);
            }
            else if (x != -1 && board[x][y][0] == 'r') {
                remove();
                selected = [x, y];
                selectAnimation(board[x][y]);
                availables(x, y);
            }
        }
        else if (selected[0] == -1 && selected[1] == 0 && x == -1 && y == 0) {
            remove();
            deselect();
        }
        else if (x != -1 && selected[0] == x && selected[1] == y) {
            remove();
            deselect();
        }
        else if (contain(availableFields, [x, y]) == false) {
            if (board[x][y][0] == 'r') {
                remove();
                deselect();
                selected = [x, y];
                selectAnimation(board[x][y]);
                availables(x, y);
            }
            else {
                remove();
                deselect();
            }
        }
        else {
            if (x == -1 && y == 0) {
                selectAnimation(swapCardRed);
            } else {
                selectAnimation(board[x][y]);
                await new Promise(resolve => setTimeout(resolve, 300));
                if (board[x][y][0] == 'b' && visible[board[x][y]] == 0) {
                    remove();
                    await flipAnimation(board[x][y]);
                }
            }
            await new Promise(resolve => setTimeout(resolve, 300));
            move(selected[0], selected[1], x, y);
        }
    }
    else if (bot) {
        if (selected[0] == -1 && selected[1] -1) {
            if (x == -1 && y == 1) {
                remove();
                selected = [-1, 1];
                selectAnimation(swapCardBlue);
                availables(x, y);
            }
            else if (x != -1 && board[x][y][0] == 'b') {
                remove();
                selected = [x, y];
                selectAnimation(board[x][y]);
                availables(x, y);
            }
        }
        else if (selected[0] == -1 && selected[1] == 1 && x == -1 && y == 1) {
            remove();
        }
        else if (x != -1 && selected[0] == x && selected[1] == y) {
            remove();
        }
        else if (contain(availableFields, [x, y]) == false) {
            if (board[x][y][0] == 'b') {
                remove();
                selected = [x, y];
                selectAnimation(board[x][y]);
                availables(x, y);
            }
            else {
                remove();
            }
        }
        else {
            if (x == -1 && y == 1) {
                selectAnimation(swapCardBlue);
            } else {
                selectAnimation(board[x][y]);
                await new Promise(resolve => setTimeout(resolve, 300));
                if (board[x][y][0] == 'r' && visible[board[x][y]] == 0) {
                    remove();
                    await flipAnimation(board[selected[0]][selected[1]]);
                }
            }
            if (x == -1 && y == 1) {
                await new Promise(resolve => setTimeout(resolve, 300));
                move(selected[0], selected[1], -1, 1);
            }
            else {
                await new Promise(resolve => setTimeout(resolve, 300));
                move(selected[0], selected[1], x, y);
            }
        }
    }
}