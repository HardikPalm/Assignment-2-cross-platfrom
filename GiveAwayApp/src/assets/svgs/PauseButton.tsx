import * as React from 'react';
import Svg, {SvgProps, Rect, Path} from 'react-native-svg';
const PauseButton = (props: SvgProps) => (
  <Svg width={56} height={56} fill="none" {...props}>
    <Rect width={56} height={56} fill="#6BBCC7" rx={28} />
    <Path
      fill="#fff"
      d="M25.418 17H21v23.563h4.418V17ZM36.168 17H31.75v23.563h4.418V17Z"
    />
  </Svg>
);
export default PauseButton;
