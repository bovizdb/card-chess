async function remove() {
    document.querySelectorAll('.circle').forEach(async item => {
        item.style.transform = "scale(0)";
        item.style.transition = "transform 0.2s";
        await new Promise(resolve => setTimeout(resolve, 200));
        item.remove();
    });
}

async function deselect() {
    selected = [-1, -1];
    availableFields = [];
    ids.forEach(id => {
        deselectAnimation(id);
    });
}
