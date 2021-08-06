import { Paper } from '@material-ui/core';
import styled from 'styled-components';

export const boxCoin = styled.div`
    display: 'flex';
    alignItems: 'center'
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
    padding: 0px; max-width: 100%; height: 100%; position: inherit;
`

export const ContainerPaperCrypto = styled(Paper)`
    margin: 0px;
    background-color: transparent;
`

export const Green = styled.div`
    display: -webkit-flex; border-radius: 10px; width: 60px; margin-top: 0; -webkit-align-items: center;
        place-content: center; padding: 1px 5px 0px 0px; color: white; background-color: green; font-size: 12px;
`

export const Red = styled.div`
    display: flex; margin-top: 3px; border-radius: 10px; width: 60px; align-items: center;
        place-content: center; padding: 1px 5px 0px 0px; color: white; background-color: red; font-size: 12px;
`
export const FontText = styled.h1`
    font-size: 30px;
`

export const FontTextMin = styled.h1`
    font-size: 20px;
    margin-top: 9.5px;
    margin-right: 25px;
`

const ListStatsCoin = styled.div`
    font-weight: 500; color: #58667e;
`

export const ValueStatsCoin = styled.div`
    font-weight: 600; color: #000; line-height: 3; text-align: end;
`

export default ListStatsCoin;