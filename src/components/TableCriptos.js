import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Container } from '@material-ui/core';
import ArrowDropUpIcon from '@material-ui/icons/ArrowDropUp';
import clsx from 'clsx';
import CircularProgress from '@material-ui/core/CircularProgress';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import {
    DataGrid,
    GridToolbarContainer,
    GridDensitySelector,
    GridFilterToolbarButton,
} from '@material-ui/data-grid';
import { Link } from "react-router-dom";
import Modal from './layout/Modal'
import useMediaQuery from '@material-ui/core/useMediaQuery';
import ModalCurrency from './layout/ModalCurrecy';

const useStyles = makeStyles({

    table: {
        '& .super-app-theme--cell': {
            color: '#1a3e72',
            fontWeight: '600',
        },
        '& .super-app.negative': {
            color: '#ea3943',
            fontWeight: '600',
        },
        '& .super-app.positive': {
            color: '#5ced75',
            fontWeight: '600',
        },
    },
    imageCoin: {
        width: "24px", marginRight: 5

    },
    contLogo: {
        paddingLeft: '4px', padding: 5,
        boxSizing: 'content-box', display: 'flex', alignItems: 'center',
        transform: 'translateX(-20px)'
    }
});

function CustomToolbar() {
    return (
        <GridToolbarContainer>
            <GridDensitySelector />
            <GridFilterToolbarButton />
        </GridToolbarContainer>
    );
}

export default function DataTable(props) {

    const classes = useStyles();
    const matchesMin = useMediaQuery('(min-width:460px)');

    const [stateCols, setStateCols] = useState({
        change_1h: false,
        change_1d: false
    });

    const [, setColumns] = React.useState([])

    const { getCoins, data } = props
    const rows = data

    useEffect(() => {

        parseInt(localStorage.getItem('value')) === 1 ? getCoins('EUR') : getCoins('USD')

    }, [getCoins])

    const colChange_1h = {
        renderCell: (params) => (
            <>
                {params.row.change_1h > 0 ? <ArrowDropUpIcon /> : <ArrowDropDownIcon />}
                <p>{params.row.change_1h.toFixed(2)}%</p>
            </>
        ),
        field: 'change_1h', headerName: '%1h', width: 130, type: 'number', cellClassName: (params) => clsx('super-app', { negative: params.value < 0, positive: params.value > 0 })
    }

    const colChange_1d = {
        renderCell: (params) => (
            <>
                {params.row.change_1d > 0 ? <ArrowDropUpIcon /> : <ArrowDropDownIcon />}
                <p>{params.row.change_1d.toFixed(2)}%</p>
            </>
        ),
        field: 'change_1d', headerName: '%24h', width: 130, type: 'number', cellClassName: (params) => clsx('super-app', { negative: params.value < 0, positive: params.value > 0 })
    }

    const columns = [
        {
            renderCell: (params) => (
                <Container className="hidden">
                    <Link to={"/coin/" + params.row.id} style={{ textDecoration: 'none', color: 'inherit' }} >
                        <Container className={classes.contLogo} >
                            <img alt="imageCrypto" src={`https://s2.coinmarketcap.com/static/img/coins/64x64/${params.row.id}.png`} className={classes.imageCoin}></img>
                            <p>{params.row.name} </p>
                        </Container>
                    </Link>
                </Container>
            ), field: 'name', headerName: 'Token', width: 190, cellClassName: 'super-app-theme--cell'
        },
        {
            renderCell: (params) => (
                params.row.price > 1 ? <strong> {params.row.price.toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}{parseInt(localStorage.getItem('value')) === 1 ? '€' : '$'} </strong> : (
                    <strong>
                        {parseInt(localStorage.getItem('value')) === 1 ? params.row.price.toFixed(7) + '€' : params.row.price.toFixed(7) + '$'}
                    </strong>
                )
            ),
            field: 'price', headerName: 'Price', width: 130
        },
        {
            renderCell: (params) => (
                <>
                    {params.row.change_7d > 0 ? <ArrowDropUpIcon /> : <ArrowDropDownIcon />}
                    <p>{params.row.change_7d.toFixed(2)}%</p>
                </>
            ),
            field: 'change_7d', headerName: '%7d', width: 130, type: 'number', cellClassName: (params) => clsx('super-app', { negative: params.value < 0, positive: params.value > 0 })
        },
        { field: 'symbol', headerName: 'Symbol', width: 150 },
        { field: 'marketCap', renderCell: (params) => <strong> {params.row.marketCap.toFixed(0).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</strong>, headerName: 'Market Cap', width: 150 }
    ];

    const handleRows = event => { setStateCols({ ...stateCols, [event.target.name]: event.target.checked }) }

    (() => {

        if (stateCols.change_1d) {
            columns.splice(3, 0, colChange_1d)
        }
        if (stateCols.change_1h) {
            columns.splice(3, 0, colChange_1h)
        }
    })()

    return (
        <>
            <Container style={{ display: "flex", justifyContent: "flex-end", transform: !matchesMin ? 'translateY(132px)' : 'translateY(82px)' }}>
                <ModalCurrency {...props} />
                <Modal allColumns={columns} setColumns={setColumns} handleRows={handleRows} stateCols={stateCols} setStateCols={setStateCols} {...props} />
            </Container>
            <div style={{ height: 750, width: '100%', marginTop: !matchesMin ? 140 : 100 }} className={classes.table} >
                {data.length !== 0 ? <DataGrid components={{ Toolbar: CustomToolbar }} loading={!props.data && true} rows={rows} columns={columns} disableSelectionOnClick={false} rowsCount={101} pageSize={50} rowsPerPageOptions={[5, 10, 50, 100]} /> : <CircularProgress />}
            </div>
        </>
    );
}