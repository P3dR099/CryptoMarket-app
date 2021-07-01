import React, { useState, useEffect } from 'react';
import Trade from '../services/trade.service'
import Container from '@material-ui/core/Container';
import makeStyles from '@material-ui/core/styles/makeStyles';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useTheme } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
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
        marginTop: 30
    },
    logoCoinMin: {
        width: 33,
        height: 32,
        marginRight: 10,
        marginTop: 10
    },

    boxPriceCoin: {
        display: 'inline-flex'
    },

    backgroundCripto: {
        padding: 0, marginTop: -26, maxWidth: '100%', height: '100%', position: 'inherit'
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
        display: "flex", marginBlock: 27, borderRadius: 10, width: 71, height: 30, marginLeft: "13px",
        placeContent: 'center', padding: '2px 0px 0px 0px', color: 'white', backgroundColor: 'green'
    },
    red: {
        display: "flex", marginBlock: 29, borderRadius: 10, width: 71, height: 30, marginLeft: "13px",
        placeContent: 'center', padding: '2px 0px 0px 0px', color: 'white', backgroundColor: 'red'
    },
    fontText: {
        fontSize: 33
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
}))

const CardCrypto = (props) => {

    const classes = useStyles()
    const classBottom = useStyles3()
    const [price, setPrice] = useState([])
    const [info, setInfo] = useState([])
    const [coinInfo, setCoinInfo] = useState([])
    const [coinSymbol, setCoinSymbol] = useState([])
    const [histoHour, setHistoHour] = useState([])
    const [histoMinute, sethistoMinute] = useState([])
    const theme = useTheme();
    const matchesDown = useMediaQuery(theme.breakpoints.down('sm'));
    const matchesMax = useMediaQuery('(min-width:1050px)');
    const matches = useMediaQuery('(min-width:420px)');
    let lastSlash = props.location.pathname.lastIndexOf('/')
    let id = props.location.pathname.slice(lastSlash + 1, props.location.pathname.length)

    useEffect(() => {

        tradeService.getCoin(id)
            .then(res => {
                props.allInfoCoin.length !== 0 && localStorage.setItem('info', JSON.stringify(props.allInfoCoin))
                if (props.allInfoCoin.length === 0) {
                    localInfo.filter((item) => {
                        if (item.FROMSYMBOL === res.data[0].symbol) {
                            item.PRICE < 2 ? setPrice(item.PRICE.toFixed(4)) : setPrice(item.PRICE.toFixed(2))
                            setCoinInfo(item)
                        }
                    })
                }
                props.allInfoCoin.filter((item) => {
                    if (item.FROMSYMBOL === res.data[0].symbol) {
                        setCoinInfo(item)
                        item.PRICE < 2 ? setPrice(item.PRICE.toFixed(4)) : setPrice(item.PRICE.toFixed(2))
                    }
                })
                setCoinSymbol(res.data[0].symbol)
                tradeService.getHistoByMin(res.data[0].symbol, props.Currency, 1440)
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

        tradeService.getCoinInfo(`id=${id}`)
            .then(res => setInfo(res.data[id]))
            .catch(err => console.log(err))

        const localInfo = JSON.parse(localStorage.getItem('info'))
    }, [props.Currency, props.allInfoCoin, id])

    let arrTimes, arrTimesMinutes = []
    histoHour.Data !== undefined && histoHour.Data.map(el => { return arrTimes.push(el.high) })
    histoMinute.Data !== undefined && histoMinute.Data.map(el => { return arrTimesMinutes.push(el.high) })

    const showPrices = () => {
        if (!matchesDown) {
            return (
                <Grid container spacing={3} style={{ margin: 0, justifyContent: 'center' }}>
                    <span className={coinInfo.CHANGEPCT24HOUR < 0 ? classBottom.red : classBottom.green}>
                        {coinInfo.CHANGEPCT24HOUR !== undefined && coinInfo.CHANGEPCT24HOUR.toFixed(2)}
                    </span>
                </Grid>
            )
        }
    }

    return (
        <>
            <CustomizedBreadcrumbs />
            <Container className={classes.backgroundCripto} >
                <Grid style={{ width: '99%', margin: 0 }} container spacing={2}>
                    <Grid item xs={matchesDown ? 12 : 8}>
                        <Paper style={{ margin: 0, backgroundColor: 'transparent' }} elevation={3}>
                            <Container style={{ padding: !matches && 18 }}>
                                <Container style={{ display: "flex", padding: 0 }}>
                                    <Grid style={{ display: "inherit", transform: !matches && 'translateX(15px)' }} item xs={12}>
                                        <img alt="coin logo" className={matches ? classes.logoCoin : classes.logoCoinMin} src={info.logo} />
                                        <h1 className={!matches ? classBottom.fontTextMin : classBottom.fontText}>{info.name}</h1>
                                    </Grid>
                                    <Container style={{ padding: 0 }}>
                                        <Container style={{ display: 'flex' }}>
                                            <Container>
                                                <h1 style={{ fontSize: !matches ? 20 : 33, transform: matchesMax && 'translateX(60px)' }}> {parseInt(localStorage.getItem('value')) === 2 ? '$' + price : '€' + price} </h1>
                                            </Container>
                                            {showPrices()}
                                        </Container>
                                    </Container>
                                </Container>

                                {histoMinute.Data !== undefined && <TabPanel coinSymbol={coinSymbol} arrTimesMinutes={arrTimesMinutes} setHistoHour={setHistoHour} histoHour={histoHour} histoMinute={histoMinute} {...props} />}
                            </Container>
                        </Paper>
                    </Grid>
                    <Grid item xs={matchesDown ? 12 : 4}>
                        <Paper style={{ margin: !matchesDown && '190px 0px 0px 16px', background: '#f8fafd', borderRadius: 16 }} elevation={3}>
                            <Container style={{ padding: 1 }}>
                                <h2>{info.name} Price Today</h2>
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
                                                €{coinInfo.PRICE}
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