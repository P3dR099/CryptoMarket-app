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
    const [priceChange, setPriceChange] = useState([]);
    const [data, setData] = useState([]);

    let firstCriptos = []
    let arrCripts
    const getCoins = () => {
        tradeService.getCoins()
            .then(response => {
                firstCriptos = response.data
                let arrLogoCoin = []
                arrCripts = firstCriptos.map(element => {
                    return { id: element.id, name: element.name, price: element.quote.USD.price, change: element.quote.USD.percent_change_7d, symbol: element.symbol, marketCap: element.quote.USD.market_cap }
                });
                setData(arrCripts)
                console.log(arrCripts)
                firstCriptos.forEach(element => {
                    arrLogoCoin.push(element.id)
                })
            })
            .catch(error => alert(error))
    }

    useEffect(() => {

        setData(getCoins())

    }, [])

    console.log(data)
    return (
        <div className="App">
            <SearchAppBar data={data} />
            <Route path="/coin" render={(props) => <Crypto infoCoin={infoCoin} setCoinInfo={setCoinInfo} {...props} />} />
            <Route exact path="/tableCriptos" render={(props) => <TableCriptos infoCoin={infoCoin} setCoinInfo={setCoinInfo} {...props} />} />
        </div>
    );
}

export default App;
