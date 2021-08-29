import styled from 'styled-components';
import Slider from "react-slick";

const CarouselSlider = styled(Slider)`

    -webkit-transform: translateX(-34px) translateY(685px);

    ${({ matchesMax2 }) => matchesMax2 ? `

    margin: 0px 22px 0px 64px;
    -webkit-transform: translateX(-42px) translateY(600px);` :
        `margin:0px 50px 0px 75px;
    ` }

    ${({ matchesMin2 }) => matchesMin2 && `
        -webkit-transform: translateX(-34px) translateY(353px);        
    `}

    ${({ matchesMin, matchesMin2 }) => matchesMin || matchesMin2 ? `
        padding-left:25px;
    ` :
        `padding-left:25px;`
    }
    
    .slick-track {
        transform: translate3d(-10px, 0px, 0px);
    }

`

export const CarouselMobile = styled(Slider)`
  -webkit-transform: translateX(-228px) translateY(245px);
  
`

export default CarouselSlider;