import styled from 'styled-components';
import Slider from "react-slick";

const CarouselSlider = styled(Slider)`

    ${({ matchesMax2 }) => matchesMax2 ? `

    margin: 0px 22px 0px 64px;
    -webkit-transform: translateX(-42px) translateY(600px);` :
        `margin:0px 35px 0px 86px;
        -webkit-transform: translateX(-34px) translateY(595px);
    `
    }

    ${({ matchesMin2 }) => matchesMin2 && `
        -webkit-transform: translateX(-34px) translateY(353px);
    `
    }

    ${({ matchesMin, matchesMin2 }) => matchesMin || matchesMin2 ? `
        padding-left:25px;
    ` :
        `padding-left:25px;`
    }

`

export default CarouselSlider;