import React, { useState, useEffect } from 'react';
import './App.css';
import './index.css'
import Crypto from './components/Crypto.js'
import TableCriptos from './components/TableCriptos.js'
import { Route } from 'react-router-dom'
import SearchAppBar from './components/layout/AppBar'
import Trade from './services/trade.service'
const tradeService = new Trade()

function App() {

    const [infoCoin, setCoinInfo] = useState([]);
    const [data, setData] = useState([]);
    const [Currency, setCurrency] = useState('USD')

    console.log(Currency)
    let firstCriptos = []
    let arrCripts
    const getCoins = () => {
        tradeService.getCoins(Currency)
            .then(response => {
                firstCriptos = response.data
                let arrLogoCoin = []
                arrCripts = firstCriptos.map(element => {
                    switch (element.quote.USD) {
                        case undefined:
                            // console.log(element.quote.EUR)
                            return { id: element.id, name: element.name, price: element.quote.EUR.price, change: element.quote.EUR.percent_change_7d, symbol: element.symbol, marketCap: element.quote.EUR.market_cap }

                        case element.quote.USD:
                            // console.log(element.quote.USD)
                            return { id: element.id, name: element.name, price: element.quote.USD.price, change: element.quote.USD.percent_change_7d, symbol: element.symbol, marketCap: element.quote.USD.market_cap }

                    }
                    // console.log(typeof element.quote.EUR)
                    // return { id: element.id, name: element.name, price: element.quote.USD.price, change: element.quote.USD.percent_change_7d, symbol: element.symbol, marketCap: element.quote.USD.market_cap }
                });
                setData(arrCripts)
                firstCriptos.forEach(element => {
                    arrLogoCoin.push(element.id)
                })
            })
            .catch(error => console.log(error))
    }


    useEffect(() => {

        setData(getCoins())

    }, [])

    return (
        <div className="App">
            <SearchAppBar data={data} Currency={Currency} setCurrency={setCurrency} />
            <Route path="/coin" render={(props) => <Crypto infoCoin={infoCoin} setCoinInfo={setCoinInfo} {...props} />} />
            <Route exact path="/" render={(props) => <TableCriptos Currency={Currency} setCurrency={setCurrency} infoCoin={infoCoin} setCoinInfo={setCoinInfo} {...props} />} />
        </div>
    );
}

export default App;
