import axios from 'axios'

export default class tradeService {

    constructor() {
        this.source = axios.CancelToken.source()
        this.api = axios.create({
            baseURL: 'https://backend-cripto.herokuapp.com/'
            //withCredentials: true
        })
        axios.defaults.headers.common['Access-Control-Allow-Origin'] = '*'

    }

    // AuthS
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

    loginWallet = (keys) => this.api.post(`api/wallet/connect-wallet`, keys)
    getBalance = keys => this.api.post(`api/wallet/getBalance`, keys)
    lastPrices = key => this.api.post(`api/wallet/lastPrices`, key)
}