const { Configuration, OpenAIApi } = require("openai");
const apiKeys = [
    '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',
    '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',
    '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',
    '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',
    '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',
]

let idx = 0;


const express = require('express')
const router = express.Router()
router.get('/', getRecomandation)

async function getRecomandation(req, res) {
    try {
        const configuration = new Configuration({
            apiKey: apiKeys[idx]
        });
        const openai = new OpenAIApi(configuration);
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
        if(idx === 4) {
            idx = 0
        } else {
            idx += 1
        }
        getRecomandation(req, res)
    }
}

module.exports = router

// module.exports = {
//     getRecomandation
// }