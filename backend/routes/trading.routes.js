const { response } = require('express')
const express = require('express')
const router = express.Router()
const rp = require('request-promise');
const { json } = require('body-parser');
const Coin = require('../models/coin.model')

const baseURL = 'https://pro-api.coinmarketcap.com/v1/'
const baseURLv2 = 'https://pro-api.coinmarketcap.com/v2/'
const baseURLCryptCompare = 'https://min-api.cryptocompare.com/data/v2/'

const requestOptions = {
    method: 'GET',
    uri: baseURL,
    qs: {
        'start': '1',
        'limit': '5000',
        'convert': 'USD'
    },
    headers: {
        'X-CMC_PRO_API_KEY': process.env.API_KEY
    },
    json: true,
    gzip: true
};

let arrCoins = []

//Get 100 cripto-coins
router.get('/getCoins', (req, res) => {

    const { currency } = req.query
    requestOptions.uri = `${baseURL}cryptocurrency/listings/latest`
    requestOptions.qs = {
        'start': '1',
        'limit': '100',
        'convert': currency
    }
    let respuesta
    rp(requestOptions)
        .then(response => {
            arrCoins.push(response.data)
            res.json(response.data)

        })
        .then(res => {
            const data = arrCoins[0].map(element => {

                if (element.quote.USD) {
                    const { percent_change_7d } = element.quote.USD
                    const { percent_change_1h } = element.quote.USD
                    // console.log(percent_change_1h)
                    return { id: element.id, name: element.name, price: element.quote.USD.price, change_7d: percent_change_7d, change_1h: percent_change_1h, symbol: element.symbol, marketCap: element.quote.USD.market_cap }
                }
                if (element.quote.EUR) {
                    const { percent_change_7d } = element.quote.EUR
                    const { percent_change_1h } = element.quote.EUR
                    // console.log('OK')
                    return { id: element.id, name: element.name, price: element.quote.EUR.price, change_7d: percent_change_7d, change_1h: percent_change_1h, symbol: element.symbol, marketCap: element.quote.EUR.market_cap }
                }
            })

            Coin.collection.drop('coins')
                .then(el => {
                    console.log('Se borró', el)
                    Coin.create(data)
                        .then(coins => {

                            return coins
                        })
                        .catch(err => res.json(err))
                })
                .catch(err => console.log('err de method bbdd', err))
            // console.log(data)
        })
        .catch(err => console.log(err))
})

// Get coin info by Id
router.get('/coin/info', (req, res) => {
    requestOptions.uri = `${baseURLv2}cryptocurrency/info`
    requestOptions.qs = {
        id: `${req.query.id}`,
        aux: 'logo'
    }

    rp(requestOptions)
        .then(response => {
            res.json(response.data);
        })
        .catch((err) => {
            console.log('eRRAPI call error:', err.message);
        });
})

router.get('/coin/histoday/:coin_symbol/:currency', (req, res) => {

    rp(`${baseURLCryptCompare}histohour?fsym=${req.params.coin_symbol}&tsym=${req.params.currency}&limit=168`)
        .then(response => {
            res.send(response);
        })
        .catch((err) => {
            console.log('API call error:', err.message);
        });
})

router.get('/coin/:coin_symbol', (req, res) => {

    console.log(req)
    Coin.find({ id: req.params.coin_symbol })
        .then(response => res.json(response))
        .catch(err => console.log(err))
})


module.exports = router