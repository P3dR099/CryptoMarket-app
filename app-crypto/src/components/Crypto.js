import React, { useState, useEffect } from 'react';
import Trade from '../services/trade.service'
import Container from '@material-ui/core/Container';
import makeStyles from '@material-ui/core/styles/makeStyles';
import { LineChart, Line, ResponsiveContainer, CartesianGrid, XAxis, YAxis, Tooltip, Legend } from 'recharts';
const tradeService = new Trade()
// import LinearProgress from '@material-ui/core/LinearProgress';

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

const CardCrypto = (props) => {

    const classes = useStyles();
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

        console.log(props)
        console.log(id)
        tradeService.getCoinInfo(`id=${id}`)
            .then(res => {
                setInfo(res.data[id])
            })
            .catch(err => console.log(err))

        tradeService.getCoin(id)
            .then(res => {
                setPrice(res.data[0].price > 10 ? res.data[0].price.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",") : res.data[0].price.toFixed(2))
                tradeService.getHistoDay(res.data[0].symbol)
                    .then(res => {
                        res.data.Data.Data.map(element => {
                            const hours = convertToDate(element.time)
                            return element.time = hours
                        });

                        convertToDate(res.data.Data.Data[0].time)
                        setHistoDay(res.data.Data)

                    })
                    .catch(err => console.log(err))
            })
            .catch(error => console.log(error))


        return () => {
            setHistoDay({}); // This worked for me
        };

    }, [id])

    let arrTimes = []
    let numMax
    if (histoDay.Data !== undefined) {
        histoDay.Data.map(el => {
            return arrTimes.push(el.high)
        })
        numMax = (arrTimes[0] / 100) * 130
    }

    const getMin = () => {
        const smallest = Math.min(...arrTimes);
        const index = arrTimes.indexOf(smallest)
        const filterMin = arrTimes.filter((_, i) => i === index);
        const restPercent = (filterMin / 100) * 95
        const result = restPercent.toFixed(2)
        return parseFloat(result)
    }

    return (
        <>
            <Container className={classes.boxPriceCoin}>
                <Container className={classes.boxCoin} >
                    <img alt="coin logo" className={classes.logoCoin} src={info.logo} />
                    <h1 style={{ fontSize: 35 }} >{info.name}</h1>
                </Container>
                <Container>
                    <h1>${price}</h1>
                </Container>
            </Container>
            <Container maxWidth="sm" style={{ display: 'inline' }}>
                <LineChart
                    width={950}
                    height={500}
                    data={histoDay.Data}
                    margin={{
                        top: 5,
                        right: 30,
                        left: 100,
                        bottom: 5,
                    }}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="time" />
                    <YAxis type="number" domain={[getMin(), numMax]} />
                    <Tooltip />
                    <Legend />
                    <Line dot={false} type="monotone" dataKey="open" stroke={arrTimes[0] > arrTimes[arrTimes.length - 1] ? 'red' : 'green'} activeDot={{ r: 5 }} />
                </LineChart>
            </Container>
        </>
    )
}

export default CardCrypto