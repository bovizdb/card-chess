async function capture(x, y) {
    deselectAnimation(board[x][y]);
    images[board[x][y]].style.zIndex = "30";
    if (board[x][y][0] == 'r') {
        capturedRed.push(board[x][y]);
        slideAnimation(board[x][y], positions["red-deck"].x + capturedRed.length*(cardWidth/4), positions["red-deck"].y);
    }
    else {
        if (!visible[board[x][y]]) {
            await flipAnimation(board[x][y]);
            visible[board[x][y]] = 1;
        }
        capturedBlue.push(board[x][y]);
        slideAnimation(board[x][y], positions["blue-deck"].x + capturedBlue.length*(cardWidth/4), positions["blue-deck"].y);
    }
}