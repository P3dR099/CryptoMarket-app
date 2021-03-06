import styled from 'styled-components';

const Button = styled.button`
    border-radius: 0.8rem;
    border: 1.5px solid #324f66;
    width: 9rem;
    color: white;
    height: 2.8rem;
    background: steelblue;
    margin: 0.5rem;
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
    padding: 2rem 0.5rem;
    ${({ matches }) => !matches && `padding: 3rem;`}
    background: dimgrey;
    border-radius: 2.5rem;
    margin: 3rem 2rem;
    ${({ matchesMin }) => !matchesMin && `margin: 3rem 0.5rem;`}
    ${({ matches }) => matches && `margin: 7rem ​1rem 1rem 1rem;`}
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