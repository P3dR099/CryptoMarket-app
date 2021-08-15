import React, { useState, useEffect, useCallback } from 'react';
import './App.css';
import './index.css'
import Crypto from './components/Crypto.js'
import TableCriptos from './components/TableCriptos.js'
import { BrowserRouter, Route } from 'react-router-dom'
import NavBar from './components/pages/NavBar'
import Trade from './services/trade.service'
import LinearProgress from '@material-ui/core/LinearProgress';
import Home from './components/pages/Home'
import Footer from './components/pages/Footer'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
// import MetaCoin from './contracts/MetaCoin.json';
// import HelloWorld from './contracts/HelloWorld.json';
// import getWeb3 from './getWeb3';
import AppContainer from './components/style/App';
const tradeService = new Trade();

function App() {

    const [loggedInUser, setLoggedInUser] = useState(null)
    const [allInfoCoin, setAllInfoCoin] = useState([])
    const [data, setData] = useState([]);
    const [Currency, setCurrency] = useState('USD')
    // const [stateEth, setStateEth] = useState({ storageValue: 0, web3: null, accounts: null, contract: null })

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
                console.log('HEY')

            })
            .catch(err => console.log(err))
    }, [])

    // const runExample = useCallback(async () => {
    //     const { accounts, storageContract, helloWorldContract } = stateEth;

    //     // Stores a given value, 5 by default.
    //     await storageContract.methods.set(5).send({ from: accounts[0] });

    //     // Get the value from the contract to prove it worked.
    //     const storageResponse = await storageContract.methods.get().call();

    //     const greetingResponse = await helloWorldContract.methods.getGreeting().call();

    //     // Update state with the result.
    //     // this.setState({ storageValue: storageResponse, greeting: greetingResponse });
    //     setStateEth({ storageValue: storageResponse, greeting: greetingResponse });

    // }, [stateEth])



    useEffect(() => {
        // const setWeb3 = async () => {

        //     try {
        //         // Get network provider and web3 instance.
        //         const web3 = await getWeb3();

        //         // Use web3 to get the user's accounts.
        //         const accounts = await web3.eth.getAccounts();

        //         console.log('balance ->', await web3.eth.getBalance(accounts.toString()))

        //         // Get the contract instance.
        //         const networkId = await web3.eth.net.getId();
        //         let deployedNetwork = MetaCoin.networks[networkId];
        //         const storageInstance = new web3.eth.Contract(
        //             MetaCoin.abi,
        //             deployedNetwork && deployedNetwork.address,
        //         );
        //         deployedNetwork = HelloWorld.networks[networkId];
        //         const helloWorldInstance = new web3.eth.Contract(
        //             HelloWorld.abi,
        //             deployedNetwork && deployedNetwork.address
        //         );


        //         // Set web3, accounts, and contract to the state, and then proceed with an
        //         // example of interacting with the contract's methods.
        //         setStateEth({ web3, accounts, storageContract: storageInstance, helloWorldContract: helloWorldInstance });
        //     } catch (error) {
        //         // Catch any errors for any of the above operations.
        //         alert(
        //             `Failed to load web3, accounts, or contract. Check console for details.`,
        //         );
        //         console.error(error);
        //     }
        // }

        // // Stores a given value, 5 by default.
        // // Update state with the result.

        // setWeb3()
        // // console.log(stateEth.web3.eth)

        const login = JSON.parse(localStorage.getItem('login'))
        setTheUser(login)
    }, [])


    return (
        <>
            <AppContainer>
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