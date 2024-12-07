import * as React from 'react';
import Svg, {SvgProps, Rect, G, Path, Defs, ClipPath} from 'react-native-svg';
const SmileyFaceIcon = (props: SvgProps) => (
  <Svg width={51} height={50} fill="none" {...props}>
    <Rect
      width={46.094}
      height={46.094}
      x={2.453}
      y={1.953}
      stroke="#fff"
      strokeWidth={3.906}
      rx={23.047}
    />
    <Rect
      width={6.25}
      height={6.25}
      x={13.391}
      y={14.063}
      fill="#fff"
      rx={3.125}
    />
    <Rect
      width={6.25}
      height={6.25}
      x={31.359}
      y={14.063}
      fill="#fff"
      rx={3.125}
    />
    <G clipPath="url(#a)">
      <Path
        fill="#fff"
        d="M25.431 28.125c-4.14 0-7.969 1.016-11.406 4.297-1.016.547-1.328 1.797-.703 2.734a1.98 1.98 0 0 0 2.578.703c2.89-2.968 6.094-3.828 9.531-3.828 3.438 0 6.64.86 9.531 3.828a1.98 1.98 0 0 0 2.578-.703c.626-.937.235-2.265-.703-2.734-3.437-3.281-7.343-4.297-11.406-4.297Z"
      />
    </G>
    <Defs>
      <ClipPath id="a">
        <Path fill="#fff" d="M13 28.125h25v8.594H13z" />
      </ClipPath>
    </Defs>
  </Svg>
);
export default SmileyFaceIcon;
