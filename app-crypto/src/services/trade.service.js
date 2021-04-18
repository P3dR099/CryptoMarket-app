import axios from 'axios'

export default class tradeService {

    constructor() {
        this.api = axios.create({
            baseURL: 'http://localhost:5000/',
            //withCredentials: true
        })
    }

    // Auth
    login = user => this.api.post('api/auth/login', user)
    signup = user => this.api.post('api/auth/signup', user)
    logout = () => this.api.post('api/auth/logout')
    loggedIn = (user) => this.api.get('api/auth/loggedin', user)
    //
    getCoins = (params) => this.api.get(`api/getCoins?currency=${params}`)
    getPrices = () => this.api.get('api/getPrices')
    getCoinInfo = (params) => this.api.get(`api/coin/info?${params}`)
    getHistoDay = (symbol, currency) => this.api.get(`api/coin/histoday/${symbol}/${currency}`)
    getCoin = (coin_id) => this.api.get(`api/coin/${coin_id}`)
}