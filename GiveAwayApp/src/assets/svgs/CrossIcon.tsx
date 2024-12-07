import * as React from 'react';
import Svg, {SvgProps, Path} from 'react-native-svg';
import {Colors} from '../../utils/colors/colors';
const CrossIcon = (props: SvgProps) => (
  <Svg width={20} height={20} fill="none" {...props}>
    <Path
      fill={Colors.grey}
      d="m11.466 10 6.23-6.23a1.035 1.035 0 1 0-1.466-1.466L10 8.534l-6.23-6.23A1.036 1.036 0 1 0 2.304 3.77L8.534 10l-6.23 6.23A1.035 1.035 0 0 0 3.037 18c.265 0 .53-.102.733-.304l6.23-6.23 6.23 6.23a1.035 1.035 0 0 0 1.466 0 1.035 1.035 0 0 0 0-1.466L11.466 10Z"
    />
  </Svg>
);
export default CrossIcon;
