const express = require('express');
const fs = require('fs');
const app = express();

// Middleware для проверки User-Agent (только Roblox)
app.use((req, res, next) => {
    const userAgent = req.headers['user-agent'] || '';
    if (!userAgent.includes('Roblox')) {
        return res.status(403).send(`
            <!DOCTYPE html>
            <html>
            <head>
                <title>MTGH Vanguard</title>
                <style>
                    body { 
                        font-family: Arial, sans-serif; 
                        background-color: #f0f0f0; 
                        text-align: center; 
                        padding: 50px; 
                    }
                    .container { 
                        background: white; 
                        padding: 30px; 
                        border-radius: 10px; 
                        box-shadow: 0 0 10px rgba(0,0,0,0.1); 
                        max-width: 600px; 
                        margin: 0 auto; 
                    }
                    h1 { color: #e74c3c; }
                </style>
            </head>
            <body>
                <div class="container">
                    <h1>MTGH Vanguard</h1>
                    <h2>Advanced Security Protection System</h2>
                    <hr>
                    <h3>Security Breach Detected</h3>
                    <p>Your access request has been denied by our security protocols</p>
                    <hr>
                    <p>You're accessing a Script Endpoint which is Protected by MTGH Vanguard.</p>
                </div>
            </body>
            </html>
        `);
    }
    next();
});

// Маршрут для скрипта
app.get('/script', (req, res) => {
    try {
        const scriptContent = fs.readFileSync('./BrnRt.lua', 'utf8');
        res.type('text/plain').send(scriptContent);
    } catch (err) {
        res.status(500).send('Error loading script');
    }
});

app.listen(3000, () => {
    console.log('Server running on port 3000');
});