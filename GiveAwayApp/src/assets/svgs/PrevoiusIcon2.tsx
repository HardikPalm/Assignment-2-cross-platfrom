import * as React from "react";
import Svg, { SvgProps, Path } from "react-native-svg";
const PreviousIcon2 = (props: SvgProps) => (
  <Svg width={25} height={24} fill="none" {...props}>
    <Path
      fill="grey"
      d="M2.544 10.565V0h-2v24h2V13.372l16.431 9.177c.675.376 1.525-.11 1.525-.873V2.219c0-.754-.831-1.218-1.506-.841l-16.45 9.187Z"
    />
  </Svg>
);
export default PreviousIcon2;
