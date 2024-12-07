import * as React from 'react';
import Svg, {SvgProps, Path} from 'react-native-svg';
const BackIconLogo = (props: SvgProps) => (
  <Svg width={17} height={17} fill="none" {...props}>
    <Path
      stroke="#fff"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M15.5 8.5h-14m0 0 7 7m-7-7 7-7"
    />
  </Svg>
);
export default BackIconLogo;
