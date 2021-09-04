import React, { useEffect, useState } from 'react';
import { Container } from '@material-ui/core';
import ArrowDropUpIcon from '@material-ui/icons/ArrowDropUp';
import clsx from 'clsx';
import CircularProgress from '@material-ui/core/CircularProgress';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import { useSelector } from 'react-redux'
import {
    DataGrid,
    GridToolbarContainer,
} from '@material-ui/data-grid';
import { Link } from "react-router-dom";
import Modal from './layout/Modal'
import useMediaQuery from '@material-ui/core/useMediaQuery';
import ModalCurrency from './layout/ModalCurrecy';
import { ContainerLogo, ImageCoin } from './style/TableCriptos';
import colChange_1h, { colChange_1d } from './utils/TableColumns';
import { makeStyles } from '@material-ui/core/styles';

function CustomToolbar() {
    return (
        <GridToolbarContainer>
            {/* <GridDensitySelector /> */}
            {/* <GridFilterToolbarButton /> */}
        </GridToolbarContainer>
    );
}

export default function DataTable(props) {

    const matchesMin = useMediaQuery('(min-width:460px)');
    const [stateCols, setStateCols] = useState({ change_1h: false, change_1d: false });
    const [, setColumns] = React.useState([])
    const { data } = useSelector(state => state)
    const { getCoins } = props
    const rows = data

    const classTableCriptos = makeStyles({
        contModals: {
            display: "flex", justifyContent: "flex-end",
            transform: !matchesMin ? 'translateY(132px)' : 'translateY(82px)'
        },

        contLink: {
            textDecoration: 'none', color: 'inherit'
        },

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
            height: '100vh', width: '99.5%', marginTop: !matchesMin ? 140 : 100
        }
    })

    const classes = classTableCriptos(matchesMin)

    useEffect(() => {
        parseInt(localStorage.getItem('value')) === 1 ? getCoins('EUR') : getCoins('USD')
    }, [getCoins])


    const columns = [
        {
            renderCell: (params) => (
                <Container className="hidden">
                    <Link to={"/coin/" + params.row.id} className={classes.contLink} >
                        <ContainerLogo>
                            <ImageCoin alt="imageCrypto" src={`https://s2.coinmarketcap.com/static/img/coins/64x64/${params.row.id}.png`} />
                            <p>{params.row.name} </p>
                        </ContainerLogo>
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
            <Container className={classes.contModals}>
                <ModalCurrency {...props} />
                <Modal allColumns={columns} setColumns={setColumns} handleRows={handleRows} stateCols={stateCols} setStateCols={setStateCols} {...props} />
            </Container>
            <div className={classes.table} >
                {data.length !== 0 ? <DataGrid components={{ Toolbar: CustomToolbar }} loading={data.length === 0 && true} rows={rows} columns={columns} disableSelectionOnClick={false} rowsCount={101} pageSize={50} rowsPerPageOptions={[5, 10, 50, 100]} /> : <CircularProgress />}
            </div>
        </>
    );
}