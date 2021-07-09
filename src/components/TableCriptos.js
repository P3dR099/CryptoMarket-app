import React from 'react';
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

    root: {
        '& .super-app-theme--cell': {
            // backgroundColor: 'rgba(224, 183, 60, 0.55)',
            color: '#1a3e72',

            fontWeight: '600',
        },
        '& .super-app.negative': {
            // backgroundColor: '#d47483',
            color: '#dc143c',
            fontWeight: '600',
        },
        '& .super-app.positive': {
            // backgroundColor: 'rgba(157, 255, 118, 0.49)',
            color: 'green',
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

    const [stateCols, setStateCols] = React.useState({
        change_1h: false,
        change_1d: false
    });

    const [Columns, setColumns] = React.useState([])

    const rows = props.data


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

    const handleRows = event => {
        setStateCols({ ...stateCols, [event.target.name]: event.target.checked })
    }


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
            <div style={{ height: 750, width: '100%', marginTop: !matchesMin ? 140 : 100 }} className={classes.root} >
                {props.data ? <DataGrid components={{ Toolbar: CustomToolbar }} rows={rows} columns={columns} disableSelectionOnClick={false} rowsCount={101} pageSize={50} rowsPerPageOptions={[5, 10, 50, 100]} /> : <CircularProgress />}
            </div>
        </>
    );
}
