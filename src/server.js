const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const routes = require("./routes/index");

const app = express();
dotenv.config();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());
app.use(routes);

app.use((_req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
});

app.use(function (err, _req, res, _next) {
    console.error("error", err);
    res.status(500);
    res.send({
        message: "Unfortunately a Technical Error Occurred",
    });
});

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
    console.log(`Business CMS Backend 🚀Server Started on PORT ${PORT}`);
});