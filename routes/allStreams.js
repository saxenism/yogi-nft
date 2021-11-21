const {Router} = require('express');
const {apiKey} = require("../config.js");
const {parse, stringify, toJSON, fromJSON} = require('flatted');

const router = Router();

const Livepeer = require('livepeer-nodejs');
const livepeerObject = new Livepeer(apiKey);

router.get('/', async function(req, res) {
    try {
        const stream = await livepeerObject.Stream.getAll(streamOnly = 0, isActive = false, record = false);

        if(!stream) {
            return res.status(404).json({
                message: "No streams found"
            });
        } 
        res.status(200).send(toJSON(stream));
    } catch(error) {
        res.status(400).json({message: error.message});
    }
});

module.exports = router;
