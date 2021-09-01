import styled from 'styled-components';
import Slider from "react-slick";

const CarouselSlider = styled(Slider)`
    -webkit-transform: translateX(-34px) translateY(678px);
    ${({ matchesMax2, matchesMedH }) => matchesMax2 && !matchesMedH ? `
    margin: 0px 22px 0px 64px;
    -webkit-transform: translateX(-42px) translateY(590px);` :
        `margin:0px 50px 0px 75px;
    ` }
    ${({ matchesMin2 }) => matchesMin2 && `
        -webkit-transform: translateX(-34px) translateY(545px);
    `}
    ${({ matchesMin, matchesMin2 }) => matchesMin || matchesMin2 ? `
        padding-left:25px;
    ` :
        `padding-left:25px;`
    }
    ${({ matchesMedH, matchesMax2 }) => matchesMedH && matchesMax2 ? `
     -webkit-transform: translateX(-40px) translateY(750px);` :
        `margin:0px 50px 0px 75px;
     ` }
         ${({ matchesMedH, matchesMin2 }) => matchesMedH && matchesMin2 ? `
        -webkit-transform: translateX(-40px) translateY(690px);` :
        `margin:0px 50px 0px 75px;
     ` }
         ${({ matchesMin2, matchesMedH }) => !matchesMedH && matchesMin2 ? `-webkit-transform: translateX(-30px) translateY(535px);` :
        `margin:0px 50px 0px 75px;
     ` }
    
    .slick - track {
        transform: translate3d(-10px, 0px, 0px);
    }
`

export const CarouselMobile = styled(Slider)`
    - webkit - transform: translateX(-228px) translateY(245px);
`

export default CarouselSlider;