const {Router} = require('express');
const {apiKey} = require("../config.js");
const {parse, stringify, toJSON, fromJSON} = require('flatted');

const router = Router();

const Livepeer = require('livepeer-nodejs');
const livepeerObject = new Livepeer(apiKey);

router.post('/', async function (req, res) {
    const {authorizationHeader} = req.headers;
    const {streamName, streamProfiles} = req.body;

    try {
        const stream = await livepeerObject.Stream.create(
            {
                "name": "check_if_we_get_playbackID",
                "profiles": [
                    {
                        "name": "720p",
                        "bitrate": 2000000,
                        "fps": 30,
                        "width": 1280,
                        "height": 720
                    },
                    {
                        "name": "480p",
                        "bitrate": 1000000,
                        "fps": 30,
                        "width": 854,
                        "height": 480
                    },
                    {
                        "name": "36p",
                        "bitrate": 500000,
                        "fps": 30,
                        "width": 640,
                        "height": 360
                    },    
                ]
            }
        );
        if(stream) {
            res.status(200).send(toJSON(stream));
            console.log(stream.playbackId);
        }
    } catch (error) {
        res.status(500).json({message: error.message});
    }
});

module.exports = router;