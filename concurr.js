const express = require('express');
const app = express();
const port = 3000;

app.get('/data', async (req, res) => {
    let start = Date.now();
    // Simulating a database call with a delay
    setTimeout(() => {
        let timeTaken = Date.now() - start;
        res.send(`Data fetched in ${timeTaken} ms!`);
    }, 2000);
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}/`);
});
