import React from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import Container from '@material-ui/core/Container';
import TableRow from '@material-ui/core/TableRow';
import { useTheme } from '@material-ui/core/styles';
import { Grid } from '@material-ui/core';
import ListStatsCoin, { ValueStatsCoin, ContainerPaperList } from '../style/Crypto';


const GridStatsCrypto = (props) => {

    const theme = useTheme();
    const matches = useMediaQuery('(min-width:600px)');
    const matchesDown = useMediaQuery(theme.breakpoints.down('sm'));
    const { coinInfo, info, price } = props;

    return (

        <Grid item xs={matchesDown ? 12 : 4} style={{ display: 'flex', justifyContent: 'center', padding: !matches && '0rem 0rem 0rem 1.5rem', marginTop: !matches && '0.5rem', alignSelf: matches && 'center', paddingLeft: matches && '2.8rem' }} >
            <ContainerPaperList elevation={3} style={{ borderRadius: 20 }} >
                <Container style={{ padding: 2 }}>
                    <h2>{info && info.name} Price Today</h2>
                </Container>
                <TableContainer>
                    <Table size="small" aria-label="a dense table">
                        {/* <TableHead></TableHead> */}
                        <TableBody>
                            <TableRow>
                                <TableCell>
                                    <ListStatsCoin>
                                        {info.name} Price
                                    </ListStatsCoin>
                                </TableCell>
                                <TableCell>
                                    {!price ? '' :
                                        <ValueStatsCoin>
                                            {parseInt(localStorage.getItem('value')) === 2 ? '$' + price : '???' + price}
                                        </ValueStatsCoin>
                                    }
                                </TableCell>
                            </TableRow>
                        </TableBody>
                        <TableBody>
                            <TableRow>
                                <TableCell>
                                    <ListStatsCoin>
                                        24h Low / 24h High
                                    </ListStatsCoin>
                                </TableCell>
                                <TableCell>
                                    {!price ? '' :
                                        <ValueStatsCoin>
                                            {parseInt(localStorage.getItem('value')) === 2 ? '$' + coinInfo.LOW24HOUR + ' / ' + coinInfo.HIGH24HOUR : '???' + coinInfo.LOW24HOUR + ' / ' + coinInfo.HIGH24HOUR}
                                        </ValueStatsCoin>
                                    }
                                </TableCell>
                            </TableRow>
                        </TableBody>
                        <TableBody>
                            <TableRow>
                                <TableCell>
                                    <ListStatsCoin>
                                        Market Cap 24h
                                    </ListStatsCoin>
                                </TableCell>
                                <TableCell>
                                    {!price ? '' :
                                        <ValueStatsCoin>
                                            {parseInt(localStorage.getItem('value')) === 2 ? '$' + coinInfo.MKTCAP : '???' + coinInfo.MKTCAP}
                                        </ValueStatsCoin>
                                    }
                                </TableCell>
                            </TableRow>
                        </TableBody>
                        <TableBody>
                            <TableRow>
                                <TableCell>
                                    <ListStatsCoin>
                                        Change 24h
                                    </ListStatsCoin>
                                </TableCell>
                                <TableCell>
                                    <ValueStatsCoin style={{ color: coinInfo.CHANGEPCT24HOUR !== undefined && coinInfo.CHANGEPCT24HOUR.toFixed(2) < 0 ? 'red' : 'green' }}>
                                        {coinInfo.CHANGEPCT24HOUR !== undefined && coinInfo.CHANGEPCT24HOUR.toFixed(2)}%
                                    </ValueStatsCoin>
                                </TableCell>
                            </TableRow>
                        </TableBody>
                        <TableBody>
                            <TableRow>
                                <TableCell>
                                    <ListStatsCoin>
                                        Volume 24 hour
                                    </ListStatsCoin>
                                </TableCell>
                                <TableCell>
                                    {!price ? '' :
                                        <ValueStatsCoin>
                                            {coinInfo.TOTALVOLUME24H !== undefined && parseInt(localStorage.getItem('value')) === 2 ? '$' + coinInfo.TOTALVOLUME24H : '???' + coinInfo.TOTALVOLUME24H}
                                        </ValueStatsCoin>
                                    }
                                </TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                </TableContainer>
            </ContainerPaperList>
        </Grid>
    )
}

export default GridStatsCrypto