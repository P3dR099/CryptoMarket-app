import React, { useState, useEffect, useCallback } from 'react';
import './App.css';
import './index.css';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import Crypto from './components/Crypto.js';
import TableCriptos from './components/TableCriptos.js';
import { BrowserRouter, Route } from 'react-router-dom';
import NavBar from './components/pages/NavBar'
import Trade from './services/trade.service';
import LinearProgress from '@material-ui/core/LinearProgress';
import Home from './components/pages/Home';
import Footer from './components/pages/Footer';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import AppContainer from './components/style/App';
const tradeService = new Trade();

function App() {

    const [loggedInUser, setLoggedInUser] = useState(null)
    const [allInfoCoin, setAllInfoCoin] = useState([])
    const [data, setData] = useState([]);
    const [Currency, setCurrency] = useState('USD')
    // const [stateEth, setStateEth] = useState({ storageValue: 0, web3: null, accounts: null, contract: null })

    const matches = useMediaQuery('(min-width:700px)');
    const matchesMax = useMediaQuery('(max-width:1256px)');

    const setTheUser = (user) => setLoggedInUser(user)

    const handleLogOut = () => {
        tradeService.logout()
            .then(res => {
                setTheUser(null)
                localStorage.setItem('login', null)
            })
            .catch(err => console.log(err))
    }

    const getCoins = useCallback((Currency) => {
        tradeService.getCoins(Currency)
            .then(response => {
                let arrSymbols = []
                let arrInfo = []
                let firstCriptos = response.data

                let arrCripts = firstCriptos.map(element => {
                    if (element.quote.USD) {
                        arrSymbols.push(element.symbol)
                        return { id: element.id, name: element.name, price: element.quote.USD.price, change_1h: element.quote.USD.percent_change_1h, change_1d: element.quote.USD.percent_change_24h, change_7d: element.quote.USD.percent_change_7d, symbol: element.symbol, marketCap: element.quote.USD.market_cap }
                    }
                    arrSymbols.push(element.symbol)
                    return { id: element.id, name: element.name, price: element.quote.EUR.price, change_1h: element.quote.EUR.percent_change_1h, change_1d: element.quote.EUR.percent_change_24h, change_7d: element.quote.EUR.percent_change_7d, symbol: element.symbol, marketCap: element.quote.EUR.market_cap }
                });

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
            .catch(err => console.log(err))
    }, [])



    useEffect(() => {

        const login = JSON.parse(localStorage.getItem('login'))
        setTheUser(login)
    }, [])


    return (
        <>
            <AppContainer matches={matches}>
                <BrowserRouter>
                    <NavBar handleLogOut={handleLogOut} loggedInUser={loggedInUser} setTheUser={setTheUser} data={data} setData={setData} Currency={Currency} setCurrency={setCurrency} />
                    {!data ? <LinearProgress /> : ''}
                    <main>
                        <Route path="/coin" render={(props) => <Crypto Currency={Currency} allInfoCoin={allInfoCoin} setCurrency={setCurrency} data={data} {...props} />} />
                        <Route exact path="/table" render={(props) => <TableCriptos data={data} allInfoCoin={allInfoCoin} setData={setData} getCoins={getCoins} Currency={Currency} setCurrency={setCurrency} {...props} />} />
                        <Route exact path="/" render={(props) => <Home data={data} allInfoCoin={allInfoCoin} setData={setData} getCoins={getCoins} Currency={Currency} setCurrency={setCurrency} {...props} />} />
                    </main>
                    <Footer />
                </BrowserRouter>
            </AppContainer>

        </>

    );

}

export default App;