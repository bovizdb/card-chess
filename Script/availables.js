async function availables(x, y) {
    availableFields = [];
    if (selected[0] == -1) {
        if (selected[1] == 0) {
            selectedCard = swapCardRed;
        }
        else {
            selectedCard = swapCardBlue;
        }
    }
    else {
        selectedCard = board[selected[0]][selected[1]];
    }
    if (turn % 2 == 0 && selectedCard[0] == 'r') {
        if (selectedCard == swapCardRed) {
            for (let i = 0; i < 6; i++) {
                for (let j = 0; j < 4; j++) {
                    if (board[i][j][0] == 'r' && board[i][j] != "r13") {
                        availableFields.push([i, j]);
                    }
                }
            }
        }
        else if (selectedCard == "r01") {
            availableFields.push([-1, 0]);
            if (x - 1 >= 0 && board[x-1][y][0] == '0') {
                availableFields.push([x-1, y]);
            }
            if (y - 1 >= 0 && board[x][y-1][0] != 'b') {
                availableFields.push([x, y-1]);
            }
            if (y + 1 <= 3 && board[x][y+1][0] != 'b') {
                availableFields.push([x, y+1]);
            }
        }
        else if (selectedCard == "r11") {
            availableFields.push([-1, 0]);
            if (x - 2 >= 0 && board[x-2][y][0] != 'r' && board[x-1][y][0] != '0') {
                availableFields.push([x-2, y]);
            }
            if (x - 1 >= 0 && board[x-1][y][0] != 'r') {
                availableFields.push([x-1, y]);
            }
            if (y - 1 >= 0 && board[x][y-1][0] != 'b') {
                availableFields.push([x, y-1]);
            }
            if (y + 1 <= 3 && board[x][y+1][0] != 'b') {
                availableFields.push([x, y+1]);
            }
        }
        else if (selectedCard == "r12") {
            availableFields.push([-1, 0]);
            if (x - 1 >= 0) {
                if (y - 1 >= 0 && board[x-1][y-1][0] == 'b') {
                    availableFields.push([x-1, y-1]);
                }
                if (board[x-1][y][0] == '0') {
                    availableFields.push([x-1, y]);
                }
                if (y + 1 <= 3 && board[x-1][y+1][0] == 'b') {
                    availableFields.push([x-1, y+1]);
                }
                if (board[x-1][y][0] == 'b' && visible[board[x-1][y]] == 0) {
                    availableFields.push([x-1, y]);
                }
                else if (x-2 >= 0 && board[x-2][y][0] == 'b' && visible[board[x-2][y]] == 0) {
                    availableFields.push([x-2, y]);
                }
                else if (x-3 >= 0 && board[x-3][y][0] == 'b' && visible[board[x-3][y]] == 0) {
                    availableFields.push([x-3, y]);
                }
                else if (x-4 >= 0 && board[x-4][y][0] == 'b' && visible[board[x-4][y]] == 0) {
                    availableFields.push([x-4, y]);
                }
                else if (x-5 >= 0 && board[x-5][y][0] == 'b' && visible[board[x-5][y]] == 0) {
                    availableFields.push([x-5, y]);
                }
            }
            if (y + 1 <= 3 && board[x][y+1][0] != 'b') {
                availableFields.push([x, y+1]);
            }
            if (y - 1 >= 0 && board[x][y-1][0] != 'b') {
                availableFields.push([x, y-1]);
            }
        }
        else if (selectedCard == "r13") {
            check(x, y);
        }
        else {
            availableFields.push([-1, 0]);
            check(x, y);
        }
    }
    else {
        if (selectedCard == swapCardBlue) {
            for (let i = 0; i < 6; i++) {
                for (let j = 0; j < 4; j++) {
                    if (board[i][j][0] == 'b' && board[i][j] != "b13") {
                        availableFields.push([i, j]);
                    }
                }
            }
        }
        else if (selectedCard == "b01") {
            availableFields.push([-1, 1]);
            if (y - 1 >= 0 && board[x][y-1][0] == 'b') {
                availableFields.push([x, y-1]);
            }
            if (y + 1 <= 3 && board[x][y+1][0] != 'r') {
                availableFields.push([x, y+1]);
            }
            if (x + 1 <= 5 && board[x+1][y][0] != 'r') {
                availableFields.push([x+1, y]);
            }
        }
        else if (selectedCard == "b11") {
            availableFields.push([-1, 1]);
            if (x + 2 <= 5 && board[x+2][y][0] != 'b' && board[x+1][y][0] != '0') {
                availableFields.push([x+2, y]);
            }
            if (x + 1 <= 5 && board[x+1][y][0] != 'b') {
                availableFields.push([x+1, y]);
            }
            if (y - 1 >= 0 && board[x][y-1][0] != 'r') {
                availableFields.push([x, y-1]);
            }
            if (y + 1 <= 3 && board[x][y+1][0] != 'r') {
                availableFields.push([x, y+1]);
            }
        }
        else if (selectedCard == "b12") {
            availableFields.push([-1, 1]);
            if (x + 1 <= 5) {
                if (y - 1 >= 0 && board[x+1][y-1][0] == 'r') {
                    availableFields.push([x+1, y-1]);
                }
                if (board[x+1][y][0] == '0') {
                    availableFields.push([x+1, y]);
                }
                if (y + 1 <= 3 && board[x+1][y+1][0] == 'r') {
                    availableFields.push([x+1, y+1]);
                }
                if (board[x+1][y][0] == 'r' && visible[board[x+1][y]] == 0) {
                    availableFields.push([x+1, y]);
                }
                else if (x+2 <= 5 && board[x+2][y][0] == 'r' && visible[board[x+2][y]] == 0) {
                    availableFields.push([x+2, y]);
                }
                else if (x+3 <= 5 && board[x+3][y][0] == 'r' && visible[board[x+3][y]] == 0) {
                    availableFields.push([x+3, y]);
                }
                else if (x+4 <= 5 && board[x+4][y][0] == 'r' && visible[board[x+4][y]] == 0) {
                    availableFields.push([x+4, y]);
                }
                else if (x+5 <= 5 && board[x+5][y][0] == 'r' && visible[board[x+5][y]] == 0) {
                    availableFields.push([x+5, y]);
                }
            }
            if (y + 1 <= 3 && board[x][y+1][0] != 'r') {
                availableFields.push([x, y+1]);
            }
            if (y - 1 >= 0 && board[x][y-1][0] != 'r') {
                availableFields.push([x, y-1]);
            }
        }
        else if (selectedCard == "b13") {
            check(x, y);
        }
        else {
            availableFields.push([-1, 1]);
            check(x, y);
        }
    }
    if (turn % 2 == 0) {
        for (let i = 0; i < availableFields.length; i++) {
            let image = new Image(width = cardWidth);
            image.src = "Images/Cards/001.png";
            image.className = "circle";
            image.style.position = "absolute";
            image.style.width = cardWidth + "px";
            if (availableFields[i][0] == -1) {
                if (availableFields[i][1] == 0) {
                    id = swapCardRed;
                }
                else if (availableFields[i][1] == 1) {
                    id = swapCardBlue;
                }
            }
            else {
                id = board[availableFields[i][0]][availableFields[i][1]];
            }
            image.style.left = positions[availableFields[i][0] + ',' + availableFields[i][1]].x + "px";
            image.style.top = positions[availableFields[i][0] + ',' + availableFields[i][1]].y + "px";
            image.style.zIndex = "50";
            image.style.opacity = "1";
            image.addEventListener("mouseover", function() {image.style.transform = "scale(1.1)"; image.style.transition = "transform 0.2s";});
            image.addEventListener("mouseout", function() {image.style.transform = "scale(1)"; image.style.transition = "transform 0.2s";});
            image.addEventListener("click", function() {select(availableFields[i][0], availableFields[i][1]);});
            image.style.transform = "scale(0)";
            image.style.transition = "transform 0.2s";
            setTimeout(() => {
                image.style.transform = "scale(1)";
            }, 0);
            document.getElementById("board").appendChild(image);
        }
        await new Promise(resolve => setTimeout(resolve, 200));
    }
}

