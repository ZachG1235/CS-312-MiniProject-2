import express from "express";
import bodyParser from "body-parser";
import axios from "axios";

const app = express();
const port = 3000;
const API_BASE_URL = "https://v2.jokeapi.dev/joke/Any?type=twopart";
const ALL_BLACKLIST_FLAGS = "nsfw,religious,political,racist,sexist,explicit";

app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

app.get("/", async (req, res) => {
    try {
        const response = await axios.get(`${API_BASE_URL}&blacklistFlags=${ALL_BLACKLIST_FLAGS}`);
        console.log(response.data);
        res.render("index.ejs", {joke : response.data });
    }
    catch (error) {
        console.error("Failed to make request:", error.message);
        res.render("index.ejs", {joke : ""});
    }
});

app.post("/", async (req, res) => {
    let flag_array = Object.keys(req.body);
    let flag_str = flag_array.join(',');
    try{
        const response = await axios.get(`${API_BASE_URL}&blacklistFlags=${flag_str}`);
        console.log(response.data);
        res.render("index.ejs", {joke : response.data});
    }
    catch (error) {
        console.error("Failed to make request:", error.message);
        res.render("index.ejs", {joke : ""});
    }
});

app.listen(port, () => {
    console.log(`Server running on port ${port}.`);
});

