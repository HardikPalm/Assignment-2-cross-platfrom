import * as React from "react";
import Svg, { SvgProps, G, Circle, Path, Defs } from "react-native-svg";

const PlayNew = (props: SvgProps) => (
  <Svg width={30} height={30} fill="none" viewBox="0 0 24 24" {...props}>
    <Path
      fill="#FFFFFF"
      fillRule="evenodd"
      d="M7.238 3.044C5.652 2.182 3.75 3.32 3.75 5.033v13.934c0 1.714 1.902 2.851 3.488 1.989l12.812-6.967c1.6-.87 1.6-3.108 0-3.977L7.238 3.044ZM2.25 5.033c0-2.905 3.167-4.687 5.705-3.306l12.812 6.967c2.644 1.438 2.644 5.174 0 6.612L7.955 22.273c-2.538 1.38-5.705-.4-5.705-3.306V5.033Z"
      clipRule="evenodd"
    ></Path>
  </Svg>
);
export default PlayNew;
