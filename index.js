const express = require("express");
const cors = require('cors');
const path = require("path");
const bodyParser = require('body-parser');
const morgan = require('morgan');
const multer = require('multer');

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(express.static('public'));
app.use(express.json());
app.use(morgan('tiny'));

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.join(__dirname, "/uploads"));
    },
    filename: (req, file, cb) => {
        cb(null, file.filename + '-' + Date.now() + path.extname(file.originalname));
    }
});

const upload = multer({storage: storage});
const fileUpload = upload.fields([{name: "nft-proof-file", maxCount: 1}]);

const {port, apiKey} = require('./config');
const allStreams = require('./routes/allStreams');
const createStream = require('./routes/createStream');
const getStreamByID = require('./routes/getStreamByID');

app.use('/api/allStreams', allStreams);
app.use('/api/createStream', createStream);
app.use('/api/getStreamByID', getStreamByID);

app.get("/", function(req, res) {
    res.send("Yogi NFT backend");
});

app.route('/upload').post(fileUpload, (req, res) => {
    res.json({message: "form submitted successfully"});
})

app.listen(port, function() {
    console.log("The server is up and running at port: ", 5000);
});