import React, { useState, useEffect, useCallback } from 'react';
import { useDispatch } from 'react-redux'
import './App.scss';
import './index.css';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import Crypto from './components/Crypto.js';
import TableCriptos from './components/TableCriptos.js';
import { BrowserRouter, Route } from 'react-router-dom';
import NavBar from './components/pages/NavBar'
import Trade from './services/trade.service';
import LinearProgress from '@material-ui/core/LinearProgress';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Home from './components/pages/Home';
import Footer from './components/pages/Footer';
import AppContainer from './components/style/App';
import { getData, getAllInfoCoin, setUser } from './actions/actions';
import Login from './components/pages/Login';
const tradeService = new Trade();

function App() {

    const dispatch = useDispatch()
    const [loggedInUser, setLoggedInUser] = useState(null)
    const [allInfoCoin, setAllInfoCoin] = useState([])
    const [data, setData] = useState([]);
    const [Currency, setCurrency] = useState('USD')
    const matches = useMediaQuery('(min-width:700px)');
    const setTheUser = (user) => setLoggedInUser(user)

    const handleLogOut = () => {
        tradeService.logout()
            .then(res => {
                dispatch(setUser(null))
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
                let arrInfoCriptos

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
                            setAllInfoCoin(arrInfoCriptos)
                            arrInfoCriptos = arrInfo.map(el => { return el })
                            dispatch(getAllInfoCoin(arrInfoCriptos))
                        })
                        .catch(err => {
                            console.log(err)
                        })
                }
                setData(arrCripts)
                getAllInfo(arrSymbols, Currency)
                dispatch(getData(arrCripts))
            })
            .catch(err => console.log(err))
    }, [dispatch])


    useEffect(() => {
        const login = JSON.parse(localStorage.getItem('login'))
        setTheUser(login)
        dispatch(setUser(login))
    }, [dispatch])

    return (
        <>
            <BrowserRouter>
                <AppContainer matches={matches}>
                    <NavBar handleLogOut={handleLogOut} loggedInUser={loggedInUser} data={data} setData={setData} Currency={Currency} setCurrency={setCurrency} />
                    {!data ? <LinearProgress /> : ''}
                    <main>
                        <Route path="/coin" render={(props) => <Crypto Currency={Currency} setCurrency={setCurrency} {...props} />} />
                        <Route exact path="/table" render={(props) => <TableCriptos getCoins={getCoins} Currency={Currency} setCurrency={setCurrency} {...props} />} />
                        <Route exact path="/" render={(props) => <Home data={data} allInfoCoin={allInfoCoin} setData={setData} getCoins={getCoins} Currency={Currency} setCurrency={setCurrency} {...props} />} />
                        <Route exact path="/login" render={(props) => <Login  {...props} />} />
                    </main>
                    <Footer />
                </AppContainer>
            </BrowserRouter>
        </>
    );
}

export default App;