import React, { useEffect } from 'react';
import Trade from '../services/trade.service'
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import makeStyles from '@material-ui/core/styles/makeStyles';
const tradeService = new Trade()

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

const GraphCoin = (props) => {

    const matches = useMediaQuery('(min-width:700px)');
    const matchesMax = useMediaQuery('(max-width:1256px)');

    const useStyles = makeStyles({
        graphCoin: {

            height: 500,
            margin: "0px 0px 0px",
            padding: 0,
            fontSize: matches ? 15 : 12,
            marginInlineStart: !matchesMax ? -40 : -42,
            marginInlineEnd: !matchesMax ? 130 : 0
        }

    })

    const classes = useStyles()

    const getMax = () => {
        const max = Math.max(...props.arrTimesMinutes);
        const index = props.arrTimesMinutes.indexOf(max)
        const filterMax = props.arrTimesMinutes.filter((_, i) => i === index);
        let restPercent = (filterMax / 100) * 95

        if (max < 1) {
            restPercent = (filterMax / 100) * 103
            return parseFloat(restPercent.toFixed(5))
        }
        return parseFloat(restPercent.toFixed(1))
    }

    const getMin = () => {
        const smallest = Math.min(...props.arrTimesMinutes);
        const index = props.arrTimesMinutes.indexOf(smallest)
        const filterMin = props.arrTimesMinutes.filter((_, i) => i === index);
        const restPercent = (filterMin / 100) * 100
        if (smallest < 1) {
            return parseFloat(restPercent.toFixed(5))
        }

        return parseFloat(restPercent.toFixed(1))
    }

    const getHistoryData = () => {

        if (props.value === 0) {
            return props.histoMinute.Data
        }
        if (props.value === 1) {
            return props.histoMinute.Data.slice(1380, -1)
        }
    }

    const { value } = props

    useEffect(() => {
        value === 2 && tradeService.getHistoByHour(props.coinSymbol, props.Currency, 730)
            .then(resp => {

                resp.data.Data.Data.map(element => {
                    const hours = convertToDate(element.time)
                    return element.time = hours
                });

                props.setHistoHour(resp.data.Data.Data)
            })
            .catch(err => console.log(err))

    }, [])


    const getColorHistoValues = () => {
        if (props.value === 0) {
            if (props.histoMinute.Data !== undefined && props.histoMinute.Data[0].open > props.histoMinute.Data[props.histoMinute.Data.length - 1].open) {
                return 'red'
            } else return 'green'
        }
        else if (props.value === 1) {
            if (props.histoMinute.Data !== undefined && props.histoMinute.Data[1380].open > props.histoMinute.Data[props.histoMinute.Data.length - 1].open) {
                return 'red'
            } else return 'green'
        }

        else {
            if (props.histoHour[0] !== undefined && props.histoHour[0].open > props.histoHour[props.histoHour.length - 1].open) {
                return 'red'
            } else return 'green'
        }
    }

    const scaleGraph = () => {
        if (!matchesMax) {
            return '169%'
        }

    }

    return (
        <>
            <div className={classes.graphCoin}>
                <ResponsiveContainer width={scaleGraph()} style={{ marginInlineStart: -35 }} >
                    <LineChart
                        data={props.value === 2 ? props.histoHour : getHistoryData()}
                        margin={{
                            top: 2,
                            right: 5,
                            left: 20,
                            bottom: 5,
                        }}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="time" />
                        <YAxis tick={!matches ? false : true} domain={[getMin(), getMax()]} />
                        {/* <Legend /> */}
                        <Line dot={false} type="monotone" dataKey="open" stroke={getColorHistoValues()} />
                        <Tooltip />
                    </LineChart>
                </ResponsiveContainer>
            </div>
        </>
    )
}

export default GraphCoin