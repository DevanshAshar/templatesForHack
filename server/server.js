const cookieParser = require("cookie-parser");
const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const dotenv=require('dotenv').config()
const app = express()

require('./databaseConnect')
app.use(express.json());
app.use(cookieParser());
app.use(morgan(":method :url :req[header] :status\n"))

const whitelist = [""];
const corsOptions = {
    origin: whitelist,
    optionsSuccessStatus: 200,
    credentials: true,
};
if (process.env.NODE_ENV === "development") {
    app.use(cors({ origin: true, credentials: true }));
} else {
    app.use(cors(corsOptions));
}

//require routes
app.use('/user',require('./routes/userRoutes'))


//route not found
app.use((req, res, next) => {
    res.status(404).json({
        error: "route not found",
    });
});

app.listen(process.env.PORT, () => console.log(`server listening on port ${process.env.PORT}`));