import styled from 'styled-components';

const Button = styled.button`
    border-radius: 14px;
    border: 1.5px solid #324f66;
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
    ${({ matches }) => matches && `height: 80vh;`}
    ${({ matchesMax }) => !matchesMax ? `margin-bottom: 10rem` : `margin-bottom: 8rem`}
`

export const ContainerKid = styled.div`
    position: absolute;
    width: 100%;
    ${({ matches }) => !matches ? `height: 100vh;` : `height: 80vh;`}
    background: -webkit-linear-gradient(to top, #1CB5E0, #000046);
    background: linear-gradient(to top, #1CB5E0, #000046);    
`

export const ContainerSection = styled.div`
    
    padding: 2rem 2rem;
    ${({ matches }) => matches && `padding: 3rem;`}
    background: dimgrey;
    border-radius: 63px;
    margin: 3rem 2rem;
    ${({ matches }) => matches && `margin: 7rem ​1rem 1rem 1rem;`}
    height: 420px;
    background-color: rgba(239, 236, 254, 0.5);
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
    ${({ matches }) => matches && `width: 95px;`}    
`

export default Button;