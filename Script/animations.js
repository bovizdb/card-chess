document.addEventListener('keydown', function(event) {
    if (event.key === "Escape") {
        toggleRules('hide');
    }
});

document.getElementById("rules-button").addEventListener("mouseover", function() {
    if (document.getElementById("rules").style.display == "block") return;
    this.style.transform = "scale(1.1)";
    this.style.transition = "transform 0.2s";
});

document.getElementById("rules-button").addEventListener("mouseout", function() {
    if (document.getElementById("rules").style.display == "block") return;
    this.style.transform = "scale(1)";
});

let rulesButtonInterval = setInterval(() => {
    document.getElementById("rules-button").style.transform = "scale(1.1)";
    document.getElementById("rules-button").style.transition = "transform 1s";
    setTimeout(() => {
        document.getElementById("rules-button").style.transform = "scale(1)";
        document.getElementById("rules-button").style.transition = "transform 1s";
    }, 1000);
}, 2000);

function hideRules() {
    toggleRules('hide');
    document.removeEventListener("click", hideRules);
}

async function toggleRules(action) {
    clearInterval(rulesButtonInterval);
    let rulesElement = document.getElementById("rules");
    let boardElement = document.getElementById("board");
    let buttonElement = document.getElementById("rules-button");
    if (action === 'show') {
        boardElement.style.filter = "blur(5px)";
        rulesElement.style.display = "block";
        rulesElement.style.transform = "scale(0)";
        rulesElement.style.transition = "transform 0.2s";
        setTimeout(() => {
            rulesElement.style.transform = "scale(1)";
        }, 0);
        await new Promise(resolve => setTimeout(resolve, 400));
    } else if (action === 'hide') {
        rulesElement.style.transform = "scale(0)";
        await new Promise(resolve => setTimeout(resolve, 200));
        rulesElement.style.display = "none";
        boardElement.style.filter = "none";
        buttonElement.style.transform = "scale(1)";
    }
}

function zoomIn(id) {
    if ((!promotionFlag && turn % 2 == 1) || id[0] == 'b' || document.getElementById(id).style.transform == "scale(1.1)") return;
    document.getElementById(id).style.transform = "scale(1.05)";
    document.getElementById(id).style.transition = "transform 0.2s";
}

function zoomOut(id) {
    if (document.getElementById(id).style.transform != "scale(1.05)") return;
    document.getElementById(id).style.transform = "scale(1)";
    document.getElementById(id).style.transition = "transform 0.2s";
}

async function selectAnimation(id) {
    let item = document.getElementById(id);
    if (item == null) return;
    item.style.transform = "scale(1.1)";
    item.style.transition = "transform 0.2s";
    item.style.backgroundColor = "rgb(255, 255, 255)";
    await new Promise(resolve => setTimeout(resolve, 200));
}

async function deselectAnimation(id) {
    let item = document.getElementById(id);
    item.style.removeProperty("background-color");
    item.style.transform = "scale(1)";
    item.style.transition = "transform 0.2s";
}

async function slideAnimation(id, x, y, duration=500) {
    let item = document.getElementById(id);
    let z = item.style.zIndex;
    item.style.zIndex = "100";
    item.style.left = x + "px";
    item.style.top = y + "px";
    item.style.transition = `left ${duration}ms, top ${duration}ms`;
    await new Promise(resolve => setTimeout(resolve, duration));
    item.style.zIndex = z;
}

async function flipAnimation(id) {
    if (visible[id] == 1) return;
    visible[id] = 1;
    let item = document.getElementById(id);
    if (id[0] == 'r') {
        item.style.opacity = "1";
        item.style.transition = "opacity 0.2s";
        await new Promise(resolve => setTimeout(resolve, 200));
        return;
    }
    item.style.rotate  ="x -90deg"
    item.style.transition = "rotate 0.2s";
    await new Promise(resolve => setTimeout(resolve, 300));
    item.src = "Images/Cards/" + id + ".png";
    item.style.rotate  ="x 0deg"
    item.alt = id;
    await new Promise(resolve => setTimeout(resolve, 400));
}