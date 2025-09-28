createFields();

async function createFields() {
    createBoard();

    let rules = document.getElementById("rules");
    rules.style.left = (window.innerWidth-rules.offsetWidth)/2 + "px";
    rules.style.display = "none";

    const redDeck = document.createElement("div");
    redDeck.className = "deck";
    redDeck.id = "red-deck";
    redDeck.style.position = "fixed";
    redDeck.style.left = window.innerWidth/2 - 2.5*cardWidth + "px";
    redDeck.style.top = window.innerHeight/2 - 4.5*cardHeight + "px";
    document.getElementById("board").appendChild(redDeck);
    positions["red-deck"] = {x: window.innerWidth/2 - cardWidth, y: window.innerHeight/2 - 4.5*cardHeight};

    const blueDeck = document.createElement("div");
    blueDeck.className = "deck";
    blueDeck.id = "blue-deck";
    blueDeck.style.position = "fixed";
    blueDeck.style.left = window.innerWidth/2 - 2.5*cardWidth + "px";
    blueDeck.style.top = window.innerHeight/2 + 3.5*cardHeight + "px";
    document.getElementById("board").appendChild(blueDeck);
    positions["blue-deck"] = {x: window.innerWidth/2 - 2.5*cardWidth, y: window.innerHeight/2 + 3.5*cardHeight};

    positions[swapCardRed] = {x: window.innerWidth/2 + 2*cardWidth, y: window.innerHeight/2 + cardHeight};
    positions["-1,0"] = {x: window.innerWidth/2 + 2*cardWidth, y: window.innerHeight/2 + cardHeight};
    images[swapCardRed].style.left = positions["red-deck"].x + "px";
    images[swapCardRed].style.top = positions["red-deck"].y + "px";
    images[swapCardRed].style.zIndex = "1";
    images[swapCardRed].style.borderRadius = "15px";
    coords[swapCardRed] = {x: -1, y: 0};

    positions[swapCardBlue] = {x: window.innerWidth/2 + 2*cardWidth, y: window.innerHeight/2 - 2*cardHeight};
    positions["-1,1"] = {x: window.innerWidth/2 + 2*cardWidth, y: window.innerHeight/2 - 2*cardHeight};
    images[swapCardBlue].style.left = positions["red-deck"].x + "px";
    images[swapCardBlue].style.top = positions["red-deck"].y + "px";
    images[swapCardBlue].style.borderRadius = "15px";
    coords[swapCardBlue] = {x: -1, y: 1};

    for (let i = 0; i < 6; i++) {
        for (let j = 0; j < 4; j++) {
            positions[board[i][j]] = {x: window.innerWidth/2 + (j - 2.5) * cardWidth, y: window.innerHeight/2 + (i-3) * cardHeight};
            positions[i+','+j] = {x: window.innerWidth/2 + (j - 2.5) * cardWidth, y: window.innerHeight/2 + (i-3) * cardHeight};
            coords[board[i][j]] = {x: i, y: j};

            images[board[i][j]].style.left = positions['red-deck'].x + "px";
            images[board[i][j]].style.top = positions['red-deck'].y + "px";
            images[board[i][j]].style.zIndex = 25 - (i*4+j);
            images[board[i][j]].style.borderRadius = "15px";
        }
    }


    window.addEventListener("load", function() {refresh();});
}