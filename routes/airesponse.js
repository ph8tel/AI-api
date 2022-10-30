var express = require('express');
var router = express.Router();
var cors = require('cors')
const bodyParser = require('body-parser');
router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json())
const { Configuration, OpenAIApi } = require("openai");
const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

function formQuestion(params) {
  
  return `predict the likely  monthly cost range, from minimum to max, in us dollars for auto insurance for a ${params.carcost} car driven by a  ${params.age} year old ${params.sex} living in the US zip code ${params.zipcode}. The driver has a ${params.drivingrecord} driving record. ` 
  //  return `what is the average monthly cost for auto insurance in Denver Colorado`
}
/* GET AI status */
router.get('/',cors(), async function(req, res, next) {
  const response = await openai.createCompletion({
    model: "text-davinci-002",
    prompt: formQuestion(req.query),
    temperature: 0.8,
    max_tokens: 200,
  }).catch( e => res.send(e))
  res.json({ choices: response.data.choices[0].text || null});
});
router.post('/', function(req, res, next){
  console.dir(req)
  res.json({"ok": true})
} )
module.exports = router;
