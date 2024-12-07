import * as React from 'react';
import Svg, {SvgProps, Path} from 'react-native-svg';
const ThreeDotIcon = (props: SvgProps) => (
  <Svg width={20} height={4} fill="none" {...props}>
    <Path
      fill="#fff"
      d="M10 0a2 2 0 1 1 0 4 2 2 0 0 1 0-4ZM2 4a2 2 0 1 0 0-4 2 2 0 0 0 0 4Zm16-4a2 2 0 1 0 0 4 2 2 0 0 0 0-4Z"
    />
  </Svg>
);
export default ThreeDotIcon;
