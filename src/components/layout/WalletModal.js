import React, { useEffect, useState } from "react";
import { makeStyles } from '@material-ui/core/styles';
import { ethers } from "ethers";
import Typography from "@material-ui/core/Typography";
import FormHelperText from '@material-ui/core/FormHelperText';
import useMediaQuery from '@material-ui/core/useMediaQuery';

import { ParraphMessage, TypographyTitle } from '../style/App'


export default React.forwardRef((props, ref) => {

    const [network, setNetwork] = useState('')
    const [balance, setBalance] = useState('')

    const matches = useMediaQuery('(min-width:500px)')

    function getModalStyle() {
        const top = 50
        const left = 50

        return {
            top: `${top}%`,
            left: `${left}%`,
            transform: `translate(-${top}%, -${left}%)`,
        };
    }

    const useStyles = makeStyles((theme) => ({
        paper: {
            position: 'absolute',
            width: !matches && '55%',
            height: '60%',
            backgroundColor: theme.palette.background.paper,
            boxShadow: theme.shadows[5],
            padding: '2rem 1.5rem',
            borderRadius: 25
        },
    }));

    const [modalStyle] = useState(getModalStyle);
    const classes = useStyles();

    const { provider, addressWallet } = props

    const getInfoWallet = async () => {
        const getNetwork = await provider.getNetwork()
        const balance = await provider.getBalance(addressWallet)
        setBalance(ethers.utils.formatEther(balance))
        setNetwork(getNetwork)
        return getNetwork
    }

    useEffect(() => {
        getInfoWallet()
    })

    return (
        <>
            <div style={modalStyle} className={classes.paper}>
                <div>
                    <TypographyTitle>Wallet</TypographyTitle>
                </div>

                <ParraphMessage>
                    <Typography variant="p">
                        {matches ? addressWallet : addressWallet.substring(0, 19) + '...'}
                    </Typography>
                </ParraphMessage>

                <FormHelperText>
                    columns to show the change of 1 hour and 1 day
                </FormHelperText>

                <div style={{
                    display: 'flex',
                    justifyContent: 'space-between'
                }}>
                    <div>{network.name} Balance</div>
                    <div>{balance}</div>
                </div>

            </div>
        </>
    )
})
