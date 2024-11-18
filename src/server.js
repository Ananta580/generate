const express = require("express");
const fs = require("fs");
const path = require("path");
const fileUpload = require("express-fileupload");

const app = express();
const PORT = 3000;
const DATA_FILE = path.join(__dirname, "assets/database/db.json");

app.use(express.json());
app.use(fileUpload());

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET,POST,PUT,DELETE");
  res.header("Access-Control-Allow-Headers", "Content-Type");
  next();
});

const readData = () => {
  try {
    const data = fs.readFileSync(DATA_FILE, "utf8");
    return JSON.parse(data);
  } catch (error) {
    console.error("Error reading data file:", error);
    return [];
  }
};

const writeData = (data) => {
  try {
    fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2));
  } catch (error) {
    console.error("Error writing to data file:", error);
  }
};

app.get("/api/content", (req, res) => {
  const data = readData();
  res.json(data);
});

app.get("/api/content/:contentId", (req, res) => {
  const { contentId } = req.params;
  const data = readData();
  const content = data.find((item) => item.contentId === parseInt(contentId));
  if (content) {
    res.json(content);
  } else {
    res.status(404).json({ message: "Content not found" });
  }
});

app.post("/api/content", (req, res) => {
  const newContent = JSON.parse(req.body.data);
  const data = readData();
  newContent.contentId =
    data.length > 0 ? data[data.length - 1].contentId + 1 : 1;
  data.push(newContent);
  writeData(data);

  if (req.files && req.files.file) {
    const file = req.files.file;
    const uploadPath = path.join(
      __dirname,
      "assets/images",
      `content-${newContent.contentId}.jpg`
    );
    file.mv(uploadPath, (err) => {
      if (err) {
        console.error("Error uploading file:", err);
      }
    });
  }

  res.status(201).json(newContent);
});

app.put("/api/content/:contentId", (req, res) => {
  const { contentId } = req.params;
  const updatedContent = JSON.parse(req.body.data);
  const data = readData();

  const index = data.findIndex(
    (item) => item.contentId === parseInt(contentId)
  );
  if (index !== -1) {
    data[index] = { ...data[index], ...updatedContent };
    writeData(data);
    res.json(data[index]);
    if (req.files && req.files.file) {
      const file = req.files.file;
      const uploadPath = path.join(__dirname, "assets/images", file.name);
      file.mv(uploadPath, (err) => {
        if (err) {
          console.error("Error uploading file:", err);
        }
      });
    }
  } else {
    res.status(404).json({ message: "Content not found" });
  }
});

app.delete("/api/content/:contentId", (req, res) => {
  const { contentId } = req.params;
  const data = readData();

  const filteredData = data.filter(
    (item) => item.contentId !== parseInt(contentId)
  );
  if (filteredData.length !== data.length) {
    writeData(filteredData);

    const imagePath = path.join(
      __dirname,
      "assets/images",
      `content-${contentId}.jpg`
    );
    if (fs.existsSync(imagePath)) {
      fs.unlink(imagePath, (err) => {
        if (err) {
          console.error("Error deleting image file:", err);
        }
      });
    } else {
      console.error("Image file does not exist:", imagePath);
    }

    res.json({ message: "Content deleted successfully" });
  } else {
    res.status(404).json({ message: "Content not found" });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
