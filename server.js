const express = require("express");
const path = require("path");
const app = express();
const bodyParser = require("body-parser");
const PORT = 3000;

const accountRouter = require("./routers/account");

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.use('/public', express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
    res.json("Hello world!");
})

app.get('/home', (req, res, next) => {
    res.sendFile(path.join(__dirname, 'index.html'));
})

app.use('/api/account/', accountRouter);

app.listen(PORT, () => {
    console.log(`Server is listening at http://localhost:${PORT}`);
})