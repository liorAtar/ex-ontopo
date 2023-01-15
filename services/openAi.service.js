const { Configuration, OpenAIApi } = require("openai");
const configuration = new Configuration({
    apiKey: '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'
});
const openai = new OpenAIApi(configuration);


const express = require('express')
const router = express.Router()
router.get('/', getRecomandation)

async function getRecomandation(req, res) {
    try {
        const txt = req.query.txt
        console.log('txt', req.query)
        const response = await openai.createCompletion({
            model: "text-davinci-002",
            prompt: `${txt}`,
            temperature: 0.9,
            max_tokens: 2048,
        });
        // return response
        res.status(200).json({ result: response.data.choices[0].text });
    } catch (err) {
        console.log(err);
    }
}

module.exports = router

// module.exports = {
//     getRecomandation
// }