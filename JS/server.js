import express from 'express';
import fetch from 'node-fetch';
import cors from 'cors';

const app = express();
const PORT = process.env.PORT || 3001; // Using port 3001

// Enable CORS for all routes
app.use(cors());

// Replace this with your actual API key
const API_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjJmODk1MzYxLTEyYjUtNDI2Ni1iNTc4LWExMGVhMmMzNjg5NSIsIm5vbmNlIjoiY2FkYWExOGQtMDc2My00MmY2LTkxZDEtMDMzYTJjZmU2MGVkIiwic2VydmljZSI6ImFmZmlsaWF0ZVN0YXRzIiwiaWF0IjoxNzI2MDE0Njc0fQ.YivdvQYS5wbM-y38z7hlZ_ia83ZLiUPz3u-uzHb3F5Y';

app.get('/api/leaderboard', async (req, res) => {
    const apiUrl = 'https://roobetconnect.com/affiliate/v2/stats?userId=2f895361-12b5-4266-b578-a10ea2c36895'; // Correct API URL
    
    try {
        const response = await fetch(apiUrl, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${API_KEY}`,
                'Content-Type': 'application/json'
            }
        });

        if (!response.ok) {
            return res.status(response.status).send('Error fetching data');
        }

        const data = await response.json();
        res.json(data); // Send the data to the frontend
    } catch (error) {
        res.status(500).send('Error fetching leaderboard data');
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
