const express = require('express');
const cors = require('cors');
const {exec} = require('child_process');
const path = require('path');

const app = express();
PORT = 5000;
app.use(cors());
app.use(express.json());

app.post('/download', async (req, res) => {
    const {url, format, quality} = req.body;
    if(!url) return res.status(400).json({ërror: 'URL is required'});	

    const outputPath = path.join(__dirname, "downloads", "%(title)s.%(ext)s");

    // default format selection
    let formatOption = "-f bestvideo+bestaudio";
    if (format === "audio") formatOption = "-f bestaudio --extract-audio --audio-format mp3";
    if (quality) formatOption = `-f "bestvideo[height<=${quality}]+bestaudio/best"`;

    const command = `yt-dlp ${formatOption} -o "${outputPath}" ${url}`;

    // replace the default format with the selected format
    exec(command, (error, stdout, stderr) => {
        if (error) return res.status(500).json({ërror: stderr});
        res.json({message: "Download Started" });	

    });
});

app.listen(PORT, () => console.log("server listening on http://localhost:5000"));