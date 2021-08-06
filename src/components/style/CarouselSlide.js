import styled from 'styled-components';
import Slider from "react-slick";

const CarouselSlide = styled(Slider)`

    ${({ matchesMax2 }) => matchesMax2 ? `

    margin: 0px 22px 0px 64px;
    -webkit-transform: translateX(-42px) translateY(430px);` :
        `margin:0px 35px 0px 86px;
        -webkit-transform: translateX(-34px) translateY(500px);
    `
    }

    ${({ matchesMin, matchesMax2 }) => matchesMin || matchesMax2 ? `
        padding-left:25px;
    ` :
        `padding-left:25px;`
    }

`

export default CarouselSlide;