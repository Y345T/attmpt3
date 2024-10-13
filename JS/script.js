const API_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjJmODk1MzYxLTEyYjUtNDI2Ni1iNTc4LWExMGVhMmMzNjg5NSIsIm5vbmNlIjoiY2FkYWExOGQtMDc2My00MmY2LTkxZDEtMDMzYTJjZmU2MGVkIiwic2VydmljZSI6ImFmZmlsaWF0ZVN0YXRzIiwiaWF0IjoxNzI2MDE0Njc0fQ.YivdvQYS5wbM-y38z7hlZ_ia83ZLiUPz3u-uzHb3F5Y';

// Fetch the leaderboard data from the API
async function fetchLeaderboardData() {
    try {
        const response = await fetch('https://roobetconnect.com/affiliate/v2/stats?userId=2f895361-12b5-4266-b578-a10ea2c36895', {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${API_KEY}`,
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
