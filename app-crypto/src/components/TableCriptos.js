import React, { useState, useEffect } from 'react';
import LinearProgress from '@material-ui/core/LinearProgress';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import { Container } from '@material-ui/core';
import ArrowDropUpIcon from '@material-ui/icons/ArrowDropUp';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import { DataGrid } from '@material-ui/data-grid';
import { Link } from "react-router-dom";
import Trade from '../services/trade.service'
const tradeService = new Trade()

const useStyles = makeStyles({
    // table: {
    //     minWidth: 800,
    // },
    root: {
        '& .super-app-theme--cell': {
            // backgroundColor: 'rgba(224, 183, 60, 0.55)',
            color: '#1a3e72',
            fontWeight: '600',
        },
        '& .super-app.negative': {
            // backgroundColor: '#d47483',
            color: 'red',
            fontWeight: '600',
        },
        '& .super-app.positive': {
            // backgroundColor: 'rgba(157, 255, 118, 0.49)',
            color: 'green',
            fontWeight: '600',
        },
    },
    imageCoin: {
        width: "22px", height: "50%", marginTop: "14%"

    }
});

export default function DataTable(props) {

    const classes = useStyles();
    const [data, setData] = useState([]);

    useEffect(() => {

        getCoins()
    }, [])

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
                firstCriptos.forEach(element => {
                    arrLogoCoin.push(element.id)
                })
            })
            .catch(error => alert(error))
    }


    const rows = data
    let columns = [
        {
            field: 'id', renderCell: (params) => <strong> {params.row.id}</strong>, headerName: 'ID', width: 150
        },
        {
            renderCell: (params) => (
                <Container>
                    <Container style={{ paddingLeft: '4px' }}>
                        <Link to={"/coin/" + params.row.id}>
                            <img alt="imageCrypto" src={`https://s2.coinmarketcap.com/static/img/coins/64x64/${params.row.id}.png`} className={classes.imageCoin}></img>
                            <strong className={'NameCripto'} >{params.row.name} </strong>
                        </Link>
                    </Container>
                </Container>
            ), field: 'name', headerName: 'Token', width: 190, cellClassName: 'super-app-theme--cell'
        },
        {
            renderCell: (params) => (
                params.row.price > 1 ? <strong> {params.row.price.toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}$</strong> : (
                    <strong>
                        {params.row.price.toFixed(2)}
                    </strong>
                )
            ),
            field: 'price', headerName: 'Price', width: 130
        },
        {
            renderCell: (params) => (
                <>
                    {params.row.change > 0 ? <ArrowDropUpIcon /> : <ArrowDropDownIcon />}
                    <p>{params.row.change.toFixed(2)}%</p>
                </>
            ),
            field: 'change', headerName: '%7d', width: 130, type: 'number', cellClassName: (params) => clsx('super-app', { negative: params.value < 0, positive: params.value > 0 })
        },
        { field: 'symbol', headerName: 'Symbol', width: 150 },
        { field: 'marketCap', renderCell: (params) => <strong> {params.row.marketCap.toFixed(0).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</strong>, headerName: 'Market Cap', width: 150 }
    ];

    return (
        // <div style={{ height: 800, width: '100%' }} className={classes.root} >
        <Container style={{ height: 750, width: '100%' }} className={classes.root} >
            {/* <Button variant="contained">Default</Button> */}
            { data.length === 0 ? <LinearProgress /> : <DataGrid rows={rows} columns={columns} pageSize={50} rowsPerPageOptions={[5, 10, 50, 100]} />}
        </Container>
        // </div >
    );
}
