import * as React from 'react';
import Svg, {SvgProps, Path} from 'react-native-svg';
const InfoIcon = (props: SvgProps) => (
  <Svg width={24} height={25} fill="none" {...props}>
    <Path
      fill="#fff"
      d="M10 12.5a2 2 0 1 1 4 0 2 2 0 0 1-4 0Zm4 8a2 2 0 1 0-4 0 2 2 0 0 0 4 0Zm-4-16a2 2 0 1 0 4 0 2 2 0 0 0-4 0Z"
    />
  </Svg>
);
export default InfoIcon;
