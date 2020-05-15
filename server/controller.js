const axios = require ('axios')

const getFeed = (req, res) => {
  axios
  .get(`https://api.stocktwits.com/api/2/streams/symbol/${req.params.symbol}.json`)
  .then(({data})=> {
    res.json(data)
  })
  .catch(error => {
    res.status(400).send(`error processing request: ${error}`)
  })
};

module.exports = { getFeed }