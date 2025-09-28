async function gameOver(winner) {
    gameOverFlag = true;
    let div = document.getElementById("gameover");
    div.position = "fixed";
    div.style.width = "300px";
    div.style.height = "200px";
    div.style.left = (window.innerWidth-div.offsetWidth)/2 + "px";
    div.style.top = (window.innerHeight-div.offsetHeight)/2 + "px";
    div.style.display = "block";
    let p = document.createElement("p");
    p.style.textAlign = "center";
    p.style.top = "40px";
    p.style.fontSize = "30px";
    if (winner == "red") p.innerHTML = "Game Over! You win!";
    else if (winner == "blue") p.innerHTML = "Game Over! You lose!";
    else if (winner == "draw") p.innerHTML = "Game Over! It's a draw!";
    else p.innerHTML = winner + " wins!";
    let rematchButton = document.createElement("button");
    rematchButton.style.position = "fixed";
    rematchButton.style.left = "80px";
    // rematchButton.style.left = "30%";
    rematchButton.style.top = "120px";
    rematchButton.style.width = "180px";
    rematchButton.style.height = "80px";
    // rematchButton.style.margin = "auto";
    // rematchButton.top = "500px";
    rematchButton.innerHTML = "<i class='fa-solid fa-rotate'></i> Rematch";
    rematchButton.onclick = function() {location.reload();};

    div.appendChild(p);
    div.appendChild(rematchButton);
    document.getElementById("board").style.filter = "blur(5px)";

    document.addEventListener("click", function() {
        div.style.display = "none";
        document.getElementById("board").style.filter = "none";
    }, {once: true});
}