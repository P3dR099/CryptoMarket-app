import axios from 'axios'

export default class tradeService {

    constructor() {
        this.source = axios.CancelToken.source()
        this.api = axios.create({
            baseURL: process.env.REACT_APP_BASE_URL
            //withCredentials: true
        })
    }

    // Auth
    login = user => this.api.post('/auth/login', user)
    signup = user => this.api.post('/auth/signup', user)
    logout = () => this.api.post('/auth/logout')
    loggedIn = () => this.api.get('/auth/loggedin')
    //
    getCoins = (params) => this.api.get(`/getCoins?currency=${params}`)
    getAllCoinsInfo = (id, currency) => this.api.get(`/allCoins/info/${id}/${currency}`)
    getPrices = () => this.api.get('/getPrices')
    getCoinInfo = (params) => this.api.get(`/coin/info?${params}`)
    getHistoByHour = (symbol, currency, limit) => this.api.get(`/coin/histohour/${symbol}/${currency}/${limit}`)
    getHistoByMin = (symbol, currency, limit) => this.api.get(`/coin/histominute/${symbol}/${currency}/${limit}`)
    getCoin = (coin_id) => this.api.get(`/coin/${coin_id}`, { cancelToken: this.source.token })
}