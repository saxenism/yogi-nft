const {Router} = require('express');
const {apiKey} = require("../config.js");
const {parse, stringify, toJSON, fromJSON} = require('flatted');

const router = Router();

const Livepeer = require('livepeer-nodejs');
const livepeerObject = new Livepeer(apiKey);

router.get('/:streamID', async function(req, res) {
    console.log(req.params.streamID);
    try {
        const stream = await livepeerObject.Stream.get(req.params.streamID);
        if(!stream) {
            return res.status(404).json({
                message: "No stream found!"
            });
        }
        res.status(200).send(toJSON(stream));
    } catch(error) {
        res.status(400).json({error_message: error.message});
    }
    
})

module.exports = router;