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
    height: 125vh;
    ${({ matches }) => matches && `height: 80vh;`}
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
    ${({ matches }) => !matches ? `height: 775px;` : `height: 440px;`}
    background: -webkit-linear-gradient(to top, #1CB5E0, #000046);
    background: linear-gradient(to top, #1CB5E0, #000046);
`

export const ContainerSection = styled.div`
    padding:30px;
    height: 240px;
    background: dimgrey;
    border-radius: 63px;
    margin:65px;
    ${({ matches }) => matches && `margin: 15px;`}
    height: 500px;
    margin-top: 10px;
    background-color: rgba(239, 236, 254, 0.5);
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

export const GraphAppLogoImg = styled.img`
    transform: skewX(10deg);
    width: 150px;
    ${({ matches }) => matches && `width: 75px;`}    
`

export default Button;