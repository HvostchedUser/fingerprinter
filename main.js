const express = require("express")
const app = express();
const geoip = require('geoip-lite');
app.use(express.static('static'));
app.set('view engine', 'pug');
app.set('trust proxy', true)
app.get('/', function (req, res) {
    const headers = req.headers;
    headers.userAgent = headers['user-agent'];
    headers.acceptLanguage = headers['accept-language'];
    headers.acceptEncoding = headers['accept-encoding'];
    headers.ifNoneMatch = headers['if-none-match'];

    const ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
    console.log(ip);
    const gip = geoip.lookup(ip);
    console.log(gip);
    res.render('index', {headers});
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, function () {
  console.log(`Started on ${PORT}`);
});

