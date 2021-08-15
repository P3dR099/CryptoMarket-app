import React, { useEffect } from 'react';
import Trade from '../services/trade.service'
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import convertToDate from './utils/convertToDate';
import getMax, { getMin } from './utils/getMinMax';
import GraphCoinContainer from './style/GraphCoin';
const tradeService = new Trade()

const GraphCoin = (props) => {

    const matches = useMediaQuery('(min-width:700px)');
    const matchesMax = useMediaQuery('(max-width:1256px)');
    const { value, setHistoHour, coinSymbol, Currency, histoMinute, histoHour, arrTimesMinutes } = props

    const getHistoryData = () => {

        if (value === 0) {
            return histoMinute.Data.slice(1379, histoMinute.Data.length - 1)
        }
        if (value === 1) {
            return histoMinute.Data
        }
    }

    useEffect(() => {
        const getHistoMonth = () => {
            tradeService.getHistoByHour(coinSymbol, Currency, 730)
                .then(resp => {
                    resp.data.Data.Data.map(element => {
                        const hours = convertToDate(element.time)
                        return element.time = hours
                    });
                    setHistoHour(resp.data.Data.Data)
                })
                .catch(err => console.log(err))
        }
        value === 2 && getHistoMonth()

    }, [coinSymbol, Currency, setHistoHour, value])

    const getColorHistoValues = () => {
        if (props.value === 0) {

            if (histoMinute.Data !== undefined && histoMinute.Data[1379].open > histoMinute.Data[histoMinute.Data.length - 2].open) {
                return 'red'
            } else return 'green'
        }
        else if (value === 1) {
            if (histoMinute.Data !== undefined && histoMinute.Data[0].open > histoMinute.Data[histoMinute.Data.length - 1].open) {
                return 'red'
            } else return 'green'
        }

        else {
            if (histoHour[0] !== undefined && histoHour[0].open > histoHour[histoHour.length - 1].open) {
                return 'red'
            } else return 'green'
        }
    }

    const scaleGraph = () => {
        if (!matchesMax) {
            return '115%'
        }

    }

    return (
        <>
            <GraphCoinContainer matches={matches} matchesMax={matchesMax}>
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
                        <YAxis tick={!matches ? false : true} domain={[getMin(arrTimesMinutes), getMax(arrTimesMinutes)]} />
                        {/* <Legend /> */}
                        <Line dot={false} type="monotone" dataKey="open" stroke={getColorHistoValues()} />
                        <Tooltip />
                    </LineChart>
                </ResponsiveContainer>
            </GraphCoinContainer>
        </>
    )
}

export default GraphCoin