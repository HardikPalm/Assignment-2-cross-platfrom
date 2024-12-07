import * as React from 'react';
import {View} from 'react-native';
import Svg, {SvgProps, G, Path, Defs, ClipPath} from 'react-native-svg';
const LoopIcon = (props: SvgProps) => (
  <Svg width={28} height={30} fill="none" {...props}>
    <G clipPath="url(#a)">
      <Path
        fill="#fff"
        d="M20.9 3.25c0-.332-.126-.65-.351-.884A1.176 1.176 0 0 0 19.7 2h-9.6v2.5h8.4v8.75h-3.6l4.763 6.25 4.837-6.25h-3.6v-10ZM4.1 20.75c0 .331.126.65.351.884.226.234.53.366.849.366h9.6v-2.5H6.5v-8.75h3.6L5.3 4.5.5 10.75h3.6v10Z"
      />
    </G>
    <Defs>
      <ClipPath id="a">
        <Path fill="#fff" d="M.5 0h24v24H.5z" />
      </ClipPath>
    </Defs>
  </Svg>
);
export default LoopIcon;
