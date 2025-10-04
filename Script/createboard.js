async function createBoard() {
    for (let i = 0; i < 13; i++) {
        let id = (i < 9 ? "0" : "") + (i+1);
        id = String(id);
        if (i < 12) {
            redCards.push("r" + id);
            blueCards.push("b" + id);
        }
        ids.push("r" + id);
        ids.push("b" + id);
    }

    cardWidth = Math.min(window.innerWidth/8, (window.innerHeight/10)*(9/11));
    cardHeight = cardWidth * (11/9);

    ids.forEach(id => {
        images[id] = document.createElement("img");
        if (id[0] == 'r') {
            images[id].src = "Images/Cards/" + id + ".png";
            images[id].alt = id;
            images[id].style.opacity = "0.8";
            images[id].addEventListener("mouseover", function() {zoomIn(id);});
            images[id].addEventListener("mouseout", function() {zoomOut(id);});
        }
        else {
            images[id].src = "Images/Cards/b14.png";
            images[id].alt = "back";
        }
        images[id].style.position = "absolute";
        images[id].id = id;
        images[id].alt = id;
        images[id].style.width = cardWidth + "px";
        images[id].addEventListener("click", function() {select(getCoords(id)[0], getCoords(id)[1]);});
        document.getElementById("board").appendChild(images[id]);
    });

    let randPoz = Math.floor(Math.random()*12);
    swapCardRed = redCards[randPoz];
    redCards.splice(randPoz, 1);
    randPoz = Math.floor(Math.random()*4)+8;
    redCards.sort(function() {return 0.5 - Math.random()});
    redCards.splice(randPoz, 0, "r13");

    randPoz = Math.floor(Math.random()*12);
    swapCardBlue = blueCards[randPoz];
    blueCards.splice(randPoz, 1);
    randPoz = Math.floor(Math.random()*4);
    blueCards.sort(function() {return 0.5 - Math.random()});
    blueCards.splice(randPoz, 0, "b13");

    visible[swapCardRed] = 0;
    visible[swapCardBlue] = 0;
    for (let i = 0; i < 12; i++) {
        visible[redCards[i]] = 0;
        visible[blueCards[i]] = 0;
    }

    for (let i = 0; i < 12; i += 4) {
        let row = blueCards.slice(i, i+4);
        board.push(row);
    }

    for (let i = 0; i < 12; i += 4) {
        let row = redCards.slice(i, i+4);
        board.push(row);
    }
}