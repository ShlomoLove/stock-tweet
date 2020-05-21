const axios = require ('axios')

const getFeed = (req, res) => {
  const symbol = req.params.symbol
  axios
    .get(`https://api.stocktwits.com/api/2/streams/symbol/${symbol}.json`)
    .then(({data}) => {
      res.send(data)
    })
    .catch(error => res.sendStatus(404))
}

const getTrending = (req, res) => {
  axios
    .get(`https://api.stocktwits.com/api/2/trending/symbols.json`)
    .then(({data}) => {
      res.send(data)
    })
    .catch(error => res.sendStatus(404))
}

module.exports = { getFeed, getTrending }