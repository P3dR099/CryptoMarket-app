import { makeStyles } from '@material-ui/core/styles';
import styled from 'styled-components';

const TableStyle = makeStyles({

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

export const ContainerLogo = styled.div`
    padding-left: 4px;
    padding: 5px;
    box-sizing: content-box;
    display: -webkit-box;
    -webkit-box-align: center;
    transform: translateX(-20px);
    height: 750px;
    width: 100%;
`

export const ImageCoin = styled.img`
    width: 24px;
    margin-right: 5px;
    vertical-align: text-bottom;
    margin-top: 15px;
`

export default TableStyle;