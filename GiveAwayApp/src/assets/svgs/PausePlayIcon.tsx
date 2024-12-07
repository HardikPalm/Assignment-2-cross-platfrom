import * as React from "react";
import Svg, { SvgProps, Rect, Path, G, Circle } from "react-native-svg";
const PausePlayIcon = (props: SvgProps) => (
  <Svg
    width={30}
    height={30}
    aria-hidden="true"
    className="iconify iconify--emojione"
    viewBox="0 0 64 64"
    {...props}
  >
    <Circle cx={32} cy={32} r={30} fill="#4fd1d9" />
    <G fill="#fff">
      <Path d="M20 14h8v36h-8zM36 14h8v36h-8z" />
    </G>
  </Svg>
);
export default PausePlayIcon;
