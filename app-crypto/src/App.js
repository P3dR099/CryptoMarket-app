import React, { useState, useEffect } from 'react';
import './App.css';
import './index.css'
import Crypto from './components/Crypto.js'
import TableCriptos from './components/TableCriptos.js'
import { Route } from 'react-router-dom'
import SearchAppBar from './components/layout/AppBar'
import Trade from './services/trade.service'
import LinearProgress from '@material-ui/core/LinearProgress';

const tradeService = new Trade()

function App() {

    const [prices, setAllPrices] = useState([]);
    const [data, setData] = useState([]);
    const [Currency, setCurrency] = useState('USD')

    let firstCriptos = []
    let arrCripts


    const getCoins = (Currency) => {
        tradeService.getCoins(Currency)
            .then(response => {
                firstCriptos = response.data
                let arrLogoCoin = []
                setAllPrices(response.data[0].quote.USD)
                arrCripts = firstCriptos.map(element => {
                    if (element.quote.USD) {
                        return { id: element.id, name: element.name, price: element.quote.USD.price, change_1h: element.quote.USD.percent_change_1h, change_1d: element.quote.USD.percent_change_24h, change_7d: element.quote.USD.percent_change_7d, symbol: element.symbol, marketCap: element.quote.USD.market_cap }
                    }
                    else {
                        return { id: element.id, name: element.name, price: element.quote.EUR.price, change_1h: element.quote.EUR.percent_change_1h, change_1d: element.quote.EUR.percent_change_24h, change_7d: element.quote.EUR.percent_change_7d, symbol: element.symbol, marketCap: element.quote.EUR.market_cap }
                    }
                });
                setData(arrCripts)
                firstCriptos.forEach(element => {
                    arrLogoCoin.push(element.id)
                })
            })
            .catch(error => console.log(error))
    }

    useEffect(() => {

        setData(getCoins('USD'))

    }, [])

    // console.log(prices)

    return (
        <div className="App">
            <SearchAppBar data={data} Currency={Currency} setCurrency={setCurrency} />
            {!data ? <LinearProgress /> : ''}
            <Route path="/coin" render={(props) => <Crypto Currency={Currency} setCurrency={setCurrency} {...props} />} />
            <Route exact path="/" render={(props) => <TableCriptos data={data} setData={setData} getCoins={getCoins} Currency={Currency} setCurrency={setCurrency} {...props} />} />
        </div>
    );
}

export default App;