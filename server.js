const express = require('express');
const cors = require('cors');
const {exec} = require('child_process');

const app = express();
PORT = 5000;
app.use(cors());
app.use(express.json());

app.post('/download', async (req, res) => {
    const videoUrl = req.body.url;
    if(!videoUrl) return res.status(400).json({ërror: 'URL is required'});	

    const command = `youtube-dl -f best -o "downloads/%(title)s.%(ext)s" ${videoUrl}`;
    exec(command, (error, stdout, stderr) => {
        if (error) return res.status(500).json({ërror: stderr});
        res.json({message: "Download Started" });	

    });
});

app.listen(PORT, () => console.log("server listening on http://localhost:5000"));