import React, { useState, useEffect } from 'react';
import Trade from '../services/trade.service'
import Container from '@material-ui/core/Container';
import CircularProgress from '@material-ui/core/CircularProgress';
import makeStyles from '@material-ui/core/styles/makeStyles';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useTheme } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import ArrowDropUpIcon from '@material-ui/icons/ArrowDropUp';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import TableRow from '@material-ui/core/TableRow';
import CustomizedBreadcrumbs from './layout/BreadCumb'
import { Grid } from '@material-ui/core';
import { Paper } from '@material-ui/core';
import TabPanel from './TabPanel'
const tradeService = new Trade()

const useStyles = makeStyles({

    boxCoin: {
        display: 'flex',
        alignItems: 'center'
    },
    logoCoin: {
        width: 35,
        height: 35,
        marginRight: 15,
        marginTop: 25
    },
    logoCoinMin: {
        width: 33,
        height: 35,
        marginRight: 10,
        marginTop: 10
    },

    boxPriceCoin: {
        display: 'inline-flex'
    },

    backgroundCripto: {
        padding: 0, maxWidth: '100%', height: '100%', position: 'inherit'
    }

});

const convertToDate = (unixTime) => {
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const date = new Date(unixTime * 1000)
    const year = date.getFullYear();
    const month = months[date.getMonth()];
    const dayOfWeek = date.getDate()
    const hours = date.getHours()
    const minutes = "0" + date.getMinutes();
    const seconds = "0" + date.getSeconds();
    const formattedTime = year + ':' + month + ':' + dayOfWeek + ':' + hours + ':' + minutes.substr(-2) + ':' + seconds.substr(-2);
    return formattedTime;
}

const useStyles3 = makeStyles(() => ({
    green: {
        display: "flex", marginTop: 25, borderRadius: 10, width: 120, height: 30,
        placeContent: 'center', padding: '5px 5px 0px 0px', color: 'white', backgroundColor: 'green'
    },
    red: {
        display: "flex", marginTop: 25, borderRadius: 10, width: 120, height: 30,
        placeContent: 'center', padding: '5px 5px 0px 0px', color: 'white', backgroundColor: 'red'
    },
    fontText: {
        fontSize: 30
    },
    fontTextMin: {
        fontSize: 20
    },

    listStatsCoin: {
        fontWeight: 500, color: '#58667e'
    },

    valueStatsCoin: {
        fontWeight: 600, color: '#000', lineHeight: 3, textAlign: 'end'
    },
    contSpanMin: {

    }
}))

