const { Configuration, OpenAIApi } = require("openai");
const configuration = new Configuration({
    apiKey: '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'
});
const openai = new OpenAIApi(configuration);

const express = require('express')
const router = express.Router()
router.get('/', getRecomandation)
const recommend = "\n Some popular restaurants in Israel include: \n 1. Carmel Market - a large outdoor market in Tel Aviv with stalls selling fresh produce, spices, prepared food, and more \n 2. Falafel Bodega - a small chain of falafel stands offering fresh, made-to-order falafel balls in a variety of flavors \n 3. Hummus Bar - a chain of restaurants specializing in Lebanese - style hummus dishes \n 4. Machne Yehuda Market - a large outdoor market in Jerusalem with stalls selling fresh produce, prepared food, and more \n 5. Zahav - a Michelin - starred Israeli restaurant in Philadelphia, serving modern Israeli cuisine"

async function getRecomandation(req, res) {
    try {
        const txt = req.query.txt
        const response = await openai.createCompletion({
            model: "text-davinci-002",
            prompt: `${txt}`,
            temperature: 0.9,
            max_tokens: 2048,
        });
        // return response
        res.status(200).json({ result: response.data.choices[0].text });
    } catch (err) {
        res.status(200).json({ result: recommend });
        console.log(err);
    }
}

module.exports = router