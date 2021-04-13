import React, { useState, useEffect } from 'react';
import Trade from '../services/trade.service'
import Container from '@material-ui/core/Container';
import makeStyles from '@material-ui/core/styles/makeStyles';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useTheme } from '@material-ui/core/styles';
import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import CustomizedBreadcrumbs from '../components/layout/BreadCump'
import { Grid } from '@material-ui/core';
const tradeService = new Trade()

const useStyles = makeStyles({

    boxCoin: {
        // backgroundColor: 'rgba(224, 183, 60, 0.55)',
        display: 'flex',
        alignItems: 'center'
    },
    root: {},

    logoCoin: {
        width: 35,
        height: 35,
        marginRight: 10
    },

    boxPriceCoin: {
        display: 'inline-flex'
    }

});

const useStyles2 = makeStyles((width) => ({
    root: {
        [width.breakpoints.up('sm')]: {
            width: '70%',
        },
        [width.breakpoints.down('sm')]: {
            width: '100%'
        },
    }
}))

const CardCrypto = (props) => {

    const classes = useStyles()
    const classesGraph = useStyles2()
    const [price, setPrice] = useState([])
    const [info, setInfo] = useState([])
    const [histoDay, setHistoDay] = useState([])
    let lastSlash = props.location.pathname.lastIndexOf('/')
    let id = props.location.pathname.slice(lastSlash + 1, props.location.pathname.length)

    const convertToDate = (unixTime) => {
        var months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
        const date = new Date(unixTime * 1000)
        var year = date.getFullYear();
        var month = months[date.getMonth()];
        const dayOfWeek = date.getDate()
        const hours = date.getHours()
        const minutes = "0" + date.getMinutes();
        const seconds = "0" + date.getSeconds();
        const formattedTime = year + ':' + month + ':' + dayOfWeek + ':' + hours + ':' + minutes.substr(-2) + ':' + seconds.substr(-2);
        return formattedTime;
    }

    useEffect(() => {

        tradeService.getCoin(id)
            .then(res => {
                tradeService.getHistoDay(res.data[0].symbol, props.Currency)
                    .then(res => {
                        console.log(res)
                        res.data.Data.Data.map(element => {
                            const hours = convertToDate(element.time)
                            return element.time = hours
                        });
                        setHistoDay(res.data.Data)
                        setPrice(res.data.Data.Data[res.data.Data.Data.length - 1])
                    })
                    .catch(err => console.log(err))
            })
            .catch(error => console.log(error))

        tradeService.getCoinInfo(`id=${id}`)
            .then(res => {
                setInfo(res.data[id])
            })
            .catch(err => console.log(err))
    }, [id])

    let arrTimes = []
    if (histoDay.Data !== undefined) {
        histoDay.Data.map(el => {
            return arrTimes.push(el.high)
        })
    }

    const getMax = () => {
        const max = Math.max(...arrTimes);
        const index = arrTimes.indexOf(max)
        const filterMax = arrTimes.filter((_, i) => i === index);
        return parseFloat(filterMax)
    }

    const getMin = () => {
        const smallest = Math.min(...arrTimes);
        const index = arrTimes.indexOf(smallest)
        const filterMin = arrTimes.filter((_, i) => i === index);
        const restPercent = (filterMin / 100) * 95
        const result = restPercent.toFixed(2)
        return parseFloat(result)
    }

    const theme = useTheme();
    const matches = useMediaQuery(theme.breakpoints.up('sm'));

    return (
        <>
            <CustomizedBreadcrumbs />
            <Container >
                <Grid style={{ display: "flex" }} item xs={12}>
                    <img style={{ marginTop: "25px" }} alt="coin logo" className={classes.logoCoin} src={info.logo} />
                    <h1>{info.name}</h1>
                </Grid>
                <Grid style={{ display: "flex" }} item spacing={3}>
                    <h1>${price.open}</h1>
                </Grid>
            </Container >
            <Container>
                <div style={{ height: 500, margin: "0px 0px 0px" }} className={classesGraph.root}>
                    <ResponsiveContainer width="100%">
                        <LineChart
                            data={histoDay.Data}
                            margin={{
                                top: 20,
                                right: 5,
                                left: 4,
                                bottom: 5,
                            }}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="time" />
                            <YAxis type="number" domain={[getMin(), getMax()]} />
                            <Tooltip />
                            <Legend />
                            <Line dot={false} type="monotone" dataKey="open" stroke={arrTimes[0] > arrTimes[arrTimes.length - 1] ? 'red' : 'green'} activeDot={{ r: 5 }} />
                        </LineChart>
                    </ResponsiveContainer>
                </div>
            </Container>
        </>
    )
}

export default CardCrypto