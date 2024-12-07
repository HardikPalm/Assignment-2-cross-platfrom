import * as React from 'react';
import Svg, {SvgProps, Rect, G, Path, Defs, ClipPath} from 'react-native-svg';
const PlayButton = (props: SvgProps) => (
  <Svg width={57} height={56} fill="none" {...props}>
    <Rect width={56} height={56} x={0.5} fill="#6BBCC7" rx={28} />
    <G clipPath="url(#a)">
      <Path
        fill="#fff"
        d="M18.5 15.4v25.2c0 .238.052.473.152.681.1.209.244.384.418.51.174.125.373.197.578.208.205.01.409-.04.592-.147l21.649-12.6c.186-.128.34-.312.447-.531.108-.22.164-.468.164-.721 0-.253-.056-.5-.163-.72a1.38 1.38 0 0 0-.448-.533l-21.649-12.6a1.063 1.063 0 0 0-.592-.146c-.204.011-.404.083-.578.208-.174.126-.318.301-.418.51-.1.208-.152.443-.152.682ZM38.662 28 20.905 38.334V17.666L38.662 28Z"
      />
    </G>
    <Defs>
      <ClipPath id="a">
        <Path fill="#fff" d="M42.5 14v28h-24V14z" />
      </ClipPath>
    </Defs>
  </Svg>
);
export default PlayButton;
