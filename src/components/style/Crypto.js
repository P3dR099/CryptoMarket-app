import { Paper } from '@material-ui/core';
import styled from 'styled-components';

export const boxCoin = styled.div`
    display: flex;
    align-items: center;
`

export const LogoCoin = styled.div`
    
    -webkit-box-align: center;
    display: -webkit-box;
    ${({ matches }) => matches && `
        margin-top: 6px;
        -webkit-box-align: center;
    `}
`
export const LogoCoinMin = styled.div`
    width: 33px;
    height: 35px;
    margin-right: 10px;
    margin-top: 6px;
    -webkit-align-items: center;
    display: flex;
`

export const boxPriceCoin = styled.div`
    display: 'inline-flex';
`

export const BackgroundCripto = styled.div`
    padding: 0px;
    max-width: 100%;
    height: 100%;
    ${({ matchesDown }) => matchesDown ? `height: 100vh;` : 'height: auto;'}
    position: inherit;
`

export const ContainerPaperCrypto = styled(Paper)`
    width: 95%;
    margin-left: 2.5%;
    background-color: transparent;
    ${({ matches }) => matches}
`

export const ContainerPaperList = styled(Paper)`
    background: #f8fafd;
 
    .MuiPaper-rounded {
    border-radius: 20px;
}
`

export const Green = styled.div`
    display: -webkit-flex; border-radius: 10px; width: 48px; height: 20px;
        ${({ matches }) => matches && `
        width: 78px;
        height: 25px;
    `}
        margin-top: 0;
        -webkit-align-items: center;
        place-content: center;
        padding: 0px 5px 0px 0px;
        color: white;
        background-color: green;
        font-size: 9px;
         ${({ matches }) => matches && `
        font-size: 11px;
    `}
`

export const Red = styled.div`
    display: -webkit-flex;
    border-radius: 10px;
    width:50px;
    height: 20px;
    padding: 0px 5px 0px 0px;
    font-size: 9px;
        ${({ matches }) => matches && `
        width: 78px;
        height: 25px;
        padding: 0px 5px 2px 0px;
        font-size: 10px;
    `}

        margin-top: 0;
        -webkit-align-items: center;
        place-content: center;
        color: white;
        background-color: red;
        ${({ matches }) => matches && `
        font-size: 11px;
    `}
`
export const FontText = styled.h1`
    font-size: 30px;
`

export const FontTextMin = styled.h1`
    font-size: 19px;
    margin-top: 9.5px;
    margin-right: 15px;
    text-align: start;
`

const ListStatsCoin = styled.div`
    font-weight: 500; color: #58667e;
`

export const ValueStatsCoin = styled.div`
    font-weight: 600;
    color: #000;
    line-height: 3;
    text-align: end;
`

export default ListStatsCoin;