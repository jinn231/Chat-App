import React from "react";
import styled, { keyframes } from "styled-components";
import { useMediaQuery } from "react-responsive";

const AnimCircleOuter = keyframes`
    0% {
        stroke-dashoffset: 25;
    }
    25% {
        stroke-dashoffset: 0;
    }
    65% {
        stroke-dashoffset: 301;
    }
    80% {
        stroke-dashoffset: 276;
    }
    100% {
        stroke-dashoffset: 276;
    }
`;

const AnimCircleMiddle = keyframes`
0% {
    stroke-dashoffset: 17;
}
25% {
    stroke-dashoffset: 0;
}
65% {
    stroke-dashoffset: 204;
}
80% {
    stroke-dashoffset: 187;
}
100% {
    stroke-dashoffset: 187;
}
`;

const AnimCircleInner = keyframes`
0% {
    stroke-dashoffset: 9;
}
25% {
    stroke-dashoffset: 0;
}
65% {
    stroke-dashoffset: 106;
}
80% {
    stroke-dashoffset: 97;
}
100% {
    stroke-dashoffset: 97;
}
`;

const AnimText = keyframes`
0% {
    clip-path: inset(0 100% 0 0);
}
50% {
    clip-path: inset(0);
}
100% {
    clip-path: inset(0 0 0 100%);
}
`;

const ParentDiv = styled.div`
  background: ${(props) => props.background};
  font: 400 16px "Varela Round", sans-serif;
  display: flex;
  flex-direction: column;
  padding: ${(props) => props.paddingpassed}px;
`;

const StyledDiv = styled.div`
  background: ${(props) => props.background};
  width: ${(props) => props.passedsize}px;
  height: ${(props) => props.passedsize}px;
  border-radius: 50px;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const StyledSVG = styled.svg`
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const StyledSVGOuter = styled(StyledSVG)`
  height: ${(props) => props.passedsize}px;
  width: ${(props) => props.passedsize}px;
`;
const StyledSVGMiddle = styled(StyledSVG)`
  height: ${(props) => props.passedsize}px;
  width: ${(props) => props.passedsize}px;
`;
const StyledSVGInner = styled(StyledSVG)`
  height: ${(props) => props.passedsize}px;
  width: ${(props) => props.passedsize}px;
`;

const StyledSVGCircle = styled.circle`
  position: absolute;
  fill: none;
  stroke-width: 6px;
  stroke-linecap: round;
  stroke-linejoin: round;
  transform: rotate(-100deg);
  transform-origin: center;
`;

const StyledSVGCircleOuter = styled(StyledSVGCircle)`
  stroke-dasharray: 62.75 188.25;
`;
const StyledSVGCircleOuterBack = styled(StyledSVGCircleOuter)`
  animation: ${AnimCircleOuter} 1.8s ease infinite 0.3s;
  stroke: ${(props) => props.backcolor};
`;
const StyledSVGCircleOuterFront = styled(StyledSVGCircleOuter)`
  animation: ${AnimCircleOuter} 1.8s ease infinite 0.15s;
  stroke: ${(props) => props.frontcolor};
`;

const StyledSVGCircleMiddle = styled(StyledSVGCircle)`
  stroke-dasharray: 42.5 127.5;
`;
const StyledSVGCircleMiddleBack = styled(StyledSVGCircleMiddle)`
  animation: ${AnimCircleMiddle} 1.8s ease infinite 0.25s;
  stroke: ${(props) => props.backcolor};
`;
const StyledSVGCircleMiddleFront = styled(StyledSVGCircleMiddle)`
  animation: ${AnimCircleMiddle} 1.8s ease infinite 0.1s;
  stroke: ${(props) => props.frontcolor};
`;

const StyledSVGCircleInner = styled(StyledSVGCircle)`
  stroke-dasharray: 22 66;
`;
const StyledSVGCircleInnerBack = styled(StyledSVGCircleInner)`
  animation: ${AnimCircleInner} 1.8s ease infinite 0.2s;
  stroke: ${(props) => props.backcolor};
`;
const StyledSVGCircleInnerFront = styled(StyledSVGCircleInner)`
  animation: ${AnimCircleInner} 1.8s ease infinite 0.05s;
  stroke: ${(props) => props.frontcolor};
`;

