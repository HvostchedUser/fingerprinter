const express = require("express")
const app = express();
app.use(express.static('static'));
app.set('view engine', 'pug');
app.get('/', function (req, res) {
    const headers = req.headers;
    headers.userAgent = headers['user-agent'];
    headers.acceptLanguage = headers['accept-language'];
    headers.acceptEncoding = headers['accept-encoding'];
    headers.ifNoneMatch = headers['if-none-match'];

    res.render('index', {headers});
});

const PORT = process.env.PORT;

app.listen(PORT, function () {
  console.log(`Started on ${PORT}`);
});

