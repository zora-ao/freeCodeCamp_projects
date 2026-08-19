import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import { inputCleaner, inputValidator } from "./middleware.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

app.use(express.urlencoded({ extended: true }))


app.get("/", (req, res) => {
    res.redirect("/form")
});

app.get("/form", (req, res) => {
    res.sendFile(path.join(__dirname, "public", "index.html"));
});

app.use(inputCleaner);
app.use(inputValidator);

app.post("/submit", (req, res) => {
    res.send(
        `Username: ${req.body.username}
        Commnent: ${req.body.comment}`
    );
});

app.listen(3000, () => {
    console.log(`Running on port:3000`)
});
