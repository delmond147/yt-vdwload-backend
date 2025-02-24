const express = require('express');
const cors = require('cors');
const {exec} = require('child_process');
const path = require('path');

const app = express();
PORT = 5000;
app.use(cors());
app.use(express.json());

app.post('/download', (req, res) => {
    const {url, format, quality} = req.body;
    if(!url) return res.status(400).json({ërror: 'URL is required'});	

    const outputPath = path.join(__dirname, "downloads", "%(title)s.%(ext)s");

    // default format selection
    let formatOption = "-f bestvideo+bestaudio";
    if (format === "audio") formatOption = "-f bestaudio --extract-audio --audio-format mp3";
    if (quality) formatOption = `-f "bestvideo[height<=${quality}]+bestaudio/best"`;

    // const command = `yt-dlp ${formatOption} -o "${outputPath}" ${url}`;
    let command;
    if(type === "playlist") {
        command = `yt-dlp ${formatOption} -o "${outputPath}"  --yes-playlist ${url}`;
    } else {
        command = `yt-dlp ${formatOption} -o "${outputPath}" ${url}`;
    }

    const process = exec(command);

    process.stdout.on("data", (data) => {
        console.log(data);
        res.write(data);
    })

    process.stderr.on("data", (data) => {
        console.error(data);
    })

    process.on("exit", () => {
        res.end("Download Completed!")
    })

});

app.listen(PORT, () => console.log("server listening on http://localhost:5000"));