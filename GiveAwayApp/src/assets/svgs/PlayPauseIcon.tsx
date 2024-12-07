import * as React from 'react';
import Svg, {SvgProps, Rect, Path} from 'react-native-svg';
const PlayPauseIcon = (props: SvgProps) => (
  <Svg width={30} height={31} fill="none" {...props}>
    <Rect width={30} height={30} y={0.5} fill="#6BBCC7" rx={15} />
    <Path fill="#fff" d="m11.4 7.7 12 7.8-12 7.8V7.7Z" />
  </Svg>
);
export default PlayPauseIcon;
