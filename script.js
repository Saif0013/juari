function addRow() {
    let table = document.getElementById("scoreBody");
    let row = document.createElement("tr");
    let cell = document.createElement("td");
    cell.textContent = table.rows.length + 1;
    row.appendChild(cell);
    
    let cols = document.getElementById("headerRow").children.length - 2;
    for (let i = 0; i < cols; i++) {
        let inputCell = document.createElement("td");
        let input = document.createElement("input");
        input.type = "number";
        input.oninput = updateTotals;
        inputCell.appendChild(input);
        row.appendChild(inputCell);
    }
    
    let totalCell = document.createElement("td");
    totalCell.textContent = 0;
    row.appendChild(totalCell);
    
    table.appendChild(row);
}

function removeRow() {
    let table = document.getElementById("scoreBody");
    if (table.rows.length > 0) {
        table.deleteRow(-1);
        updateTotals();
    }
}


function updatePlayerNames() {
    let headers = document.querySelectorAll("#headerRow input");
    let names = Array.from(headers).map(input => input.value);
    localStorage.setItem("playerNames", JSON.stringify(names));
}


function updateTotals() {
    let rows = document.getElementById("scoreBody").children;
    let totalScores = new Array(rows[0]?.children.length - 2).fill(0);

    for (let row of rows) {
        let total = 0;
        for (let i = 1; i < row.children.length - 1; i++) {
            let value = parseInt(row.children[i].children[0]?.value) || 0;
            total += value;
            totalScores[i - 1] += value;
        }
        row.lastElementChild.textContent = total;
    }

    let totalInputs = document.querySelectorAll("input[name='player_scores[]']");
    for (let i = 0; i < totalInputs.length; i++) {
        totalInputs[i].value = totalScores[i];
    }

    document.getElementById("input_game_total").value = totalScores.reduce((a, b) => a + b, 0);
}


document.querySelector("form").addEventListener("submit", function () {
    updateTotals();
});



