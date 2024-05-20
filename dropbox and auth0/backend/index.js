require("dotenv").config();
const express = require("express");
const multer = require("multer");
const { Dropbox } = require("dropbox");
const fetch = require("isomorphic-fetch");
const fs = require("fs");
const cors = require("cors");
const app = express();
const port = 3036;
const dbx = new Dropbox({
  accessToken: process.env.ACCESS_TOKEN,
  fetch,
});
app.use(cors());
const upload = multer({ dest: "uploads/" });

app.get("/list-files", async (req, res) => {
  const path = req.query.path || ""; // Use root path by default if not specified
  try {
    const files = await dbx.filesListFolder({ path });
    res.json(files.result.entries);
  } catch (error) {
    console.error("Error listing files:", error);
    res.status(500).json({ error: error.message });
  }
});

// Route to upload a file to Dropbox
app.post("/upload", upload.single("file"), async (req, res) => {
  try {
    const fileContent = fs.readFileSync(req.file.path);
    const response = await dbx.filesUpload({
      path: "/" + req.file.originalname,
      contents: fileContent,
    });
    fs.unlinkSync(req.file.path); // Clean up by deleting the temporary file
    res.json({ message: "File uploaded successfully.", data: response.result });
  } catch (error) {
    console.error("Error uploading file:", error);
    res.status(500).json({ error: error.message });
  }
});

// Route to download a file from Dropbox
app.get("/download", async (req, res) => {
  const { path } = req.query;
  try {
    const fileDownloaded = await dbx.filesDownload({ path });
    res.json({ message: "File downloaded successfully.", data: fileDownloaded.result });
  } catch (error) {
    console.error("Error downloading file:", error);
    res.status(500).json({ error: error.message });
  }
});

// Route to delete a file from Dropbox
app.delete("/delete", async (req, res) => {
  const { path } = req.query;
  try {
    const fileDeleted = await dbx.filesDeleteV2({ path });
    res.json({ message: "File deleted successfully.", data: fileDeleted.result });
  } catch (error) {
    console.error("Error deleting file:", error);
    res.status(500).json({ error: error.message });
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});
