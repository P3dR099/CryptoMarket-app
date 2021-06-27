import React from 'react';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import logoEUR from '../../logos/euro.png'
import logoUSD from '../../logos/dollar.png'

export default function ModalCurrency(props) {

    const item = localStorage.getItem('value') !== null && parseInt(localStorage.getItem('value'))
    const [CurrencyIndex, setCurrencyIndex] = React.useState(item ? item : 2)
    const [open, setOpen] = React.useState(false);

    const handleChange = (event) => {
        if (event.target.value === 1) {
            setCurrencyIndex(1)
            props.setCurrency('EUR')
            props.getCoins('EUR')
            localStorage.setItem('value', event.target.value)
        }
        if (event.target.value === 2) {
            setCurrencyIndex(2)
            props.setCurrency('USD')
            props.getCoins('USD')
            localStorage.setItem('value', event.target.value)
        }
    };

    const handleClose = () => {
        setOpen(false);

    };

    const handleOpen = () => {
        setOpen(true);
    };

    return (
        <FormControl style={{ width: "65px", marginRight: 10 }}>
            <InputLabel style={{ top: "-10px", left: "16px" }} >{parseInt(localStorage.getItem('value')) === 1 ? <img alt="logo EUR" style={{ width: "16px" }} src={logoEUR} /> : <img alt="logo USD" style={{ width: "16px" }} src={logoUSD} />}</InputLabel>
            <Select
                style={{ margin: "0px" }}
                labelId="demo-controlled-open-select-label"
                id="demo-controlled-open-select"
                open={open}
                onClose={handleClose}
                onOpen={handleOpen}
                value={CurrencyIndex}
                onChange={handleChange}
            >
                <MenuItem value={1} name={"EUR"}>EUR</MenuItem>
                <MenuItem value={2} name={"USD"}>USD</MenuItem>
            </Select>
        </FormControl>
    );
}