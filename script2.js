async function fetchLeaderboardData() {
    const apiUrl = 'http://localhost:3001/api/leaderboard'; // Set to your local server endpoint
    try {
        const response = await fetch(apiUrl, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching leaderboard data:', error);
    }
}

// Function to render the leaderboard on the webpage
function renderLeaderboard(leaderboardData) {
    const tbody = document.getElementById('leaderboard-body');
    leaderboardData.forEach(player => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${player.rank}</td>
            <td>${player.username}</td>
            <td>$${player.wagered.toLocaleString()}</td>
            <td>${player.favoriteGameTitle}</td>
            <td>${player.level}</td>
            <td>${player.prize}</td>
        `;
        tbody.appendChild(row);
    });
}

// Main function to populate the leaderboard
async function populateLeaderboard() {
    const leaderboardData = await fetchLeaderboardData();
    if (leaderboardData) {
        renderLeaderboard(leaderboardData);
    }
}

// Call the populateLeaderboard function to load the data on page load
populateLeaderboard();