const CardCrypto = (props) => {

    const classes = useStyles()
    const classBottom = useStyles3()
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

    let arrTimes, arrTimesMinutes = []
    histoHour.Data !== undefined && histoHour.Data.map(el => { return arrTimes.push(el.high) })
    histoMinute.Data !== undefined && histoMinute.Data.map(el => { return arrTimesMinutes.push(el.high) })
    // const localInfo = JSON.parse(localStorage.getItem('info'))

    let Price;
    Price > 2 ? Price = parseFloat(localStorage.getItem('price')).toFixed(4) : Price = parseFloat(localStorage.getItem('price')).toFixed(2)

    const showPrices = () => {
        if (!matchesDown) {
            return (
                <Grid container spacing={3} style={{ margin: 'auto', display: 'contents', whiteSpace: 'pre' }}>
                    <h1 style={{ fontSize: !matches ? 20 : 30 }}> {parseInt(localStorage.getItem('value')) === 2 ? '$' + Price : '€' + Price} </h1>
                    <span className={coinInfo.CHANGEPCT24HOUR < 0 ? classBottom.red : classBottom.green}>
                        {coinInfo.CHANGEPCT24HOUR > 0 ? <ArrowDropUpIcon /> : <ArrowDropDownIcon />}
                        {coinInfo.CHANGEPCT24HOUR !== undefined && coinInfo.CHANGEPCT24HOUR.toFixed(2)}
                    </span>
                </Grid>
            )
        }
    }

    const showPricesMin = () => {


        if (matchesDown) {
            return (
                <Grid container spacing={3} style={{ display: 'contents', whiteSpace: 'pre' }}>
                    <span className={coinInfo.CHANGEPCT24HOUR < 0 ? classBottom.red : classBottom.green} style={{ width: 40, height: 15, fontSize: 10, marginTop: !matches ? 16 : 33, placeItems: 'center', padding: '3px 11px 4px 3px', marginLeft: 15 }}>
                        {coinInfo.CHANGEPCT24HOUR > 0 ? <ArrowDropUpIcon style={{ width: 26 }} /> : <ArrowDropDownIcon style={{ width: 26 }} />}
                        {coinInfo.CHANGEPCT24HOUR !== undefined && coinInfo.CHANGEPCT24HOUR.toFixed(2)}
                    </span>
                    <h1 style={{ fontSize: !matches ? 20 : 25, margin: matches && '25px auto auto' }}> {parseInt(localStorage.getItem('value')) === 2 ? '$' + Price : '€' + Price} </h1>
                </Grid >
            )
        }
    }

    console.log(coinInfo.CHANGEPCT24HOUR)

    return (
        <>
            <CustomizedBreadcrumbs />
            <Container className={classes.backgroundCripto} >
                <Grid style={{ width: '99%', margin: 0 }} container spacing={2}>
                    <Grid item xs={matchesDown ? 12 : 8}>
                        <Paper style={{ margin: 0, backgroundColor: 'transparent' }} elevation={3}>
                            <Container style={{ padding: !matches && 18 }}>
                                <Container style={{ display: "flex", paddingTop: 10, paddingLeft: 1 }}>
                                    <Grid style={{ display: "inherit" }} item xs={12}>
                                        <img alt="coin logo" className={matches ? classes.logoCoin : classes.logoCoinMin} src={`https://s2.coinmarketcap.com/static/img/coins/64x64/${id}.png`} />
                                        <h1 className={!matches ? classBottom.fontTextMin : classBottom.fontText}>{info && info.name}</h1>
                                    </Grid>
                                    {matchesDown ? showPricesMin() : showPrices()}
                                </Container>

                                {histoMinute.Data !== undefined ? <TabPanel coinSymbol={coinSymbol} arrTimesMinutes={arrTimesMinutes} setHistoHour={setHistoHour} histoHour={histoHour} histoMinute={histoMinute} {...props} /> : <CircularProgress />}
                            </Container>
                        </Paper>
                    </Grid>
                    <Grid item xs={matchesDown ? 12 : 4}>
                        <Paper style={{ margin: !matchesDown && '190px 0px 0px 16px', background: '#f8fafd', borderRadius: 16 }} elevation={3}>
                            <Container style={{ padding: 1 }}>
                                <h2>{info && info.name} Price Today</h2>
                            </Container>
                            <TableContainer>
                                <Table className={classes.table} size="small" aria-label="a dense table">
                                    {/* <TableHead></TableHead> */}
                                    <TableBody>
                                        <TableRow>
                                            <TableCell className={classBottom.listStatsCoin}>
                                                {info.name} Price
                                            </TableCell>
                                            <TableCell className={classBottom.valueStatsCoin}>
                                                {parseInt(localStorage.getItem('value')) === 2 ? '$' + Price : '€' + Price}
                                            </TableCell>
                                        </TableRow>
                                    </TableBody>
                                    <TableBody>
                                        <TableRow>
                                            <TableCell className={classBottom.listStatsCoin}>
                                                24h Low / 24h High
                                            </TableCell>
                                            <TableCell className={classBottom.valueStatsCoin}>
                                                {parseInt(localStorage.getItem('value')) === 2 ? '$' + coinInfo.LOW24HOUR + ' / ' + coinInfo.HIGH24HOUR : '€' + coinInfo.LOW24HOUR + ' / ' + coinInfo.HIGH24HOUR}
                                            </TableCell>
                                        </TableRow>
                                    </TableBody>
                                    <TableBody>
                                        <TableRow>
                                            <TableCell className={classBottom.listStatsCoin}>
                                                Market Cap 24h
                                            </TableCell>
                                            <TableCell className={classBottom.valueStatsCoin}>
                                                {parseInt(localStorage.getItem('value')) === 2 ? '$' + coinInfo.MKTCAP : '€' + coinInfo.MKTCAP}
                                            </TableCell>
                                        </TableRow>
                                    </TableBody>
                                    <TableBody>
                                        <TableRow>
                                            <TableCell className={classBottom.listStatsCoin}>
                                                Change 24h
                                            </TableCell>
                                            <TableCell className={classBottom.valueStatsCoin} style={{ color: coinInfo.CHANGEPCT24HOUR !== undefined && coinInfo.CHANGEPCT24HOUR.toFixed(2) < 0 ? 'red' : 'green' }}>
                                                {coinInfo.CHANGEPCT24HOUR !== undefined && coinInfo.CHANGEPCT24HOUR.toFixed(2)}%
                                            </TableCell>
                                        </TableRow>
                                    </TableBody>
                                    <TableBody>
                                        <TableRow>
                                            <TableCell className={classBottom.listStatsCoin}>
                                                Volume 24 hour
                                            </TableCell>
                                            <TableCell className={classBottom.valueStatsCoin}>
                                                {coinInfo.TOTALVOLUME24H !== undefined && parseInt(localStorage.getItem('value')) === 2 ? '$' + coinInfo.TOTALVOLUME24H : '€' + coinInfo.TOTALVOLUME24H}
                                            </TableCell>
                                        </TableRow>
                                    </TableBody>
                                </Table>
                            </TableContainer>
                        </Paper>
                    </Grid>
                </Grid>
            </Container>
        </>
    )
}

export default CardCrypto