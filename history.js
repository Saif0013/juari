document.addEventListener("DOMContentLoaded", function () {
    fetch("https://saiful0013.great-site.net/get_history.php")
        .then(response => response.json())
        .then(data => {
            const tableBody = document.getElementById("historyBody");
            tableBody.innerHTML = "";

            data.forEach(record => {
                let row = document.createElement("tr");

                let playerScores = record.players.map(player => `<span>${player.name}: ${player.score}</span>`).join(", ");

                row.innerHTML = `
                    <td>${record.date_played}</td>
                    <td>${record.game_name}</td>
                    <td>${playerScores}</td>
                    <td><button onclick="deleteRecord(${record.id})">Delete</button></td>
                `;

                tableBody.appendChild(row);
            });
        })
        .catch(error => console.error("Error fetching history:", error));
});

function deleteRecord(id) {
    if (confirm("Are you sure you want to delete this record?")) {
        fetch("https://saiful0013.great-site.net/delete_score.php?id=" + id, { method: "GET" })
            .then(response => response.json())
            .then(result => {
                alert(result.message);
                location.reload();
            })
            .catch(error => console.error("Error deleting record:", error));
    }
}



