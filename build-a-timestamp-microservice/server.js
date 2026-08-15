import express from "express";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

app.use(cors({ optionsSuccessStatus: 200 }));

app.use(express.static("public"));

app.get("/", (_req, res) => {
  res.sendFile(__dirname + "/views/index.html");
});

// Do not change code above this line

app.get("/api", (req, res) => {
  const date = new Date();

  res.json({
    unix: date.getTime(),
    utc: date.toUTCString()
  })

})

app.get("/api/:date", (req, res) => {

  const date = req.params.date;

  const inputDate = isNaN(date)
    ? new Date(date)
    : new Date(Number(date));

  if (isNaN(inputDate.getTime())){
    res.json({ error: "Invalid Date" })
  }

  res.json({
    unix: inputDate.getTime(),
    utc: inputDate.toUTCString()
  });

})

// Do not change code below this line

const PORT = 8000;
const listener = app.listen(PORT, function () {
  console.log("Your app is listening on port " + listener.address().port);
});
