import React, { useState, useEffect, useCallback } from 'react';
import './App.css';
import './index.css'
import Crypto from './components/Crypto.js'
import TableCriptos from './components/TableCriptos.js'
import { Route } from 'react-router-dom'
import NavBar from './components/layout/NavBar'
import UserProfile from './components/pages/User'
import Trade from './services/trade.service'
import LinearProgress from '@material-ui/core/LinearProgress';
import Home from './components/pages/Home'
import Footer from './components/layout/Footer'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
const tradeService = new Trade()

function App() {

    const [loggedInUser, setLoggedInUser] = useState(null)
    const [allInfoCoin, setAllInfoCoin] = useState([])
    const [data, setData] = useState([]);
    const [Currency, setCurrency] = useState('USD')

    const setTheUser = (user) => setLoggedInUser(user)

    const handleLogOut = () => {
        tradeService.logout()
            .then(res => {
                setTheUser(null)
                localStorage.setItem('login', null)
            })
            .catch(err => console.log(err))
    }

    let arrSymbols = []
    let arrInfo = []
    const getCoins = () => {
        tradeService.getCoins(Currency)
            .then(response => {
                let firstCriptos = response.data
                console.log(response.data)

                // setFirstCriptos(response.data)
                // console.log(firstCriptos2)

                let arrCripts = firstCriptos.map(element => {

                    if (element.quote.USD) {
                        arrSymbols.push(element.symbol)
                        return { id: element.id, name: element.name, price: element.quote.USD.price, change_1h: element.quote.USD.percent_change_1h, change_1d: element.quote.USD.percent_change_24h, change_7d: element.quote.USD.percent_change_7d, symbol: element.symbol, marketCap: element.quote.USD.market_cap }
                    }

                    arrSymbols.push(element.symbol)
                    return { id: element.id, name: element.name, price: element.quote.EUR.price, change_1h: element.quote.EUR.percent_change_1h, change_1d: element.quote.EUR.percent_change_24h, change_7d: element.quote.EUR.percent_change_7d, symbol: element.symbol, marketCap: element.quote.EUR.market_cap }

                });

                console.log(arrCripts)
                const getAllInfo = (arrSymbols, Currency) => {
                    tradeService.getAllCoinsInfo(arrSymbols.toString(), Currency)
                        .then(res => {
                            for (let key in res.data.RAW) {
                                if (res.data.RAW[key].USD) {
                                    arrInfo.push(res.data.RAW[key].USD)
                                }
                                if (res.data.RAW[key].EUR) {
                                    arrInfo.push(res.data.RAW[key].EUR)
                                }
                            }
                        })
                        .catch(err => {
                            console.log(err)
                        })
                }
                setData(arrCripts)
                getAllInfo(arrSymbols, Currency)
                setAllInfoCoin(arrInfo)
            })
    }


    useEffect(() => {

        getCoins()
        // parseInt(localStorage.getItem('value')) === 1 ? setData(getCoins('EUR')) : setData(getCoins('USD'))
        const login = JSON.parse(localStorage.getItem('login'))
        setTheUser(login)
    }, [])

    return (
        <>
            <NavBar handleLogOut={handleLogOut} loggedInUser={loggedInUser} setTheUser={setTheUser} data={data} Currency={Currency} setCurrency={setCurrency} />
            <div className="App" style={{ backgroundImage: 'linear-gradient(16deg, rgba(255,255,255,1) 0%, rgba(178,250,255,1) 0%, rgba(111,176,252,1) 30%, rgba(61,91,244,1) 60%, rgba(44,67,184,1) 100%)' }}>
                {!data ? <LinearProgress /> : ''}
                <Route path="/user" render={(props) => <UserProfile />} />
                <Route path="/coin" render={(props) => <Crypto Currency={Currency} allInfoCoin={allInfoCoin} setCurrency={setCurrency} {...props} />} />
                <Route exact path="/table" render={(props) => <TableCriptos data={data} allInfoCoin={allInfoCoin} setData={setData} getCoins={getCoins} Currency={Currency} setCurrency={setCurrency} {...props} />} />
                <Route exact path="/" render={(props) => <Home data={data} allInfoCoin={allInfoCoin} setData={setData} getCoins={getCoins} Currency={Currency} setCurrency={setCurrency} {...props} />} />
                <Footer />
            </div>

        </>

    );
}

export default App;