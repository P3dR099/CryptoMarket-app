import React, { useState, useEffect } from 'react';
import Trade from '../services/trade.service'
import Container from '@material-ui/core/Container';
import CircularProgress from '@material-ui/core/CircularProgress';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useTheme } from '@material-ui/core/styles';
import ArrowDropUpIcon from '@material-ui/icons/ArrowDropUp';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import { useSelector } from 'react-redux'
import CustomizedBreadcrumbs from './layout/BreadCumb';
import { Grid } from '@material-ui/core';
import TabPanel from './layout/TabPanel';
import { Green, Red, FontText, FontTextMin, LogoCoin, BackgroundCripto, ContainerPaperCrypto } from './style/Crypto';
import convertToDate from './utils/convertToDate';
import GridStatsCrypto from './layout/GridStatsCrypto';

const tradeService = new Trade()


const CardCrypto = (props) => {

    const [info, setInfo] = useState([])
    const [coinInfo, setCoinInfo] = useState([])
    const [coinSymbol, setCoinSymbol] = useState([])
    const [histoHour, setHistoHour] = useState([])
    const [histoMinute, sethistoMinute] = useState([])
    const theme = useTheme();
    const matchesDown = useMediaQuery(theme.breakpoints.down('sm'));
    const matches = useMediaQuery('(min-width:470px)');
    let lastSlash = props.location.pathname.lastIndexOf('/')
    let id = props.location.pathname.slice(lastSlash + 1, props.location.pathname.length)
    const { Currency } = props
    const { data } = useSelector(state => state)
    const { allInfoCoins } = useSelector(state => state)
    // const data2 = useSelector(state => state)


    allInfoCoins.length !== 0 && localStorage.setItem('info', JSON.stringify(allInfoCoins))

    // console.log(data2)

    useEffect(() => {

        const localInfoCoin = JSON.parse(localStorage.getItem('info'))

        tradeService.getCoin(id)
            .then(res => {

                setCoinSymbol(res.data[0].symbol)

                tradeService.getCoinInfo(`id=${id}`).then(res => setInfo(res.data[id])).catch(err => console.log(err))

                localInfoCoin.filter((item) => (item.FROMSYMBOL === res.data[0].symbol) && setCoinInfo(item))

                data && data.map(el => el.symbol === res.data[0].symbol && localStorage.setItem('price', el.price))

                tradeService.getHistoByMin(res.data[0].symbol, Currency, 1440)
                    .then(res => {
                        res.data.Data.Data.map(element => {
                            const hours = convertToDate(element.time)
                            return element.time = hours
                        });
                        sethistoMinute(res.data.Data)
                    })
                    .catch(err => console.log(err))
            })
            .catch(error => console.log(error))

    }, [id, Currency, data])



    let Price;
    let arrTimes, arrTimesMinutes = []
    histoHour.Data !== undefined && histoHour.Data.map(el => { return arrTimes.push(el.high) })
    histoMinute.Data !== undefined && histoMinute.Data.map(el => { return arrTimesMinutes.push(el.high) })
    Price > 2 ? Price = parseFloat(localStorage.getItem('price')).toFixed(4) : Price = parseFloat(localStorage.getItem('price')).toFixed(2)

    const showPrices = () => {
        if (!matchesDown) {
            return (
                <Grid container spacing={3} style={{ margin: 'auto', display: 'contents', whiteSpace: 'pre' }}>
                    <h1 style={{ fontSize: !matches ? 20 : 30, marginRight: 3 }}> {parseInt(localStorage.getItem('value')) === 2 ? '$' + Price : '€' + Price} </h1>
                    <span>
                        {coinInfo.CHANGEPCT24HOUR < 0 ?
                            <Red>
                                <ArrowDropDownIcon />
                                {coinInfo.CHANGEPCT24HOUR !== undefined && coinInfo.CHANGEPCT24HOUR.toFixed(2)}
                            </Red> :
                            <Green matches={matches}>
                                <ArrowDropUpIcon />
                                {coinInfo.CHANGEPCT24HOUR !== undefined && coinInfo.CHANGEPCT24HOUR.toFixed(2)}
                            </Green>
                        }
                    </span>
                </Grid>
            )
        }
    }

    const showPricesMin = () => {
        if (matchesDown) {
            return (
                <Grid container spacing={3} style={{ display: 'flex', whiteSpace: 'pre', justifyContent: 'flex-end', flexBasis: '155%' }}>
                    <span style={{ alignSelf: 'center' }}>
                        {coinInfo.CHANGEPCT24HOUR < 0 ?
                            <Red>
                                <ArrowDropDownIcon />
                                {coinInfo.CHANGEPCT24HOUR !== undefined && coinInfo.CHANGEPCT24HOUR.toFixed(2)}
                            </Red> :
                            <Green>
                                <ArrowDropUpIcon />
                                {coinInfo.CHANGEPCT24HOUR !== undefined && coinInfo.CHANGEPCT24HOUR.toFixed(2)}
                            </Green>
                        }
                    </span>
                    <h1 style={{ fontSize: !matches ? 19 : 30, margin: matches ? '12px 10px 10px 11px' : undefined }}> {parseInt(localStorage.getItem('value')) === 2 ? '$' + Price : '€' + Price} </h1>
                </Grid >
            )
        }
    }

    return (
        <>
            <CustomizedBreadcrumbs />
            <BackgroundCripto>
                <Grid style={{ width: '98%', display: 'flex', justifyContent: 'space-between' }} container spacing={2}>
                    <Grid item xs={matchesDown ? 12 : 8} >
                        <ContainerPaperCrypto matches={matches ? 'width: 95%;' : 'width: 100%;'} elevation={3}>
                            <Container style={{ padding: !matches ? 18 : undefined }}>
                                <Container style={{ display: "flex", paddingLeft: 1, alignItems: 'center' }}>
                                    <Grid style={{ display: "inherit" }} item xs={12}>
                                        <LogoCoin matches={!matches}>
                                            <img alt={`coin ${id}`} style={{ width: !matches ? 35 : 45, marginRight: 6, marginTop: 3 }} src={`https://s2.coinmarketcap.com/static/img/coins/64x64/${id}.png`} />
                                            {!matches ? <FontTextMin>{info && info.name}</FontTextMin> : <FontText> {info && info.name}</FontText>}
                                        </LogoCoin>
                                    </Grid>
                                    {matchesDown ? showPricesMin() : showPrices()}
                                </Container>
                            </Container>
                        </ContainerPaperCrypto>
                    </Grid>

                    {histoMinute.Data !== undefined ? <TabPanel coinSymbol={coinSymbol} arrTimesMinutes={arrTimesMinutes} setHistoHour={setHistoHour} histoHour={histoHour} histoMinute={histoMinute} {...props} /> :
                        <Container style={{ textAlign: 'justify' }}>
                            <CircularProgress style={{ marginLeft: matchesDown ? '50%' : '30%' }} />
                        </Container>}

                    <GridStatsCrypto info={info} coinInfo={coinInfo} />
                </Grid>
            </BackgroundCripto>
        </>
    )
}

export default CardCrypto