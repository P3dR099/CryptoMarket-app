import { Container } from '@material-ui/core';
import styled from 'styled-components';

const Button = styled.button`
    border-radius: 14px;
    border: none;
    width: 100px;
    color: white;
    height: 35px;
    background: steelblue;
    margin: 25px;
    padding: 2px 0px 0px 3px;
`

export const ContainerHome = styled.div`
    max-width: 2850px;
    padding: 0px;
    height: 100vh;
`

export const SubContainerHome = styled.div`
    padding: inherit;
    max-width: inherit;
    height: inherit;
`

export const ContainerKid = styled.div`
    position: absolute;
    width: 100%;
    position: absolute;
    ${({ matches }) => !matches ? `height: 680px;` : `height: 440px;`}
/* background: #000046; */
    background: -webkit-linear-gradient(to top, #1CB5E0, #000046);
    background: linear-gradient(to top, #1CB5E0, #000046);
`

export const ContainerSection = styled(Container)`
    display: -webkit-flex;
    -webkit-justify-content: center;
    -webkit-align-items: center;
    height: 240px;
    background: dimgrey;
    border-radius: 63px;
    width: 100%;
    height: 500px;
    background-color: #F0F2F7;
`

export const ContainerParentSection = styled(Container)`
    transform: translateY(190px);
    ${({ matches }) => matches ? `margin-top: 0px;` : `margin-top: 160px;`}
`
export const ContainerGraphAppImg = styled.div`
	
    webkit-transform: scale(1);
	transform: scale(1);
	-webkit-transition: .3s ease-in-out;
	transition: .3s ease-in-out;

`

export const FigureTransition = styled.figure`
    :hover{

        webkit-transform: scale(1.3);
        transform: scale(1.3);
    }
`

export const GraphAppLogoImg = styled.img`
    transform: skewX(10deg);
    width: 150px
    
`

export default Button;