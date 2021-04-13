import axios from 'axios'

export default class tradeService {


    constructor() {
        this.api = axios.create({
            baseURL: 'http://localhost:5000/api',
            //withCredentials: true
        })
    }

    getCoins = (params) => this.api.get(`/getCoins?currency=${params}`)
    getPrices = () => this.api.get('/getPrices')
    getCoinInfo = (params) => this.api.get(`/coin/info?${params}`)
    getHistoDay = (symbol, currency) => this.api.get(`coin/histoday/${symbol}/${currency}`)
    getCoin = (coin_id) => this.api.get(`/coin/${coin_id}`)
}