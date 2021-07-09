import axios from 'axios'

export default class tradeService {

    constructor() {
        this.source = axios.CancelToken.source()
        this.api = axios.create({
            baseURL: 'http://localhost:5000/'
            //withCredentials: true
        })
    }

    // Auth
    login = user => this.api.post('api/auth/login', user)
    signup = user => this.api.post('api/auth/signup', user)
    logout = () => this.api.post('api/auth/logout')
    loggedIn = () => this.api.get('api/auth/loggedin')
    //
    getCoins = (params) => this.api.get(`api/getCoins?currency=${params}`)
    getAllCoinsInfo = (id, currency) => this.api.get(`api/allCoins/info/${id}/${currency}`)

    getPrices = () => this.api.get('api/getPrices')
    getCoinInfo = (params) => this.api.get(`api/coin/info?${params}`)
    getHistoByHour = (symbol, currency, limit) => this.api.get(`api/coin/histohour/${symbol}/${currency}/${limit}`)
    getHistoByMin = (symbol, currency, limit) => this.api.get(`api/coin/histominute/${symbol}/${currency}/${limit}`)
    getCoin = (coin_id) => this.api.get(`api/coin/${coin_id}`)
}