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
    
    let totalRow = document.getElementById("totalRow");
    for (let i = 1; i < totalRow.children.length - 1; i++) {
        totalRow.children[i].textContent = totalScores[i - 1];
    }
    totalRow.lastElementChild.textContent = totalScores.reduce((a, b) => a + b, 0);
}



function saveScores() {
    let gameName = document.getElementById("gameName").value;
    let playerInputs = document.querySelectorAll("#headerRow input");
    let totalRow = document.getElementById("totalRow").getElementsByTagName("td");

    let players = [];
    for (let i = 1; i < playerInputs.length; i++) {
        players.push({
            name: playerInputs[i].value,
            score: parseInt(totalRow[i].innerText) || 0
        });
    }

    let data = { game_name: gameName, players: players };

    fetch("save_score.php", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data)
    })
    .then(response => response.json())
    .then(result => {
        alert(result.message);
    })
    .catch(error => console.error("Error:", error));
}


function loadScores() {
    let data = JSON.parse(localStorage.getItem("callBridgeScores")) || [];
    let table = document.getElementById("scoreBody");
    table.innerHTML = "";
    data.forEach(rowData => {
        addRow();
        let lastRow = table.lastElementChild;
        rowData.forEach((val, idx) => lastRow.children[idx + 1].children[0].value = val);
    });
    updateTotals();
}

function resetScores() {
    if (confirm("Are you sure you want to reset scores?")) {
        localStorage.removeItem("callBridgeScores");
        document.getElementById("scoreBody").innerHTML = "";
        updateTotals();
    }
}

function saveGameName() {
    localStorage.setItem("gameName", document.getElementById("gameName").value);
}

function updatePlayerNames() {
    let headers = document.querySelectorAll("#headerRow input");
    let names = Array.from(headers).map(input => input.value);
    localStorage.setItem("playerNames", JSON.stringify(names));
}

document.addEventListener("DOMContentLoaded", function () {
    // Show the password modal on page load
    document.getElementById("passwordModal").style.display = "flex";
});