function check(x, y) {
    if (selectedCard[0] == 'r') {
        if (x - 1 >= 0) {
            if (y - 1 >= 0 && board[x-1][y-1][0] == 'b') {
                availableFields.push([x-1, y-1]);
            }
            if (board[x-1][y][0] != 'r') {
                availableFields.push([x-1, y]);
            }
            if (y + 1 <= 3 && board[x-1][y+1][0] == 'b') {
                availableFields.push([x-1, y+1]);
            }
        }
        if (y - 1 >= 0 && board[x][y-1][0] != 'b') {
            availableFields.push([x, y-1]);
        }
        if (y + 1 <= 3 && board[x][y+1][0] != 'b') {
            availableFields.push([x, y+1]);
        }
    }
    else {
        if (y - 1 >= 0 && board[x][y-1][0] != 'r') {
            availableFields.push([x, y-1]);
        }
        if (y + 1 <= 3 && board[x][y+1][0] != 'r') {
            availableFields.push([x, y+1]);
        }
        if (x + 1 <= 5) {
            if (y - 1 >= 0 && board[x+1][y-1][0] == 'r') {
                availableFields.push([x+1, y-1]);
            }
            if (board[x+1][y][0] != 'b') {
                availableFields.push([x+1, y]);
            }
            if (y + 1 <= 3 && board[x+1][y+1][0] == 'r') {
                availableFields.push([x+1, y+1]);
            }
        }
    }
}