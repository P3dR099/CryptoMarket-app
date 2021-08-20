import React, { useState, useEffect } from 'react';
import Trade from '../services/trade.service'
import Container from '@material-ui/core/Container';
import CircularProgress from '@material-ui/core/CircularProgress';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useTheme } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import ArrowDropUpIcon from '@material-ui/icons/ArrowDropUp';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import TableRow from '@material-ui/core/TableRow';
import CustomizedBreadcrumbs from './layout/BreadCumb';
import { Grid } from '@material-ui/core';
import TabPanel from './layout/TabPanel';
import ListStatsCoin, { Green, Red, FontText, FontTextMin, ValueStatsCoin, LogoCoin, BackgroundCripto, ContainerPaperCrypto, ContainerPaperList } from './style/Crypto';
import convertToDate from './utils/convertToDate';
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
    const { data, allInfoCoin, Currency } = props

    useEffect(() => {

        tradeService.getCoin(id)
            .then(res => {

                allInfoCoin.length !== 0 && localStorage.setItem('info', JSON.stringify(allInfoCoin))
                setCoinSymbol(res.data[0].symbol)

                tradeService.getCoinInfo(`id=${id}`)
                    .then(res => setInfo(res.data[id]))
                    .catch(err => console.log(err))

                localInfo.filter((item) => (item.FROMSYMBOL === res.data[0].symbol) && setCoinInfo(item))
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

        const localInfo = JSON.parse(localStorage.getItem('info'))

    }, [id, allInfoCoin, Currency, data])

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
                        {coinInfo.CHANGEPCT24HOUR < 0 ? <Red>
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
                        {coinInfo.CHANGEPCT24HOUR < 0 ? <Red>
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
                <Grid style={{ width: '99%', margin: 0, display: 'flex', justifyContent: 'space-between' }} container spacing={2}>
                    <Grid item xs={matchesDown ? 12 : 8} style={{ width: '99%', margin: 0 }} >
                        <ContainerPaperCrypto matches={matches ? 'width: 95%;' : 'width: 100%;'} elevation={3}>
                            <Container style={{ padding: !matches ? 18 : undefined }}>
                                <Container style={{ display: "flex", paddingLeft: 1, alignItems: 'center' }}>
                                    <Grid style={{ display: "inherit", flexBasis: !matches ? '125%' : '124%' }} item xs={12}>
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

                    {histoMinute.Data !== undefined ? <TabPanel coinSymbol={coinSymbol} arrTimesMinutes={arrTimesMinutes} setHistoHour={setHistoHour} histoHour={histoHour} histoMinute={histoMinute} {...props} /> : <CircularProgress />}

                    <Grid item xs={matchesDown ? 12 : 4} >
                        <ContainerPaperList elevation={3}>
                            <Container style={{ padding: 1 }}>
                                <h2>{info && info.name} Price Today</h2>
                            </Container>
                            <TableContainer>
                                <Table size="small" aria-label="a dense table">
                                    {/* <TableHead></TableHead> */}
                                    <TableBody>
                                        <TableRow>
                                            <TableCell>
                                                <ListStatsCoin>
                                                    {info.name} Price
                                                </ListStatsCoin>
                                            </TableCell>
                                            <TableCell>
                                                <ValueStatsCoin>
                                                    {parseInt(localStorage.getItem('value')) === 2 ? '$' + Price : '€' + Price}
                                                </ValueStatsCoin>
                                            </TableCell>
                                        </TableRow>
                                    </TableBody>
                                    <TableBody>
                                        <TableRow>
                                            <TableCell>
                                                <ListStatsCoin>
                                                    24h Low / 24h High
                                                </ListStatsCoin>
                                            </TableCell>
                                            <TableCell>
                                                <ValueStatsCoin>
                                                    {parseInt(localStorage.getItem('value')) === 2 ? '$' + coinInfo.LOW24HOUR + ' / ' + coinInfo.HIGH24HOUR : '€' + coinInfo.LOW24HOUR + ' / ' + coinInfo.HIGH24HOUR}
                                                </ValueStatsCoin>
                                            </TableCell>
                                        </TableRow>
                                    </TableBody>
                                    <TableBody>
                                        <TableRow>
                                            <TableCell>
                                                <ListStatsCoin>
                                                    Market Cap 24h
                                                </ListStatsCoin>
                                            </TableCell>
                                            <TableCell>
                                                <ValueStatsCoin>
                                                    {parseInt(localStorage.getItem('value')) === 2 ? '$' + coinInfo.MKTCAP : '€' + coinInfo.MKTCAP}
                                                </ValueStatsCoin>
                                            </TableCell>
                                        </TableRow>
                                    </TableBody>
                                    <TableBody>
                                        <TableRow>
                                            <TableCell>
                                                <ListStatsCoin>
                                                    Change 24h
                                                </ListStatsCoin>
                                            </TableCell>
                                            <TableCell>
                                                <ValueStatsCoin style={{ color: coinInfo.CHANGEPCT24HOUR !== undefined && coinInfo.CHANGEPCT24HOUR.toFixed(2) < 0 ? 'red' : 'green' }}>
                                                    {coinInfo.CHANGEPCT24HOUR !== undefined && coinInfo.CHANGEPCT24HOUR.toFixed(2)}%
                                                </ValueStatsCoin>
                                            </TableCell>
                                        </TableRow>
                                    </TableBody>
                                    <TableBody>
                                        <TableRow>
                                            <TableCell>
                                                <ListStatsCoin>
                                                    Volume 24 hour
                                                </ListStatsCoin>
                                            </TableCell>
                                            <TableCell>
                                                <ValueStatsCoin>
                                                    {coinInfo.TOTALVOLUME24H !== undefined && parseInt(localStorage.getItem('value')) === 2 ? '$' + coinInfo.TOTALVOLUME24H : '€' + coinInfo.TOTALVOLUME24H}
                                                </ValueStatsCoin>
                                            </TableCell>
                                        </TableRow>
                                    </TableBody>
                                </Table>
                            </TableContainer>
                        </ContainerPaperList>
                    </Grid>
                </Grid>
            </BackgroundCripto>
        </>
    )
}

export default CardCrypto