const StyledText = styled.div`
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: 500;
  font-size: ${(props) => props.passedsize}px;
  letter-spacing: 0.2px;
  margin-top: ${(props) => props.passedmargin}px;
  ::before {
    content: attr(data-text);
    color: ${(props) => props.textcolor};
  }
  ::after {
    content: attr(data-text);
    color: ${(props) => props.frontcolor};
    animation: ${AnimText} 3.6s ease infinite;
    position: absolute;
  }
`;


const WifiLoader = function WifiLoader ({
  classname = `wifiloader`,
  text = `Loading...`,
  background = `transparent`,
  frontcolor = `#4F29F0`,
  backcolor = `#C3C8DE`,
  textcolor = `#414856`,
  size = `64px`,
  desktopSize = ``,
  mobileSize = ``,
})  {
  const isDesktopOrLaptop = useMediaQuery({ query: "(min-width: 1224px)" });
  const isTabletOrMobile = useMediaQuery({ query: "(max-width: 1224px)" });

  var sizeFound = 0.0;
  if (isDesktopOrLaptop) {
    if (desktopSize !== "") sizeFound = parseFloat(desktopSize);
    else sizeFound = parseFloat(size) * 2;
  }

  if (isTabletOrMobile) {
    if (mobileSize !== "") sizeFound = parseFloat(mobileSize);
    else sizeFound = parseFloat(size);
  }

  var sizePassed = parseFloat(sizeFound);
  var ratio = sizePassed / 64;
  var sizeParentPadding = (sizePassed * 20) / 64;
  var sizeText = (ratio * 1.5 * 14) / 2; //(sizePassed * 14)/64;
  var sizeTextMargin = (sizePassed * 120) / 64;
  var sizeOuter = (sizePassed * 86) / 64;
  var sizeMiddle = (sizePassed * 60) / 64;
  var sizeInner = (sizePassed * 34) / 64;

  if (ratio === 1) {
    sizeText = 14;
  }
  return (
    <ParentDiv
      background={background}
      paddingpassed={sizeParentPadding}
      className={classname}
    >
      <StyledDiv
        id="wifi-loader"
        background={background}
        passedsize={sizePassed}
      >
        <StyledSVGOuter
          passedsize={sizeOuter}
          viewBox="0 0 86 86"
        >
          <StyledSVGCircleOuterBack
            backcolor={backcolor}
            cx="43"
            cy="43"
            r="40"
          ></StyledSVGCircleOuterBack>
          <StyledSVGCircleOuterFront
            frontcolor={frontcolor}
            cx="43"
            cy="43"
            r="40"
          ></StyledSVGCircleOuterFront>
          {/* <circle className="new" cx="43" cy="43" r="40"></circle> */}
        </StyledSVGOuter>
        <StyledSVGMiddle
          passedsize={sizeMiddle}
          viewBox="0 0 60 60"
        >
          <StyledSVGCircleMiddleBack
            backcolor={backcolor}
            cx="30"
            cy="30"
            r="27"
          ></StyledSVGCircleMiddleBack>
          <StyledSVGCircleMiddleFront
            frontcolor={frontcolor}
            cx="30"
            cy="30"
            r="27"
          ></StyledSVGCircleMiddleFront>
        </StyledSVGMiddle>
        <StyledSVGInner
          passedsize={sizeInner}
          viewBox="0 0 34 34"
        >
          <StyledSVGCircleInnerBack
            backcolor={backcolor}
            cx="17"
            cy="17"
            r="14"
          ></StyledSVGCircleInnerBack>
          <StyledSVGCircleInnerFront
            frontcolor={frontcolor}
            cx="17"
            cy="17"
            r="14"
          ></StyledSVGCircleInnerFront>
        </StyledSVGInner>
        <StyledText
          textcolor={textcolor}
          frontcolor={frontcolor}
          passedsize={sizeText}
          passedmargin={sizeTextMargin}
          data-text={text}
        ></StyledText>
      </StyledDiv>
    </ParentDiv>
  );
};

export default WifiLoader;